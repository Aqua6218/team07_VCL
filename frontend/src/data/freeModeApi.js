import freeModePeriodicReactionData from './freeModePeriodicReactionData.json';
import freeModeReactionSeed from './freeModeReactionSeed.json';
import { periodicTableLayout } from './periodicTable.js';

const API_BASE = '/api/free-mode';

export const FREE_MODE_PERIODIC_ELEMENT_COUNT = periodicTableLayout.length;
export const FREE_MODE_PERIODIC_ORDERED_PAIR_COUNT = FREE_MODE_PERIODIC_ELEMENT_COUNT * FREE_MODE_PERIODIC_ELEMENT_COUNT;
export const FREE_MODE_PERIODIC_DATA_COUNT = freeModePeriodicReactionData.length;
export const FREE_MODE_PERIODIC_VERIFIED_CLASSIFICATION_COUNT = freeModePeriodicReactionData.filter(
    row => String(row.verificationStatus || '').startsWith('verified_')
).length;
const PERIODIC_VERIFIED_REPRESENTATIVE_ROWS = freeModePeriodicReactionData.filter(
    row => row.verificationStatus === 'verified_representative'
);
export const FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_COUNT = PERIODIC_VERIFIED_REPRESENTATIVE_ROWS.length;
export const FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_UNIQUE_COUNT = new Set(
    PERIODIC_VERIFIED_REPRESENTATIVE_ROWS.map(row => row.reaction_key)
).size;
export const FREE_MODE_REACTION_SEED_COUNT = freeModeReactionSeed.length;

const SCHOOL_CHEMICAL_GROUPS = {
    acids: ['塩酸', '硫酸', '酢酸', '酢酸水溶液', '炭酸水'],
    bases: ['水酸化ナトリウム水溶液', 'アンモニア水', '石灰水', '重曹水', '炭酸ナトリウム水溶液'],
    carbonates: ['石灰石', '炭酸ナトリウム水溶液', '重曹水', '炭酸水'],
    indicators: ['フェノールフタレイン液', 'BTB溶液', 'ヨウ素液'],
    water: ['水', '蒸留水']
};

const ELEMENT_BY_ALIAS = new Map();
periodicTableLayout.forEach((element) => {
    [element.name, element.symbol, element.englishName].forEach((alias) => {
        if (alias) ELEMENT_BY_ALIAS.set(normalizeMaterialName(alias), element);
    });
});

const PERIODIC_REACTIONS_BY_PAIR_KEY = new Map(
    freeModePeriodicReactionData.map(row => [row.pair_key, row])
);

const SEEDED_REACTIONS_BY_KEY = new Map(
    freeModeReactionSeed.map(item => [reactionKey(item.reactant_a, item.reactant_b), item])
);

function normalizeMaterialName(value) {
    return String(value || '')
        .normalize('NFKC')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '');
}

function reactionKey(firstName, secondName) {
    return [firstName, secondName]
        .map(normalizeMaterialName)
        .sort((left, right) => left.localeCompare(right, 'ja'))
        .join('__');
}

function orderedPairKey(testTubeElement, flaskElement) {
    return `${testTubeElement.symbol}->${flaskElement.symbol}`;
}

function hasMaterial(names, material) {
    const normalized = normalizeMaterialName(material);
    return names.map(normalizeMaterialName).includes(normalized);
}

function isInSchoolGroup(material, groupName) {
    return hasMaterial(SCHOOL_CHEMICAL_GROUPS[groupName] || [], material);
}

function resolveElement(material) {
    return ELEMENT_BY_ALIAS.get(normalizeMaterialName(material)) || null;
}

function normalizeVisualEffect(value) {
    const effect = String(value || 'unknown');
    if (effect === 'no_reaction') return 'none';
    if (effect === 'color_change') return 'colorChange';
    return effect;
}

function normalizeHexColor(value, fallback = null) {
    if (typeof value !== 'string') return fallback;
    const color = value.trim();
    return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
}

function inferVisualDetail(reaction) {
    const visualEffect = normalizeVisualEffect(reaction.visualEffect || reaction.visual_effect);
    const liquidColor = reaction.liquidColor || reaction.liquid_color || null;

    if (visualEffect === 'precipitate') {
        return {
            productName: reaction.title || '生成物',
            productState: 'powder',
            solidForm: 'powder',
            solidColor: normalizeHexColor(liquidColor, '#ffffff'),
            gasName: null,
            bubbleColor: null,
            colorChange: normalizeHexColor(liquidColor, '#ffffff'),
            displayHint: '粉状の沈殿として表示',
            requiredCondition: 'room_temp_mix'
        };
    }

    if (visualEffect === 'colorChange') {
        return {
            productName: reaction.title || '色変化',
            productState: 'liquid',
            solidForm: 'none',
            solidColor: null,
            gasName: null,
            bubbleColor: null,
            colorChange: normalizeHexColor(liquidColor, '#bdf3d4'),
            displayHint: '液体色の変化として表示',
            requiredCondition: 'room_temp_mix'
        };
    }

    if (visualEffect === 'bubbles') {
        return {
            productName: reaction.title || '気体',
            productState: 'gas',
            solidForm: 'none',
            solidColor: null,
            gasName: reaction.title || '気体',
            bubbleColor: '#ffffff',
            colorChange: normalizeHexColor(liquidColor),
            displayHint: '気体の泡として表示',
            requiredCondition: 'room_temp_mix'
        };
    }

    if (visualEffect === 'dissolve') {
        return {
            productName: reaction.title || '溶解物',
            productState: 'dissolved',
            solidForm: 'none',
            solidColor: normalizeHexColor(liquidColor, '#dfefff'),
            gasName: null,
            bubbleColor: '#ffffff',
            colorChange: normalizeHexColor(liquidColor, '#dfefff'),
            displayHint: '固体が溶ける様子として表示',
            requiredCondition: 'room_temp_mix'
        };
    }

    return {
        productName: null,
        productState: 'none',
        solidForm: 'none',
        solidColor: null,
        gasName: null,
        bubbleColor: null,
        colorChange: null,
        displayHint: '目立つ変化は表示しない',
        requiredCondition: 'none'
    };
}

function normalizeVisualDetail(value, reaction) {
    const detail = value || inferVisualDetail(reaction);
    return {
        productName: detail.productName || detail.product_name || null,
        productState: detail.productState || detail.product_state || 'unknown',
        solidForm: detail.solidForm || detail.solid_form || 'none',
        solidColor: normalizeHexColor(detail.solidColor || detail.solid_color),
        gasName: detail.gasName || detail.gas_name || null,
        bubbleColor: normalizeHexColor(detail.bubbleColor || detail.bubble_color),
        colorChange: normalizeHexColor(detail.colorChange || detail.color_change),
        displayHint: detail.displayHint || detail.display_hint || '',
        requiredCondition: detail.requiredCondition || detail.required_condition || 'unknown'
    };
}

function normalizeReaction(reaction = {}) {
    const normalized = {
        title: reaction.title || '観察候補',
        summary: reaction.summary || '',
        equation: reaction.equation || '',
        visualEffect: normalizeVisualEffect(reaction.visualEffect || reaction.visual_effect),
        liquidColor: normalizeHexColor(reaction.liquidColor || reaction.liquid_color),
        safetyNote: reaction.safetyNote || reaction.safety_note || '実際の実験では、先生の指示と安全管理に従ってください。',
        confidence: reaction.confidence || 'low',
        verificationStatus: reaction.verificationStatus || reaction.verification_status || 'unknown',
        ruleId: reaction.ruleId || reaction.rule_id || null
    };

    normalized.visualDetail = normalizeVisualDetail(reaction.visualDetail || reaction.visual_detail, normalized);
    return normalized;
}

async function requestApiReaction(testTubeChemical, flaskChemical) {
    const response = await fetch(`${API_BASE}/reactions/evaluate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testTubeChemical, flaskChemical })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || 'フリーモード反応の取得に失敗しました。');
    }

    return {
        ...data,
        reaction: normalizeReaction(data.reaction || {})
    };
}

function shouldUseLocalFallback(apiResult) {
    if (!apiResult) return true;
    if (apiResult.source === 'fallback') return true;
    if (apiResult.source === 'db') return false;

    const reaction = apiResult.reaction || {};
    const visualEffect = normalizeVisualEffect(reaction.visualEffect || reaction.visual_effect);
    const isLowConfidence = reaction.confidence === 'low';
    return isLowConfidence && ['unknown', 'none'].includes(visualEffect);
}

export function getFreeModeCoverageSummary() {
    return {
        periodicElementCount: FREE_MODE_PERIODIC_ELEMENT_COUNT,
        periodicOrderedPairCount: FREE_MODE_PERIODIC_ORDERED_PAIR_COUNT,
        periodicDatasetCount: FREE_MODE_PERIODIC_DATA_COUNT,
        periodicVerifiedClassificationCount: FREE_MODE_PERIODIC_VERIFIED_CLASSIFICATION_COUNT,
        periodicVerifiedRepresentativeCount: FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_COUNT,
        periodicVerifiedRepresentativeUniqueCount: FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_UNIQUE_COUNT,
        seedCount: FREE_MODE_REACTION_SEED_COUNT,
        displayText: `対応範囲: 周期表${FREE_MODE_PERIODIC_ELEMENT_COUNT}元素 × ${FREE_MODE_PERIODIC_ELEMENT_COUNT}元素 = ${FREE_MODE_PERIODIC_ORDERED_PAIR_COUNT.toLocaleString('ja-JP')}通り / 全件データ${FREE_MODE_PERIODIC_DATA_COUNT.toLocaleString('ja-JP')}件 / 検証分類${FREE_MODE_PERIODIC_VERIFIED_CLASSIFICATION_COUNT.toLocaleString('ja-JP')}件 / 生成物確定${FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_COUNT.toLocaleString('ja-JP')}通り(${FREE_MODE_PERIODIC_VERIFIED_REPRESENTATIVE_UNIQUE_COUNT.toLocaleString('ja-JP')}組) / seed ${FREE_MODE_REACTION_SEED_COUNT.toLocaleString('ja-JP')}件`
    };
}

function findPeriodicDatasetReaction(testTubeChemical, flaskChemical) {
    const testTubeElement = resolveElement(testTubeChemical);
    const flaskElement = resolveElement(flaskChemical);
    if (!testTubeElement || !flaskElement) return null;

    return PERIODIC_REACTIONS_BY_PAIR_KEY.get(orderedPairKey(testTubeElement, flaskElement)) || null;
}

function findSeedReaction(testTubeChemical, flaskChemical) {
    return SEEDED_REACTIONS_BY_KEY.get(reactionKey(testTubeChemical, flaskChemical)) || null;
}

function reactionResult({
    title,
    summary,
    equation = '',
    visualEffect = 'none',
    liquidColor = '#d8f7ff',
    visualDetail = null,
    safetyNote,
    confidence = 'low'
}) {
    return normalizeReaction({
        title,
        summary,
        equation,
        visualEffect,
        liquidColor,
        visualDetail,
        safetyNote: safetyNote || '実際の薬品を使う場合は、先生の指示と安全管理に従ってください。',
        confidence
    });
}

function inferSchoolChemicalReaction(testTubeChemical, flaskChemical) {
    const a = testTubeChemical;
    const b = flaskChemical;

    if ((isInSchoolGroup(a, 'acids') && isInSchoolGroup(b, 'bases')) || (isInSchoolGroup(b, 'acids') && isInSchoolGroup(a, 'bases'))) {
        return reactionResult({
            title: '中和反応モデル',
            summary: '酸性の物質とアルカリ性の物質が反応し、性質が打ち消し合う様子を色変化で表示します。',
            visualEffect: 'colorChange',
            liquidColor: '#bdf3d4',
            confidence: 'medium'
        });
    }

    if ((isInSchoolGroup(a, 'acids') && isInSchoolGroup(b, 'carbonates')) || (isInSchoolGroup(b, 'acids') && isInSchoolGroup(a, 'carbonates'))) {
        return reactionResult({
            title: '二酸化炭素の発生モデル',
            summary: '酸と炭酸を含む物質が反応し、二酸化炭素が発生する様子を泡で表示します。',
            visualEffect: 'bubbles',
            liquidColor: '#eeeeee',
            visualDetail: {
                productName: '二酸化炭素',
                productState: 'gas',
                solidForm: 'none',
                gasName: '二酸化炭素',
                bubbleColor: '#ffffff',
                colorChange: '#eeeeee',
                displayHint: '二酸化炭素の泡として表示',
                requiredCondition: 'room_temp_mix'
            },
            confidence: 'medium'
        });
    }

    if (isInSchoolGroup(a, 'water') || isInSchoolGroup(b, 'water')) {
        return reactionResult({
            title: '大きな変化なし',
            summary: `${a} と ${b} の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。`,
            visualEffect: 'none',
            liquidColor: '#d8f7ff',
            confidence: 'low'
        });
    }

    if ((hasMaterial(['BTB溶液'], a) && isInSchoolGroup(b, 'acids')) || (hasMaterial(['BTB溶液'], b) && isInSchoolGroup(a, 'acids'))) {
        return reactionResult({
            title: 'BTB溶液の酸性色変化',
            summary: 'BTB溶液は酸性の水溶液で黄色系に変化します。',
            visualEffect: 'colorChange',
            liquidColor: '#f6d84a',
            confidence: 'medium'
        });
    }

    if ((hasMaterial(['BTB溶液'], a) && isInSchoolGroup(b, 'bases')) || (hasMaterial(['BTB溶液'], b) && isInSchoolGroup(a, 'bases'))) {
        return reactionResult({
            title: 'BTB溶液のアルカリ性色変化',
            summary: 'BTB溶液はアルカリ性の水溶液で青色系に変化します。',
            visualEffect: 'colorChange',
            liquidColor: '#4f87ff',
            confidence: 'medium'
        });
    }

    return null;
}

function fallbackReaction(testTubeChemical, flaskChemical) {
    return reactionResult({
        title: '観察候補',
        summary: `${testTubeChemical} と ${flaskChemical} の組み合わせは、登録済みの教材反応ではないため、安全側の観察候補として表示します。`,
        visualEffect: 'none',
        liquidColor: null,
        confidence: 'low'
    });
}

export function evaluateLocalReaction(testTubeChemical, flaskChemical) {
    const periodicDataset = findPeriodicDatasetReaction(testTubeChemical, flaskChemical);
    if (periodicDataset) {
        return {
            source: 'local-periodic-dataset',
            reactionKey: reactionKey(testTubeChemical, flaskChemical),
            orderedPairKey: periodicDataset.pair_key,
            reaction: normalizeReaction(periodicDataset)
        };
    }

    const seeded = findSeedReaction(testTubeChemical, flaskChemical);
    if (seeded) {
        return {
            source: 'local-seed',
            reactionKey: reactionKey(testTubeChemical, flaskChemical),
            reaction: normalizeReaction(seeded)
        };
    }

    const schoolChemical = inferSchoolChemicalReaction(testTubeChemical, flaskChemical);
    if (schoolChemical) {
        return {
            source: 'local-school-rule',
            reactionKey: reactionKey(testTubeChemical, flaskChemical),
            reaction: schoolChemical
        };
    }

    return {
        source: 'local-fallback',
        reactionKey: reactionKey(testTubeChemical, flaskChemical),
        reaction: fallbackReaction(testTubeChemical, flaskChemical)
    };
}

export async function evaluateFreeReaction(testTubeChemical, flaskChemical) {
    try {
        const apiResult = await requestApiReaction(testTubeChemical, flaskChemical);
        if (!shouldUseLocalFallback(apiResult)) return apiResult;

        const localResult = evaluateLocalReaction(testTubeChemical, flaskChemical);
        return {
            ...localResult,
            apiSource: apiResult.source,
            fallbackReason: 'api-low-confidence'
        };
    } catch (error) {
        console.warn('[freeModeApi] API unavailable, using local fallback:', error.message);
        return evaluateLocalReaction(testTubeChemical, flaskChemical);
    }
}
