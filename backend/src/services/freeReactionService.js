import fetch from 'node-fetch';
import { getSupabaseAdmin } from '../config/supabaseClient.js';

const DEFAULT_MODEL = 'gpt-5.4-nano';
const ALLOWED_VISUAL_EFFECTS = new Set(['no_reaction', 'color_change', 'bubbles', 'precipitate', 'dissolve', 'unknown']);
const ALLOWED_PRODUCT_STATES = new Set(['gas', 'crystal', 'powder', 'solid', 'liquid', 'dissolved', 'none', 'unknown']);
const ALLOWED_SOLID_FORMS = new Set(['crystal', 'powder', 'flake', 'pellet', 'none', 'unknown']);

function assertSupabaseResult(result) {
    if (result.error) throw result.error;
    return result.data;
}

function normalizeChemicalName(name) {
    return String(name || '')
        .normalize('NFKC')
        .trim()
        .replace(/\s+/g, '')
        .toLowerCase();
}

export function createReactionKey(firstName, secondName) {
    // 物質名の順番が逆でも同じ組み合わせとして扱う。
    return [normalizeChemicalName(firstName), normalizeChemicalName(secondName)]
        .sort((left, right) => left.localeCompare(right, 'ja'))
        .join('__');
}

function toApiReaction(row) {
    if (!row) return null;

    const cached = row.response_json || row.response;
    if (cached) {
        return {
            title: cached.title || '反応候補',
            summary: cached.summary || '',
            equation: cached.equation || '',
            visualEffect: cached.visualEffect || cached.visual_effect || 'unknown',
            liquidColor: cached.liquidColor || cached.liquid_color || null,
            visualDetail: cached.visualDetail || cached.visual_detail || null,
            safetyNote: cached.safetyNote || cached.safety_note || '',
            confidence: cached.confidence || 'low'
        };
    }

    return {
        title: row.title,
        summary: row.summary,
        equation: row.equation,
        visualEffect: row.visual_effect,
        liquidColor: row.liquid_color,
        visualDetail: row.visual_detail || null,
        safetyNote: row.safety_note,
        confidence: 'high'
    };
}

function extractOutputText(data) {
    if (data.output_text) return data.output_text;

    const parts = [];
    for (const item of data.output || []) {
        for (const content of item.content || []) {
            if (content.text) parts.push(content.text);
        }
    }
    return parts.join('\n');
}

function fallbackReaction(testTubeChemical, flaskChemical, reason = 'AI判定を利用できませんでした。') {
    return {
        title: '未登録の組み合わせ',
        summary: `${testTubeChemical} と ${flaskChemical} の組み合わせは、登録済みの教材反応にはありません。`,
        equation: '',
        visualEffect: 'unknown',
        liquidColor: null,
        visualDetail: {
            productName: null,
            productState: 'unknown',
            solidForm: 'none',
            solidColor: null,
            gasName: null,
            bubbleColor: null,
            colorChange: null,
            displayHint: '正確な観察結果が未登録のため、見た目の変化は出しません。',
            requiredCondition: 'unknown'
        },
        safetyNote: reason,
        confidence: 'low'
    };
}

function normalizeVisualEffect(value) {
    const effect = String(value || 'unknown');
    return ALLOWED_VISUAL_EFFECTS.has(effect) ? effect : 'unknown';
}

function normalizeHexColor(value) {
    if (typeof value !== 'string') return null;
    const normalized = value.trim();
    return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : null;
}

function normalizeVisualDetail(value = {}) {
    const productState = String(value.productState || value.product_state || 'unknown');
    const solidForm = String(value.solidForm || value.solid_form || 'unknown');

    return {
        productName: value.productName || value.product_name || null,
        productState: ALLOWED_PRODUCT_STATES.has(productState) ? productState : 'unknown',
        solidForm: ALLOWED_SOLID_FORMS.has(solidForm) ? solidForm : 'unknown',
        solidColor: normalizeHexColor(value.solidColor || value.solid_color),
        gasName: value.gasName || value.gas_name || null,
        bubbleColor: normalizeHexColor(value.bubbleColor || value.bubble_color),
        colorChange: normalizeHexColor(value.colorChange || value.color_change),
        displayHint: value.displayHint || value.display_hint || '',
        requiredCondition: value.requiredCondition || value.required_condition || 'unknown'
    };
}

export class FreeReactionService {
    constructor() {
        this.supabase = getSupabaseAdmin();
        this.openAiModel = process.env.OPENAI_FREE_REACTION_MODEL || DEFAULT_MODEL;
    }

    async evaluateReaction(testTubeChemical, flaskChemical) {
        if (!testTubeChemical || !flaskChemical) {
            throw new Error('Both testTubeChemical and flaskChemical are required.');
        }

        const reactionKey = createReactionKey(testTubeChemical, flaskChemical);

        const rule = await this.findCuratedRule(reactionKey);
        if (rule) {
            return {
                source: 'db',
                reactionKey,
                reaction: toApiReaction(rule)
            };
        }

        const cached = await this.findAiCache(reactionKey);
        if (cached) {
            return {
                source: 'ai_cache',
                reactionKey,
                reaction: toApiReaction(cached)
            };
        }

        const aiReaction = await this.generateAiReaction(testTubeChemical, flaskChemical)
            .catch(error => {
                console.warn('[FreeReactionService] AI reaction generation failed:', error.message);
                return fallbackReaction(testTubeChemical, flaskChemical, 'AI判定に失敗したため、未登録の組み合わせとして扱います。');
            });

        await this.saveAiCache(reactionKey, testTubeChemical, flaskChemical, aiReaction)
            .catch(error => {
                console.warn('[FreeReactionService] Failed to save AI cache:', error.message);
            });

        const isUnknownFallback = aiReaction.confidence === 'low'
            && aiReaction.visualEffect === 'unknown';

        return {
            source: isUnknownFallback ? 'fallback' : 'ai',
            reactionKey,
            reaction: aiReaction
        };
    }

    async findCuratedRule(reactionKey) {
        const direct = assertSupabaseResult(await this.supabase
            .from('free_reaction_rules')
            .select('reactant_a, reactant_b, title, summary, equation, visual_effect, liquid_color, visual_detail, safety_note')
            .eq('reaction_key', reactionKey)
            .eq('is_enabled', true)
            .maybeSingle());
        if (direct) return direct;

        // 日本語名の並び順や手入力キーに揺れがあっても、登録済み物質名から再照合する。
        const rows = assertSupabaseResult(await this.supabase
            .from('free_reaction_rules')
            .select('reactant_a, reactant_b, title, summary, equation, visual_effect, liquid_color, visual_detail, safety_note')
            .eq('is_enabled', true)
            .limit(200));

        return rows.find(row => createReactionKey(row.reactant_a, row.reactant_b) === reactionKey) || null;
    }

    async findAiCache(reactionKey) {
        return assertSupabaseResult(await this.supabase
            .from('free_reaction_ai_cache')
            .select('response_json, model, created_at')
            .eq('reaction_key', reactionKey)
            .maybeSingle());
    }

    async saveAiCache(reactionKey, testTubeChemical, flaskChemical, reaction) {
        return assertSupabaseResult(await this.supabase
            .from('free_reaction_ai_cache')
            .upsert({
                reaction_key: reactionKey,
                reactant_a: testTubeChemical,
                reactant_b: flaskChemical,
                model: this.openAiModel,
                response_json: reaction,
                updated_at: new Date().toISOString()
            }, { onConflict: 'reaction_key' })
            .select('id')
            .single());
    }

    async generateAiReaction(testTubeChemical, flaskChemical) {
        if (!process.env.OPENAI_API_KEY) {
            return fallbackReaction(testTubeChemical, flaskChemical, 'OPENAI_API_KEY が未設定のため、AI判定は行っていません。');
        }

        const response = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.openAiModel,
                max_output_tokens: 900,
                input: [
                    {
                        role: 'system',
                        content: [
                            'あなたは中学生向け化学教材の反応判定を行います。',
                            '実在の危険な実験を助長せず、教育用の安全な説明だけを返してください。',
                            '確信が低い、危険、または学校教材として不適切な組み合わせは visualEffect を unknown または no_reaction にしてください。',
                            '生成物の状態は visualDetail に必ず入れてください。結晶、粉状沈殿、気体、色変化、溶解、目立つ変化なしを区別します。',
                            '常温で単に混ぜても進みにくい場合は requiredCondition に heat、catalyst、high_pressure、electrolysis などを書き、confidence を下げてください。',
                            '返答はJSONだけにしてください。'
                        ].join('\n')
                    },
                    {
                        role: 'user',
                        content: JSON.stringify({
                            testTubeChemical,
                            flaskChemical,
                            requiredJsonShape: {
                                title: '短い反応名',
                                summary: '中学生向けの短い説明',
                                equation: '分かる場合だけ反応式',
                                visualEffect: 'no_reaction | color_change | bubbles | precipitate | dissolve | unknown',
                                liquidColor: '#ffffff 形式。なければ null',
                                visualDetail: {
                                    productName: '生成物名。分からなければ null',
                                    productState: 'gas | crystal | powder | solid | liquid | dissolved | none | unknown',
                                    solidForm: 'crystal | powder | flake | pellet | none | unknown',
                                    solidColor: '#ffffff 形式。固体がなければ null',
                                    gasName: '気体名。なければ null',
                                    bubbleColor: '#ffffff 形式。気体がなければ null',
                                    colorChange: '#ffffff 形式。色変化がなければ null',
                                    displayHint: '3D表示で何を見せるべきか短く',
                                    requiredCondition: 'room_temp_mix | heat | catalyst | high_pressure | electrolysis | unsafe | none | unknown'
                                },
                                safetyNote: '安全上の注意または教材上の補足',
                                confidence: 'high | medium | low'
                            }
                        })
                    }
                ]
            })
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.error?.message || 'OpenAI API request failed.');
        }

        const outputText = extractOutputText(data);
        const parsed = JSON.parse(outputText);
        return {
            title: String(parsed.title || '反応候補'),
            summary: String(parsed.summary || ''),
            equation: String(parsed.equation || ''),
            visualEffect: normalizeVisualEffect(parsed.visualEffect),
            liquidColor: normalizeHexColor(parsed.liquidColor),
            visualDetail: normalizeVisualDetail(parsed.visualDetail),
            safetyNote: String(parsed.safetyNote || ''),
            confidence: ['high', 'medium', 'low'].includes(parsed.confidence) ? parsed.confidence : 'low'
        };
    }
}
