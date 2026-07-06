import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const BACKEND_ENV_PATH = path.join(ROOT_DIR, 'backend', '.env');
const OUT_SQL_PATH = path.join(ROOT_DIR, 'supabase', 'free_mode_ai_seed.sql');
const OUT_JSON_PATH = path.join(ROOT_DIR, 'supabase', 'free_mode_ai_seed.preview.json');

const DEFAULT_MODEL = 'gpt-5.5';
const TARGET_COUNT = 200;

const CHEMICALS = [
    '水',
    '食塩水',
    '砂糖水',
    '酢酸水溶液',
    '重曹水',
    '石灰水',
    '二酸化炭素',
    '酸素',
    '水素',
    '塩酸',
    '水酸化ナトリウム水溶液',
    'アンモニア水',
    '硫酸銅水溶液',
    '硝酸銀水溶液',
    '炭酸ナトリウム水溶液',
    '塩化バリウム水溶液',
    'ヨウ素液',
    'デンプン水溶液',
    'フェノールフタレイン液',
    'BTB溶液',
    'アルミニウム',
    '鉄',
    '銅',
    '亜鉛',
    'マグネシウム',
    '石灰石',
    '二酸化マンガン',
    '過酸化水素水',
    '塩化カルシウム水溶液',
    '炭酸水'
];

function loadDotEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};

    const result = {};
    for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;

        const match = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
        if (!match) continue;

        result[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
    return result;
}

function normalizeChemicalName(name) {
    return String(name || '')
        .normalize('NFKC')
        .trim()
        .replace(/\s+/g, '')
        .toLowerCase();
}

function createReactionKey(firstName, secondName) {
    return [normalizeChemicalName(firstName), normalizeChemicalName(secondName)]
        .sort((left, right) => left.localeCompare(right, 'ja'))
        .join('__');
}

function buildPairs() {
    const pairs = [];
    for (let i = 0; i < CHEMICALS.length; i += 1) {
        for (let j = i + 1; j < CHEMICALS.length; j += 1) {
            pairs.push({
                reactant_a: CHEMICALS[i],
                reactant_b: CHEMICALS[j],
                reaction_key: createReactionKey(CHEMICALS[i], CHEMICALS[j])
            });
        }
    }
    return pairs.slice(0, TARGET_COUNT);
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

function sqlString(value) {
    if (value === null || value === undefined) return 'null';
    return `'${String(value).replaceAll("'", "''")}'`;
}

function jsonForSql(value) {
    return `${sqlString(JSON.stringify(value))}::jsonb`;
}

function buildSeedSql(rows, model) {
    const values = rows.map((row) => {
        const response = {
            title: row.title,
            summary: row.summary,
            equation: row.equation || '',
            visualEffect: row.visualEffect,
            liquidColor: row.liquidColor ?? null,
            safetyNote: row.safetyNote,
            confidence: row.confidence
        };

        return [
            '    (',
            `        ${sqlString(row.reaction_key)},`,
            `        ${sqlString(row.reactant_a)},`,
            `        ${sqlString(row.reactant_b)},`,
            `        ${sqlString(model)},`,
            `        ${jsonForSql(response)}`,
            '    )'
        ].join('\n');
    }).join(',\n');

    return [
        '-- フリーモードAI補完キャッシュ用の初期候補。',
        '-- 教材として確定した反応は free_reaction_rules へ昇格する。',
        'insert into public.free_reaction_ai_cache (',
        '    reaction_key,',
        '    reactant_a,',
        '    reactant_b,',
        '    model,',
        '    response_json',
        ')',
        'values',
        values,
        'on conflict (reaction_key) do update set',
        '    reactant_a = excluded.reactant_a,',
        '    reactant_b = excluded.reactant_b,',
        '    model = excluded.model,',
        '    response_json = excluded.response_json,',
        '    updated_at = now();',
        ''
    ].join('\n');
}

function classifyLocalReaction(pair) {
    const a = pair.reactant_a;
    const b = pair.reactant_b;
    const names = new Set([a, b]);
    const has = (...items) => items.some(item => names.has(item));

    const base = {
        reaction_key: pair.reaction_key,
        reactant_a: a,
        reactant_b: b,
        title: '観察候補',
        summary: `${a} と ${b} の組み合わせは、フリーモードで観察候補として扱います。`,
        equation: '',
        visualEffect: 'unknown',
        liquidColor: null,
        safetyNote: '実際の実験では、先生の指示と安全管理に従います。',
        confidence: 'low'
    };

    if (has('過酸化水素水') && has('二酸化マンガン')) {
        return {
            ...base,
            title: '酸素の発生',
            summary: '二酸化マンガンが触媒としてはたらき、過酸化水素水から酸素が発生します。',
            equation: '2H2O2 -> 2H2O + O2',
            visualEffect: 'bubbles',
            liquidColor: '#d8f7ff',
            safetyNote: '濃い過酸化水素水は危険なため、実験では先生の指示に従います。',
            confidence: 'high'
        };
    }

    if (has('石灰水') && has('二酸化炭素', '炭酸水')) {
        return {
            ...base,
            title: '石灰水の白濁',
            summary: '二酸化炭素によって炭酸カルシウムができ、石灰水が白くにごります。',
            equation: 'Ca(OH)2 + CO2 -> CaCO3 + H2O',
            visualEffect: 'precipitate',
            liquidColor: '#ffffff',
            safetyNote: '石灰水は目や皮膚に触れないように注意します。',
            confidence: 'high'
        };
    }

    if (has('硝酸銀水溶液') && has('食塩水', '塩化カルシウム水溶液')) {
        return {
            ...base,
            title: '白い沈殿',
            summary: '銀イオンと塩化物イオンが出会うと、白い塩化銀の沈殿ができます。',
            equation: 'Ag+ + Cl- -> AgCl',
            visualEffect: 'precipitate',
            liquidColor: '#ffffff',
            safetyNote: '硝酸銀は皮膚や衣服を変色させることがあるため注意します。',
            confidence: 'high'
        };
    }

    if (has('ヨウ素液') && has('デンプン水溶液')) {
        return {
            ...base,
            title: 'ヨウ素デンプン反応',
            summary: 'ヨウ素液がデンプンと反応し、青紫色に変化します。',
            visualEffect: 'color_change',
            liquidColor: '#2d246b',
            safetyNote: 'ヨウ素液は衣服に色が残ることがあるため注意します。',
            confidence: 'high'
        };
    }

    if (has('フェノールフタレイン液') && has('水酸化ナトリウム水溶液', 'アンモニア水', '石灰水', '重曹水', '炭酸ナトリウム水溶液')) {
        return {
            ...base,
            title: 'アルカリ性の色変化',
            summary: 'フェノールフタレイン液はアルカリ性の水溶液で赤紫色に変化します。',
            visualEffect: 'color_change',
            liquidColor: '#ff5ca8',
            safetyNote: '水酸化ナトリウム水溶液は皮膚に触れないように注意します。',
            confidence: 'high'
        };
    }

    if (has('BTB溶液') && has('塩酸', '酢酸水溶液', '炭酸水')) {
        return {
            ...base,
            title: '酸性の色変化',
            summary: 'BTB溶液は酸性の水溶液で黄色系に変化します。',
            visualEffect: 'color_change',
            liquidColor: '#f6d84a',
            safetyNote: '酸性水溶液を扱うときは保護具を使います。',
            confidence: 'medium'
        };
    }

    if (has('BTB溶液') && has('水酸化ナトリウム水溶液', 'アンモニア水', '石灰水', '重曹水', '炭酸ナトリウム水溶液')) {
        return {
            ...base,
            title: 'アルカリ性の色変化',
            summary: 'BTB溶液はアルカリ性の水溶液で青色系に変化します。',
            visualEffect: 'color_change',
            liquidColor: '#4f87ff',
            safetyNote: 'アルカリ性水溶液は目や皮膚に触れないように注意します。',
            confidence: 'medium'
        };
    }

    if (has('塩酸', '酢酸水溶液') && has('重曹水', '炭酸ナトリウム水溶液', '石灰石')) {
        return {
            ...base,
            title: '二酸化炭素の発生',
            summary: '酸と炭酸を含む物質が反応し、二酸化炭素が発生します。',
            visualEffect: 'bubbles',
            liquidColor: '#f4f4f4',
            safetyNote: '酸性水溶液は刺激性があるため、実験では先生の指示に従います。',
            confidence: 'medium'
        };
    }

    if (has('塩酸') && has('アルミニウム', '亜鉛', 'マグネシウム', '鉄')) {
        return {
            ...base,
            title: '金属と酸の反応',
            summary: '一部の金属は塩酸と反応し、気体を発生しながら溶けることがあります。',
            visualEffect: 'bubbles',
            liquidColor: '#eef5ff',
            safetyNote: '発生する気体は燃えやすい場合があるため、火気を近づけません。',
            confidence: 'medium'
        };
    }

    if (has('硫酸銅水溶液') && has('水酸化ナトリウム水溶液', 'アンモニア水')) {
        return {
            ...base,
            title: '青色の沈殿',
            summary: '銅イオンを含む水溶液にアルカリ性の水溶液を加えると、青色の沈殿が見られることがあります。',
            visualEffect: 'precipitate',
            liquidColor: '#63a6ff',
            safetyNote: '薬品の濃度や条件で見え方が変わるため、教材用の簡略表現です。',
            confidence: 'medium'
        };
    }

    if (has('塩化バリウム水溶液') && has('炭酸ナトリウム水溶液', '炭酸水')) {
        return {
            ...base,
            title: '白い沈殿候補',
            summary: 'バリウムイオンと炭酸イオンが出会うと、白い沈殿ができることがあります。',
            visualEffect: 'precipitate',
            liquidColor: '#ffffff',
            safetyNote: 'バリウム化合物は危険性があるため、実際の実験では扱いに注意します。',
            confidence: 'medium'
        };
    }

    if (has('水') || has('食塩水') || has('砂糖水')) {
        return {
            ...base,
            title: '大きな変化なし',
            summary: `${a} と ${b} の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。`,
            visualEffect: 'no_reaction',
            liquidColor: '#d8f7ff',
            safetyNote: 'フリーモードでは安全側の簡略表示として扱います。',
            confidence: 'low'
        };
    }

    return base;
}

function generateLocalRows(pairs) {
    return pairs.map(classifyLocalReaction);
}

async function requestReactions(apiKey, model, pairs) {
    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model,
            max_output_tokens: 12000,
            input: [
                {
                    role: 'system',
                    content: [
                        'あなたは中学生向けの化学シミュレーション教材の反応候補を作る補助AIです。',
                        '現実の危険な実験手順、分量、加熱条件、濃度、実施方法は書かないでください。',
                        '安全に説明できない組み合わせ、確信が低い組み合わせ、学校教材として不適切な組み合わせは visualEffect を unknown、confidence を low にしてください。',
                        '反応が分からない場合は無理に反応を作らず、no_reaction または unknown にしてください。',
                        '返答はJSON配列だけにしてください。Markdownは禁止です。'
                    ].join('\n')
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        requiredCount: pairs.length,
                        allowedVisualEffects: ['no_reaction', 'color_change', 'bubbles', 'precipitate', 'dissolve', 'unknown'],
                        requiredShape: {
                            reaction_key: '入力のreaction_keyをそのまま返す',
                            reactant_a: '入力のreactant_aをそのまま返す',
                            reactant_b: '入力のreactant_bをそのまま返す',
                            title: '短い反応名または観察名',
                            summary: '中学生向けの1文説明',
                            equation: '分かる場合だけ反応式。なければ空文字',
                            visualEffect: 'allowedVisualEffectsから1つ',
                            liquidColor: '#ffffff形式またはnull',
                            safetyNote: '安全上の注意または教材上の補足',
                            confidence: 'high | medium | low'
                        },
                        pairs
                    })
                }
            ]
        })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error?.message || `OpenAI API request failed with ${response.status}`);
    }

    const text = extractOutputText(data).trim();
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    return JSON.parse(cleaned);
}

function validateRows(rows, pairs) {
    const expected = new Set(pairs.map(pair => pair.reaction_key));
    const allowedEffects = new Set(['no_reaction', 'color_change', 'bubbles', 'precipitate', 'dissolve', 'unknown']);
    const validConfidence = new Set(['high', 'medium', 'low']);

    if (!Array.isArray(rows)) {
        throw new Error('AI response is not an array.');
    }

    const normalized = rows.map((row) => ({
        reaction_key: String(row.reaction_key || ''),
        reactant_a: String(row.reactant_a || ''),
        reactant_b: String(row.reactant_b || ''),
        title: String(row.title || '反応候補'),
        summary: String(row.summary || ''),
        equation: String(row.equation || ''),
        visualEffect: allowedEffects.has(row.visualEffect) ? row.visualEffect : 'unknown',
        liquidColor: row.liquidColor || null,
        safetyNote: String(row.safetyNote || '安全のため、実際の実験は先生の指示に従います。'),
        confidence: validConfidence.has(row.confidence) ? row.confidence : 'low'
    }));

    const seen = new Set();
    for (const row of normalized) {
        if (!expected.has(row.reaction_key)) {
            throw new Error(`Unexpected reaction_key: ${row.reaction_key}`);
        }
        if (seen.has(row.reaction_key)) {
            throw new Error(`Duplicated reaction_key: ${row.reaction_key}`);
        }
        seen.add(row.reaction_key);
    }

    if (seen.size !== expected.size) {
        throw new Error(`Expected ${expected.size} rows, got ${seen.size}.`);
    }

    return normalized;
}

async function main() {
    const env = { ...process.env, ...loadDotEnv(BACKEND_ENV_PATH) };
    const apiKey = env.OPENAI_API_KEY;
    const useLocalFallback = process.argv.includes('--local-fallback');
    if (!apiKey && !useLocalFallback) {
        throw new Error('OPENAI_API_KEY is missing. Set it in backend/.env.');
    }

    const model = env.OPENAI_FREE_REACTION_MODEL || DEFAULT_MODEL;
    const pairs = buildPairs();
    const rows = useLocalFallback
        ? validateRows(generateLocalRows(pairs), pairs)
        : validateRows(await requestReactions(apiKey, model, pairs), pairs);
    const sourceModel = useLocalFallback ? 'local-ai-candidate-seed' : model;

    fs.writeFileSync(OUT_JSON_PATH, JSON.stringify(rows, null, 2), 'utf8');
    fs.writeFileSync(OUT_SQL_PATH, buildSeedSql(rows, sourceModel), 'utf8');

    console.log(`Generated ${rows.length} free-mode AI cache rows.`);
    console.log(`SQL: ${path.relative(ROOT_DIR, OUT_SQL_PATH)}`);
    console.log(`Preview: ${path.relative(ROOT_DIR, OUT_JSON_PATH)}`);
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
