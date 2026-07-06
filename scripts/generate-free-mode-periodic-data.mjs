import fs from 'fs';
import path from 'path';

import { periodicTableLayout } from '../frontend/src/data/periodicTable.js';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const OUT_PATH = path.join(ROOT_DIR, 'frontend', 'src', 'data', 'freeModePeriodicReactionData.json');
const DATA_VERSION = 'periodic-pairs-2026-06-18-v4-expanded-representatives';

const METAL_CATEGORIES = new Set([
    'alkali-metal',
    'alkaline-earth-metal',
    'transition-metal',
    'post-transition-metal',
    'lanthanide',
    'actinide'
]);

const EXACT_REACTIONS_BY_SYMBOL_KEY = new Map(Object.entries({
    'H__O': {
        ruleId: 'verified-hydrogen-oxygen-water',
        title: '水の生成',
        summary: '水素と酸素は点火などの条件で反応し、水ができます。常温で混ぜるだけでは反応を進める扱いにはしません。',
        equation: '2H2 + O2 -> 2H2O',
        visualEffect: 'bubbles',
        liquidColor: '#bdefff',
        productName: '水',
        productState: 'liquid',
        gasName: '水蒸気',
        bubbleColor: '#ffffff',
        colorChange: '#bdefff',
        displayHint: '水ができる代表反応として、泡と淡い液体色で表示',
        requiredCondition: 'ignition',
        safetyNote: '実際の水素と酸素の混合気は点火で激しく反応するため、VCLでは教材用の表示に限定します。',
        confidence: 'high'
    },
    'Cl__Na': {
        ruleId: 'verified-sodium-chlorine-sodium-chloride',
        title: '塩化ナトリウムの生成',
        summary: 'ナトリウムと塩素は反応して塩化ナトリウムを作ります。実際には非常に激しい反応です。',
        equation: '2Na + Cl2 -> 2NaCl',
        visualEffect: 'precipitate',
        liquidColor: '#f6f1db',
        productName: '塩化ナトリウム',
        productState: 'crystal',
        solidForm: 'crystal',
        solidColor: '#f4edcf',
        colorChange: '#f6f1db',
        displayHint: '白っぽい結晶として表示',
        requiredCondition: 'controlled_reaction',
        safetyNote: '金属ナトリウムと塩素は危険なため、実際の実験手順としては扱いません。',
        confidence: 'high'
    },
    'Fe__S': {
        ruleId: 'verified-iron-sulfur-iron-sulfide',
        title: '硫化鉄の生成',
        summary: '鉄と硫黄は加熱すると反応し、黒っぽい硫化鉄ができます。',
        equation: 'Fe + S -> FeS',
        visualEffect: 'color_change',
        liquidColor: '#25221d',
        productName: '硫化鉄',
        productState: 'solid',
        solidForm: 'powder',
        solidColor: '#25221d',
        colorChange: '#25221d',
        displayHint: '黒っぽい固体への変化として表示',
        requiredCondition: 'heat',
        safetyNote: '実際には加熱が必要なため、火気を扱う実験手順は表示しません。',
        confidence: 'high'
    },
    'Mg__O': {
        ruleId: 'verified-magnesium-oxygen-magnesium-oxide',
        title: '酸化マグネシウムの生成',
        summary: 'マグネシウムは酸素中で燃焼し、白い酸化マグネシウムを作ります。',
        equation: '2Mg + O2 -> 2MgO',
        visualEffect: 'precipitate',
        liquidColor: '#fff7d6',
        productName: '酸化マグネシウム',
        productState: 'powder',
        solidForm: 'powder',
        solidColor: '#f7f3e6',
        colorChange: '#fff7d6',
        displayHint: '白い粉末として表示',
        requiredCondition: 'combustion',
        safetyNote: '実際の燃焼は強い光を出すため、VCLでは観察モデルとして扱います。',
        confidence: 'high'
    },
    'Al__O': {
        ruleId: 'verified-aluminum-oxygen-aluminum-oxide',
        title: '酸化アルミニウムの生成',
        summary: 'アルミニウムは酸素と反応して酸化アルミニウムを作ります。表面に酸化膜を作ることでも知られます。',
        equation: '4Al + 3O2 -> 2Al2O3',
        visualEffect: 'precipitate',
        liquidColor: '#f4f2ea',
        productName: '酸化アルミニウム',
        productState: 'solid',
        solidForm: 'powder',
        solidColor: '#f4f2ea',
        colorChange: '#f4f2ea',
        displayHint: '白っぽい固体として表示',
        requiredCondition: 'surface_oxidation_or_combustion',
        safetyNote: '粉末アルミニウムの燃焼など危険な条件は実験手順として扱いません。',
        confidence: 'medium'
    },
    'Cu__O': {
        ruleId: 'verified-copper-oxygen-copper-oxide',
        title: '酸化銅の生成',
        summary: '銅を加熱すると酸素と反応し、黒色の酸化銅(II)ができる代表例があります。条件によって別の酸化物もあり得ます。',
        equation: '2Cu + O2 -> 2CuO',
        visualEffect: 'color_change',
        liquidColor: '#24221f',
        productName: '酸化銅(II)',
        productState: 'solid',
        solidForm: 'powder',
        solidColor: '#24221f',
        colorChange: '#24221f',
        displayHint: '黒っぽい色変化として表示',
        requiredCondition: 'heat',
        safetyNote: '生成物は条件により変わる可能性があるため、代表例として表示します。',
        confidence: 'medium'
    },
    'C__O': {
        ruleId: 'verified-carbon-oxygen-carbon-dioxide',
        title: '二酸化炭素の生成',
        summary: '炭素は十分な酸素中で燃焼すると二酸化炭素を作ります。酸素が不足すると一酸化炭素ができる場合があります。',
        equation: 'C + O2 -> CO2',
        visualEffect: 'bubbles',
        liquidColor: '#eeeeee',
        productName: '二酸化炭素',
        productState: 'gas',
        gasName: '二酸化炭素',
        bubbleColor: '#ffffff',
        displayHint: '気体発生として表示',
        requiredCondition: 'combustion_with_enough_oxygen',
        safetyNote: '燃焼条件は扱わず、生成物の学習モデルとして表示します。',
        confidence: 'high'
    },
    'O__S': {
        ruleId: 'verified-sulfur-oxygen-sulfur-dioxide',
        title: '二酸化硫黄の生成',
        summary: '硫黄は酸素中で燃焼すると二酸化硫黄を作ります。',
        equation: 'S + O2 -> SO2',
        visualEffect: 'bubbles',
        liquidColor: '#eef3f8',
        productName: '二酸化硫黄',
        productState: 'gas',
        gasName: '二酸化硫黄',
        bubbleColor: '#ffffff',
        displayHint: '気体発生として表示',
        requiredCondition: 'combustion',
        safetyNote: '二酸化硫黄は有害な気体のため、実際の実験手順は表示しません。',
        confidence: 'high'
    },
    'Cl__H': {
        ruleId: 'verified-hydrogen-chlorine-hydrogen-chloride',
        title: '塩化水素の生成',
        summary: '水素と塩素は光や点火などの条件で反応し、塩化水素を作ります。',
        equation: 'H2 + Cl2 -> 2HCl',
        visualEffect: 'bubbles',
        liquidColor: '#dff6ff',
        productName: '塩化水素',
        productState: 'gas',
        gasName: '塩化水素',
        bubbleColor: '#ffffff',
        displayHint: '気体生成として表示',
        requiredCondition: 'light_or_ignition',
        safetyNote: '塩化水素は刺激性・腐食性があるため、実際の実験手順は扱いません。',
        confidence: 'high'
    },
    'F__H': {
        ruleId: 'verified-hydrogen-fluorine-hydrogen-fluoride',
        title: 'フッ化水素の生成',
        summary: '水素とフッ素は反応してフッ化水素を作ります。非常に危険な組み合わせです。',
        equation: 'H2 + F2 -> 2HF',
        visualEffect: 'bubbles',
        liquidColor: '#dff6ff',
        productName: 'フッ化水素',
        productState: 'gas',
        gasName: 'フッ化水素',
        bubbleColor: '#ffffff',
        displayHint: '危険な気体生成として表示',
        requiredCondition: 'unsafe',
        safetyNote: 'フッ素やフッ化水素は非常に危険なため、VCLでは教材用表示だけに限定します。',
        confidence: 'high'
    },
    'Br__H': {
        ruleId: 'verified-hydrogen-bromine-hydrogen-bromide',
        title: '臭化水素の生成',
        summary: '水素と臭素は条件がそろうと臭化水素を作ります。',
        equation: 'H2 + Br2 -> 2HBr',
        visualEffect: 'bubbles',
        liquidColor: '#e8f1ff',
        productName: '臭化水素',
        productState: 'gas',
        gasName: '臭化水素',
        bubbleColor: '#ffffff',
        displayHint: '気体生成として表示',
        requiredCondition: 'heat_or_catalyst',
        safetyNote: '臭化水素は刺激性があるため、実際の実験手順は扱いません。',
        confidence: 'medium'
    },
    'H__I': {
        ruleId: 'verified-hydrogen-iodine-hydrogen-iodide',
        title: 'ヨウ化水素の生成',
        summary: '水素とヨウ素は条件がそろうとヨウ化水素を作ります。反応は条件に強く依存します。',
        equation: 'H2 + I2 -> 2HI',
        visualEffect: 'bubbles',
        liquidColor: '#efe7ff',
        productName: 'ヨウ化水素',
        productState: 'gas',
        gasName: 'ヨウ化水素',
        bubbleColor: '#ffffff',
        displayHint: '条件依存の気体生成として表示',
        requiredCondition: 'heat_or_catalyst',
        safetyNote: 'ヨウ化水素は刺激性があるため、実際の実験手順は扱いません。',
        confidence: 'medium'
    },
    'H__N': {
        ruleId: 'verified-nitrogen-hydrogen-ammonia',
        title: 'アンモニアの生成',
        summary: '窒素と水素からアンモニアを作る反応は知られていますが、実際には高温・高圧・触媒が必要です。',
        equation: 'N2 + 3H2 -> 2NH3',
        visualEffect: 'bubbles',
        liquidColor: '#dff6ff',
        productName: 'アンモニア',
        productState: 'gas',
        gasName: 'アンモニア',
        bubbleColor: '#e9fbff',
        displayHint: '気体生成として表示',
        requiredCondition: 'high_pressure_catalyst',
        safetyNote: 'アンモニアは刺激臭があり、実際の生成反応は学校の混合実験として扱いません。',
        confidence: 'medium'
    },
    'O__Zn': {
        ruleId: 'verified-zinc-oxygen-zinc-oxide',
        title: '酸化亜鉛の生成',
        summary: '亜鉛は加熱条件で酸素と反応し、酸化亜鉛を作ります。',
        equation: '2Zn + O2 -> 2ZnO',
        visualEffect: 'precipitate',
        liquidColor: '#f4f2ea',
        productName: '酸化亜鉛',
        productState: 'powder',
        solidForm: 'powder',
        solidColor: '#f4f2ea',
        colorChange: '#f4f2ea',
        displayHint: '白っぽい粉末として表示',
        requiredCondition: 'heat',
        safetyNote: '実際の加熱操作はVCLでは扱いません。',
        confidence: 'medium'
    },
    'Ca__O': {
        ruleId: 'verified-calcium-oxygen-calcium-oxide',
        title: '酸化カルシウムの生成',
        summary: 'カルシウムは酸素と反応し、酸化カルシウムを作ることがあります。',
        equation: '2Ca + O2 -> 2CaO',
        visualEffect: 'precipitate',
        liquidColor: '#f4f2ea',
        productName: '酸化カルシウム',
        productState: 'powder',
        solidForm: 'powder',
        solidColor: '#f4f2ea',
        colorChange: '#f4f2ea',
        displayHint: '白っぽい粉末として表示',
        requiredCondition: 'controlled_reaction',
        safetyNote: '金属カルシウムの反応は条件管理が必要なため、教材表示に限定します。',
        confidence: 'medium'
    }
}));

const HALOGENS = [
    { symbol: 'F', prefix: 'フッ化', molecule: 'F2', safety: 'フッ素やフッ化物は危険性が高いため、VCLでは教材用表示だけに限定します。' },
    { symbol: 'Cl', prefix: '塩化', molecule: 'Cl2', safety: '塩素は有害な気体のため、実際の実験手順は扱いません。' },
    { symbol: 'Br', prefix: '臭化', molecule: 'Br2', safety: '臭素は有害なため、実際の実験手順は扱いません。' },
    { symbol: 'I', prefix: 'ヨウ化', molecule: 'I2', safety: 'ヨウ素やヨウ化物の扱いは条件管理が必要なため、教材用表示に限定します。' }
];

const ALKALI_METALS_FOR_HALIDES = [
    { symbol: 'Li', name: 'リチウム' },
    { symbol: 'Na', name: 'ナトリウム' },
    { symbol: 'K', name: 'カリウム' },
    { symbol: 'Rb', name: 'ルビジウム' },
    { symbol: 'Cs', name: 'セシウム' }
];

const ALKALINE_EARTH_METALS_FOR_HALIDES = [
    { symbol: 'Mg', name: 'マグネシウム' },
    { symbol: 'Ca', name: 'カルシウム' },
    { symbol: 'Sr', name: 'ストロンチウム' },
    { symbol: 'Ba', name: 'バリウム' }
];

function exactSymbolKey(symbolA, symbolB) {
    return [symbolA, symbolB].sort((left, right) => left.localeCompare(right)).join('__');
}

function registerExactReaction(symbolA, symbolB, reaction) {
    const key = exactSymbolKey(symbolA, symbolB);
    if (!EXACT_REACTIONS_BY_SYMBOL_KEY.has(key)) {
        EXACT_REACTIONS_BY_SYMBOL_KEY.set(key, reaction);
    }
}

function registerAlkaliMetalHalides() {
    for (const metal of ALKALI_METALS_FOR_HALIDES) {
        for (const halogen of HALOGENS) {
            const formula = `${metal.symbol}${halogen.symbol}`;
            const productName = `${halogen.prefix}${metal.name}`;
            registerExactReaction(metal.symbol, halogen.symbol, {
                ruleId: `verified-${metal.symbol.toLowerCase()}-${halogen.symbol.toLowerCase()}-halide`,
                title: `${productName}の生成`,
                summary: `${metal.name}と${halogen.prefix.replace('化', '')}素は反応して、${productName}を作ります。実際には反応性や危険性が高い組み合わせです。`,
                equation: `2${metal.symbol} + ${halogen.molecule} -> 2${formula}`,
                visualEffect: 'precipitate',
                liquidColor: '#f6f1db',
                productName,
                productState: 'crystal',
                solidForm: 'crystal',
                solidColor: '#f4edcf',
                colorChange: '#f6f1db',
                displayHint: 'ハロゲン化物の結晶として表示',
                requiredCondition: 'controlled_reaction',
                safetyNote: halogen.safety,
                confidence: 'high'
            });
        }
    }
}

function registerAlkalineEarthMetalHalides() {
    for (const metal of ALKALINE_EARTH_METALS_FOR_HALIDES) {
        for (const halogen of HALOGENS) {
            const formula = `${metal.symbol}${halogen.symbol}2`;
            const productName = `${halogen.prefix}${metal.name}`;
            registerExactReaction(metal.symbol, halogen.symbol, {
                ruleId: `verified-${metal.symbol.toLowerCase()}-${halogen.symbol.toLowerCase()}2-halide`,
                title: `${productName}の生成`,
                summary: `${metal.name}と${halogen.prefix.replace('化', '')}素は、条件がそろうと${productName}を作ります。`,
                equation: `${metal.symbol} + ${halogen.molecule} -> ${formula}`,
                visualEffect: 'precipitate',
                liquidColor: '#f6f1db',
                productName,
                productState: 'crystal',
                solidForm: 'crystal',
                solidColor: '#f4edcf',
                colorChange: '#f6f1db',
                displayHint: 'ハロゲン化物の結晶として表示',
                requiredCondition: 'controlled_reaction',
                safetyNote: halogen.safety,
                confidence: 'high'
            });
        }
    }
}

function registerAluminumHalides() {
    for (const halogen of HALOGENS) {
        const productName = `${halogen.prefix}アルミニウム`;
        registerExactReaction('Al', halogen.symbol, {
            ruleId: `verified-aluminum-${halogen.symbol.toLowerCase()}-halide`,
            title: `${productName}の生成`,
            summary: `アルミニウムと${halogen.prefix.replace('化', '')}素は、条件がそろうと${productName}を作ります。`,
            equation: `2Al + 3${halogen.molecule} -> 2Al${halogen.symbol}3`,
            visualEffect: 'precipitate',
            liquidColor: '#f6f1db',
            productName,
            productState: 'crystal',
            solidForm: 'crystal',
            solidColor: '#f4edcf',
            colorChange: '#f6f1db',
            displayHint: 'ハロゲン化アルミニウムの固体として表示',
            requiredCondition: 'controlled_reaction',
            safetyNote: halogen.safety,
            confidence: 'medium'
        });
    }
}

function registerNamedExactReactions() {
    const rows = [
        ['Li', 'O', '酸化リチウムの生成', 'リチウムは酸素と反応して酸化リチウムを作ります。', '4Li + O2 -> 2Li2O', '酸化リチウム', 'precipitate', 'powder', '#f4f2ea', 'controlled_reaction'],
        ['Be', 'O', '酸化ベリリウムの生成', 'ベリリウムは酸素と反応して酸化ベリリウムを作ります。ベリリウム化合物は毒性があるため安全側に扱います。', '2Be + O2 -> 2BeO', '酸化ベリリウム', 'precipitate', 'powder', '#f4f2ea', 'unsafe'],
        ['B', 'O', '酸化ホウ素の生成', 'ホウ素は酸素と反応して酸化ホウ素を作ります。', '4B + 3O2 -> 2B2O3', '酸化ホウ素', 'precipitate', 'powder', '#f4f2ea', 'combustion'],
        ['Si', 'O', '二酸化ケイ素の生成', 'ケイ素は酸素と反応して二酸化ケイ素を作ります。', 'Si + O2 -> SiO2', '二酸化ケイ素', 'precipitate', 'crystal', '#d8d8d8', 'heat_or_combustion'],
        ['P', 'O', '十酸化四リンの生成', 'リンは十分な酸素中で燃焼すると、十酸化四リンを作ります。', 'P4 + 5O2 -> P4O10', '十酸化四リン', 'precipitate', 'powder', '#f4f2ea', 'combustion'],
        ['Ti', 'O', '二酸化チタンの生成', 'チタンは酸素と反応して二酸化チタンを作ります。', 'Ti + O2 -> TiO2', '二酸化チタン', 'precipitate', 'powder', '#f4f2ea', 'heat_or_surface_oxidation'],
        ['Cr', 'O', '酸化クロム(III)の生成', 'クロムは条件がそろうと酸化クロム(III)を作ります。', '4Cr + 3O2 -> 2Cr2O3', '酸化クロム(III)', 'color_change', 'powder', '#4f7f46', 'heat'],
        ['Mn', 'O', '二酸化マンガンの生成', 'マンガンは酸素と反応して二酸化マンガンなどの酸化物を作ります。ここでは代表例として二酸化マンガンを扱います。', 'Mn + O2 -> MnO2', '二酸化マンガン', 'color_change', 'powder', '#2f2b26', 'heat'],
        ['Fe', 'O', '酸化鉄(III)の生成', '鉄は酸素と反応して酸化鉄を作ります。条件によって酸化物は変わるため、代表例として酸化鉄(III)を扱います。', '4Fe + 3O2 -> 2Fe2O3', '酸化鉄(III)', 'color_change', 'powder', '#8a3f2b', 'heat_or_surface_oxidation'],
        ['Ni', 'O', '酸化ニッケル(II)の生成', 'ニッケルは酸素と反応して酸化ニッケル(II)を作ることがあります。', '2Ni + O2 -> 2NiO', '酸化ニッケル(II)', 'color_change', 'powder', '#2f3a2c', 'heat'],
        ['Sr', 'O', '酸化ストロンチウムの生成', 'ストロンチウムは酸素と反応して酸化ストロンチウムを作ります。', '2Sr + O2 -> 2SrO', '酸化ストロンチウム', 'precipitate', 'powder', '#f4f2ea', 'controlled_reaction'],
        ['Ba', 'O', '酸化バリウムの生成', 'バリウムは酸素と反応して酸化バリウムを作ります。条件によって過酸化物も関係するため代表例として扱います。', '2Ba + O2 -> 2BaO', '酸化バリウム', 'precipitate', 'powder', '#f4f2ea', 'controlled_reaction'],
        ['Sn', 'O', '酸化スズ(IV)の生成', 'スズは酸素と反応して酸化スズ(IV)を作ることがあります。', 'Sn + O2 -> SnO2', '酸化スズ(IV)', 'precipitate', 'powder', '#f4f2ea', 'heat'],
        ['Pb', 'O', '酸化鉛(II)の生成', '鉛は酸素と反応して酸化鉛を作ることがあります。ここでは代表例として酸化鉛(II)を扱います。', '2Pb + O2 -> 2PbO', '酸化鉛(II)', 'color_change', 'powder', '#d6a842', 'heat'],

        ['Li', 'S', '硫化リチウムの生成', 'リチウムと硫黄は硫化リチウムを作ります。', '2Li + S -> Li2S', '硫化リチウム', 'precipitate', 'crystal', '#eee7c8', 'controlled_reaction'],
        ['Na', 'S', '硫化ナトリウムの生成', 'ナトリウムと硫黄は硫化ナトリウムを作ります。', '2Na + S -> Na2S', '硫化ナトリウム', 'precipitate', 'crystal', '#eee7c8', 'controlled_reaction'],
        ['K', 'S', '硫化カリウムの生成', 'カリウムと硫黄は硫化カリウムを作ります。', '2K + S -> K2S', '硫化カリウム', 'precipitate', 'crystal', '#eee7c8', 'controlled_reaction'],
        ['Mg', 'S', '硫化マグネシウムの生成', 'マグネシウムと硫黄は硫化マグネシウムを作ります。', 'Mg + S -> MgS', '硫化マグネシウム', 'precipitate', 'powder', '#eee7c8', 'heat'],
        ['Ca', 'S', '硫化カルシウムの生成', 'カルシウムと硫黄は硫化カルシウムを作ります。', 'Ca + S -> CaS', '硫化カルシウム', 'precipitate', 'powder', '#eee7c8', 'heat'],
        ['Zn', 'S', '硫化亜鉛の生成', '亜鉛と硫黄は硫化亜鉛を作ります。', 'Zn + S -> ZnS', '硫化亜鉛', 'precipitate', 'powder', '#f4f2ea', 'heat'],
        ['Al', 'S', '硫化アルミニウムの生成', 'アルミニウムと硫黄は硫化アルミニウムを作ります。', '2Al + 3S -> Al2S3', '硫化アルミニウム', 'precipitate', 'powder', '#eee7c8', 'heat'],
        ['Cu', 'S', '硫化銅(I)の生成', '銅と硫黄は硫化銅を作ります。ここでは代表例として硫化銅(I)を扱います。', '2Cu + S -> Cu2S', '硫化銅(I)', 'color_change', 'powder', '#25221d', 'heat'],
        ['Ag', 'S', '硫化銀の生成', '銀と硫黄は硫化銀を作ります。銀が黒ずむ現象にも関係します。', '2Ag + S -> Ag2S', '硫化銀', 'color_change', 'powder', '#25221d', 'surface_reaction'],
        ['Pb', 'S', '硫化鉛(II)の生成', '鉛と硫黄は硫化鉛(II)を作ります。', 'Pb + S -> PbS', '硫化鉛(II)', 'color_change', 'powder', '#25221d', 'heat'],
        ['Hg', 'S', '硫化水銀(II)の生成', '水銀と硫黄は硫化水銀(II)を作ります。水銀は危険なため安全側に扱います。', 'Hg + S -> HgS', '硫化水銀(II)', 'color_change', 'powder', '#8f1f1f', 'unsafe'],

        ['Li', 'N', '窒化リチウムの生成', 'リチウムは窒素と反応して窒化リチウムを作ります。', '6Li + N2 -> 2Li3N', '窒化リチウム', 'precipitate', 'powder', '#8a3f2b', 'controlled_reaction'],
        ['Mg', 'N', '窒化マグネシウムの生成', 'マグネシウムは窒素と反応して窒化マグネシウムを作ります。', '3Mg + N2 -> Mg3N2', '窒化マグネシウム', 'precipitate', 'powder', '#d8cfb8', 'heat'],
        ['Ca', 'N', '窒化カルシウムの生成', 'カルシウムは窒素と反応して窒化カルシウムを作ります。', '3Ca + N2 -> Ca3N2', '窒化カルシウム', 'precipitate', 'powder', '#d8cfb8', 'heat'],
        ['Al', 'N', '窒化アルミニウムの生成', 'アルミニウムは窒素と反応して窒化アルミニウムを作ります。', '2Al + N2 -> 2AlN', '窒化アルミニウム', 'precipitate', 'powder', '#d8cfb8', 'high_temperature'],
        ['B', 'N', '窒化ホウ素の生成', 'ホウ素と窒素は窒化ホウ素を作ります。', '2B + N2 -> 2BN', '窒化ホウ素', 'precipitate', 'powder', '#f4f2ea', 'high_temperature'],
        ['Si', 'N', '窒化ケイ素の生成', 'ケイ素と窒素は窒化ケイ素を作ります。', '3Si + 2N2 -> Si3N4', '窒化ケイ素', 'precipitate', 'powder', '#d8d8d8', 'high_temperature'],

        ['Ca', 'C', '炭化カルシウムの生成', 'カルシウムと炭素は高温条件で炭化カルシウムを作ります。', 'Ca + 2C -> CaC2', '炭化カルシウム', 'precipitate', 'crystal', '#6f6a5d', 'high_temperature'],
        ['Si', 'C', '炭化ケイ素の生成', 'ケイ素と炭素は高温条件で炭化ケイ素を作ります。', 'Si + C -> SiC', '炭化ケイ素', 'precipitate', 'crystal', '#5c5c5c', 'high_temperature'],
        ['Al', 'C', '炭化アルミニウムの生成', 'アルミニウムと炭素は高温条件で炭化アルミニウムを作ります。', '4Al + 3C -> Al4C3', '炭化アルミニウム', 'precipitate', 'crystal', '#77736a', 'high_temperature'],
        ['B', 'C', '炭化ホウ素の生成', 'ホウ素と炭素は高温条件で炭化ホウ素を作ります。', '4B + C -> B4C', '炭化ホウ素', 'precipitate', 'crystal', '#4f4f4f', 'high_temperature'],
        ['Ti', 'C', '炭化チタンの生成', 'チタンと炭素は高温条件で炭化チタンを作ります。', 'Ti + C -> TiC', '炭化チタン', 'precipitate', 'crystal', '#555555', 'high_temperature'],
        ['W', 'C', '炭化タングステンの生成', 'タングステンと炭素は高温条件で炭化タングステンを作ります。', 'W + C -> WC', '炭化タングステン', 'precipitate', 'crystal', '#555555', 'high_temperature'],
        ['Fe', 'C', 'セメンタイトの生成', '鉄と炭素は製鉄・鋼の文脈で炭化鉄であるセメンタイトに関係します。', '3Fe + C -> Fe3C', '炭化鉄(セメンタイト)', 'precipitate', 'crystal', '#555555', 'high_temperature_metallurgy'],

        ['Mg', 'P', 'リン化マグネシウムの生成', 'マグネシウムとリンはリン化マグネシウムを作ります。', '6Mg + P4 -> 2Mg3P2', 'リン化マグネシウム', 'precipitate', 'powder', '#7c6f5a', 'heat'],
        ['Ca', 'P', 'リン化カルシウムの生成', 'カルシウムとリンはリン化カルシウムを作ります。', '6Ca + P4 -> 2Ca3P2', 'リン化カルシウム', 'precipitate', 'powder', '#7c6f5a', 'heat'],
        ['Al', 'P', 'リン化アルミニウムの生成', 'アルミニウムとリンはリン化アルミニウムを作ります。', '4Al + P4 -> 4AlP', 'リン化アルミニウム', 'precipitate', 'powder', '#7c6f5a', 'controlled_reaction'],
        ['Zn', 'P', 'リン化亜鉛の生成', '亜鉛とリンはリン化亜鉛を作ります。', '6Zn + P4 -> 2Zn3P2', 'リン化亜鉛', 'precipitate', 'powder', '#7c6f5a', 'controlled_reaction']
    ];

    for (const [symbolA, symbolB, title, summary, equation, productName, visualEffect, solidForm, color, requiredCondition] of rows) {
        registerExactReaction(symbolA, symbolB, {
            ruleId: `verified-${symbolA.toLowerCase()}-${symbolB.toLowerCase()}-${productName}`,
            title,
            summary,
            equation,
            visualEffect,
            liquidColor: color,
            productName,
            productState: solidForm === 'none' ? 'unknown' : solidForm,
            solidForm,
            solidColor: color,
            colorChange: color,
            displayHint: `${productName}の生成物として表示`,
            requiredCondition,
            safetyNote: '実際の反応は温度、濃度、物質の状態、安全管理に左右されるため、VCLでは教材用の代表例として表示します。',
            confidence: requiredCondition === 'unsafe' ? 'medium' : 'high'
        });
    }
}

function stateVisual({
    productName,
    productState = 'powder',
    solidForm = 'powder',
    color = '#f4f2ea',
    displayHint = null
}) {
    if (productState === 'gas') {
        return {
            visualEffect: 'bubbles',
            liquidColor: '#dff6ff',
            productState: 'gas',
            solidForm: 'none',
            solidColor: null,
            gasName: productName,
            bubbleColor: '#ffffff',
            colorChange: null,
            displayHint: displayHint || `${productName}を気体の泡として表示`
        };
    }

    if (productState === 'liquid') {
        return {
            visualEffect: 'color_change',
            liquidColor: color,
            productState: 'liquid',
            solidForm: 'none',
            solidColor: null,
            gasName: null,
            bubbleColor: null,
            colorChange: color,
            displayHint: displayHint || `${productName}による液体色の変化として表示`
        };
    }

    return {
        visualEffect: 'precipitate',
        liquidColor: color,
        productState,
        solidForm,
        solidColor: color,
        gasName: null,
        bubbleColor: null,
        colorChange: color,
        displayHint: displayHint || `${productName}を${solidForm === 'crystal' ? '結晶' : '粉末'}として表示`
    };
}

function registerExpandedReactionRow(row) {
    const visual = stateVisual({
        productName: row.productName,
        productState: row.productState,
        solidForm: row.solidForm,
        color: row.color,
        displayHint: row.displayHint
    });
    const formulaId = String(row.formula || row.productName)
        .normalize('NFKC')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();

    registerExactReaction(row.symbolA, row.symbolB, {
        ruleId: row.ruleId || `verified-${row.symbolA.toLowerCase()}-${row.symbolB.toLowerCase()}-${formulaId}`,
        title: row.title || `${row.productName}の生成`,
        summary: row.summary || `${row.productName}は、${row.requiredConditionLabel || '条件を制御した反応'}で生成物として扱える代表的な二元化合物です。`,
        equation: row.equation,
        visualEffect: row.visualEffect || visual.visualEffect,
        liquidColor: row.liquidColor || visual.liquidColor,
        productName: row.productName,
        productState: row.productState || visual.productState,
        solidForm: row.solidForm || visual.solidForm,
        solidColor: row.solidColor || visual.solidColor,
        gasName: row.gasName || visual.gasName,
        bubbleColor: row.bubbleColor || visual.bubbleColor,
        colorChange: row.colorChange || visual.colorChange,
        displayHint: visual.displayHint,
        requiredCondition: row.requiredCondition || 'controlled_reaction',
        safetyNote: row.safetyNote || '実際の反応は温度、物質の状態、毒性、発熱などの安全管理に左右されるため、VCLでは教材用の代表例として表示します。',
        confidence: row.confidence || 'medium'
    });
}

function registerHydrides() {
    const alkaliHydrides = [
        ['Li', 'リチウム', 'LiH'],
        ['Na', 'ナトリウム', 'NaH'],
        ['K', 'カリウム', 'KH'],
        ['Rb', 'ルビジウム', 'RbH'],
        ['Cs', 'セシウム', 'CsH']
    ];

    for (const [symbol, name, formula] of alkaliHydrides) {
        registerExpandedReactionRow({
            symbolA: symbol,
            symbolB: 'H',
            formula,
            productName: `水素化${name}`,
            summary: `${name}は水素と反応して、イオン性水素化物である水素化${name}を作ります。`,
            equation: `2${symbol} + H2 -> 2${formula}`,
            productState: 'crystal',
            solidForm: 'crystal',
            color: '#eee8d2',
            requiredCondition: 'controlled_reaction',
            requiredConditionLabel: '水素との制御反応',
            confidence: 'high'
        });
    }

    const divalentHydrides = [
        ['Be', 'ベリリウム', 'BeH2', 'controlled_synthesis', 'ベリリウム化合物は毒性があるため、VCLでは教材用表示だけに限定します。'],
        ['Mg', 'マグネシウム', 'MgH2', 'heat_or_pressure_control', null],
        ['Ca', 'カルシウム', 'CaH2', 'controlled_reaction', null],
        ['Sr', 'ストロンチウム', 'SrH2', 'controlled_reaction', null],
        ['Ba', 'バリウム', 'BaH2', 'controlled_reaction', null]
    ];

    for (const [symbol, name, formula, requiredCondition, safetyNote] of divalentHydrides) {
        registerExpandedReactionRow({
            symbolA: symbol,
            symbolB: 'H',
            formula,
            productName: `水素化${name}`,
            summary: `${name}は条件を制御すると、水素化${name}を作ります。`,
            equation: `${symbol} + H2 -> ${formula}`,
            productState: 'powder',
            solidForm: 'powder',
            color: '#eee8d2',
            requiredCondition,
            requiredConditionLabel: '水素との制御反応',
            safetyNote,
            confidence: symbol === 'Be' ? 'medium' : 'high'
        });
    }

    registerExpandedReactionRow({
        symbolA: 'Al',
        symbolB: 'H',
        formula: 'AlH3',
        productName: '水素化アルミニウム',
        summary: 'アルミニウムと水素から水素化アルミニウムを扱う場合は、通常の混合ではなく制御された合成条件が必要です。',
        equation: '2Al + 3H2 -> 2AlH3',
        productState: 'powder',
        solidForm: 'powder',
        color: '#eee8d2',
        requiredCondition: 'controlled_synthesis',
        confidence: 'medium'
    });
}

function halideStateFor({ symbol, groupType }) {
    if (groupType === 'boronTrihalide') {
        if (symbol === 'F' || symbol === 'Cl') return { productState: 'gas', solidForm: 'none', color: '#dff6ff' };
        if (symbol === 'Br') return { productState: 'liquid', solidForm: 'none', color: '#c58b4c' };
        return { productState: 'crystal', solidForm: 'crystal', color: '#7a4f8f' };
    }

    if (groupType === 'tetrahalideVolatile') {
        if (symbol === 'F') return { productState: 'gas', solidForm: 'none', color: '#dff6ff' };
        if (symbol === 'Cl' || symbol === 'Br') return { productState: 'liquid', solidForm: 'none', color: symbol === 'Br' ? '#c58b4c' : '#dfefff' };
        return { productState: 'crystal', solidForm: 'crystal', color: '#7a4f8f' };
    }

    if (groupType === 'tinTetrahalide' && symbol === 'Cl') {
        return { productState: 'liquid', solidForm: 'none', color: '#dfefff' };
    }

    return {
        productState: 'crystal',
        solidForm: 'crystal',
        color: symbol === 'I' ? '#ead78a' : '#f4edcf'
    };
}

function registerExpandedHalides() {
    const tetraPrefixBySymbol = {
        F: '四フッ化',
        Cl: '四塩化',
        Br: '四臭化',
        I: '四ヨウ化'
    };

    const berylliumHalides = [
        { symbol: 'Be', name: 'ベリリウム', valence: 'II' }
    ];
    for (const metal of berylliumHalides) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: metal.symbol,
                symbolB: halogen.symbol,
                formula: `${metal.symbol}${halogen.symbol}2`,
                productName: `${halogen.prefix}${metal.name}`,
                summary: `${metal.name}は${halogen.prefix.replace('化', '')}素と反応して、${halogen.prefix}${metal.name}を作ります。ベリリウム化合物は安全側に扱います。`,
                equation: `${metal.symbol} + ${halogen.molecule} -> ${metal.symbol}${halogen.symbol}2`,
                ...halideStateFor({ symbol: halogen.symbol, groupType: 'solidHalide' }),
                requiredCondition: 'controlled_reaction',
                safetyNote: 'ベリリウム化合物やハロゲンは危険性が高いため、VCLでは教材用表示だけに限定します。',
                confidence: 'medium'
            });
        }
    }

    const trivalentHalideElements = [
        { symbol: 'B', name: 'ホウ素', groupType: 'boronTrihalide' },
        { symbol: 'Ga', name: 'ガリウム', groupType: 'solidHalide' },
        { symbol: 'In', name: 'インジウム', groupType: 'solidHalide' },
        { symbol: 'Sb', name: 'アンチモン', groupType: 'solidHalide' },
        { symbol: 'Bi', name: 'ビスマス', groupType: 'solidHalide' }
    ];

    for (const element of trivalentHalideElements) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: element.symbol,
                symbolB: halogen.symbol,
                formula: `${element.symbol}${halogen.symbol}3`,
                productName: `${halogen.prefix}${element.name}(III)`,
                summary: `${element.name}と${halogen.prefix.replace('化', '')}素は、条件を制御すると${halogen.prefix}${element.name}(III)を作ります。`,
                equation: `2${element.symbol} + 3${halogen.molecule} -> 2${element.symbol}${halogen.symbol}3`,
                ...halideStateFor({ symbol: halogen.symbol, groupType: element.groupType }),
                requiredCondition: 'controlled_halogenation',
                safetyNote: 'ハロゲン化物の多くは腐食性や毒性があるため、VCLでは教材用表示だけに限定します。',
                confidence: element.symbol === 'B' ? 'medium' : 'high'
            });
        }
    }

    const tetravalentHalideElements = [
        { symbol: 'Si', name: 'ケイ素', groupType: 'tetrahalideVolatile' },
        { symbol: 'Ge', name: 'ゲルマニウム', groupType: 'tetrahalideVolatile' },
        { symbol: 'Sn', name: 'スズ', groupType: 'tinTetrahalide' }
    ];

    for (const element of tetravalentHalideElements) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: element.symbol,
                symbolB: halogen.symbol,
                formula: `${element.symbol}${halogen.symbol}4`,
                productName: `${tetraPrefixBySymbol[halogen.symbol]}${element.name}`,
                summary: `${element.name}と${halogen.prefix.replace('化', '')}素は、条件を制御すると${tetraPrefixBySymbol[halogen.symbol]}${element.name}を作ります。`,
                equation: `${element.symbol} + 2${halogen.molecule} -> ${element.symbol}${halogen.symbol}4`,
                ...halideStateFor({ symbol: halogen.symbol, groupType: element.groupType }),
                requiredCondition: 'controlled_halogenation',
                safetyNote: '四ハロゲン化物には揮発性や腐食性を持つものがあるため、VCLでは教材用表示だけに限定します。',
                confidence: 'high'
            });
        }
    }

    const divalentHeavyHalides = [
        { symbol: 'Pb', name: '鉛' }
    ];

    for (const element of divalentHeavyHalides) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: element.symbol,
                symbolB: halogen.symbol,
                formula: `${element.symbol}${halogen.symbol}2`,
                productName: `${halogen.prefix}${element.name}(II)`,
                summary: `${element.name}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${element.name}(II)を作ります。`,
                equation: `${element.symbol} + ${halogen.molecule} -> ${element.symbol}${halogen.symbol}2`,
                ...halideStateFor({ symbol: halogen.symbol, groupType: 'solidHalide' }),
                requiredCondition: 'controlled_halogenation',
                safetyNote: '鉛化合物とハロゲンは有害なため、VCLでは教材用表示だけに限定します。',
                confidence: 'medium'
            });
        }
    }
}

function registerAdditionalRepresentativeRows() {
    const rows = [
        ['Na', 'O', 'Na2O', '酸化ナトリウム', 'ナトリウムは酸素量を制御すると酸化ナトリウムを作ります。過酸化物もあり得るため条件付き代表例です。', '4Na + O2 -> 2Na2O', 'powder', '#f4f2ea', 'oxygen_limited_controlled_reaction', 'medium'],
        ['K', 'O', 'K2O', '酸化カリウム', 'カリウムは酸素量を制御すると酸化カリウムを作ります。過酸化物・超酸化物もあり得るため条件付き代表例です。', '4K + O2 -> 2K2O', 'powder', '#f4f2ea', 'oxygen_limited_controlled_reaction', 'medium'],
        ['Rb', 'O', 'Rb2O', '酸化ルビジウム', 'ルビジウムは酸素量を制御すると酸化ルビジウムを作ります。実際の生成物は条件に強く依存します。', '4Rb + O2 -> 2Rb2O', 'powder', '#f4f2ea', 'oxygen_limited_controlled_reaction', 'medium'],
        ['Cs', 'O', 'Cs2O', '酸化セシウム', 'セシウムは酸素量を制御すると酸化セシウムを作ります。実際の生成物は条件に強く依存します。', '4Cs + O2 -> 2Cs2O', 'powder', '#f4f2ea', 'oxygen_limited_controlled_reaction', 'medium'],
        ['Sc', 'O', 'Sc2O3', '酸化スカンジウム', 'スカンジウムは酸素と反応して酸化スカンジウムを作ります。', '4Sc + 3O2 -> 2Sc2O3', 'powder', '#f4f2ea', 'heat_or_combustion', 'high'],
        ['V', 'O', 'V2O5', '酸化バナジウム(V)', 'バナジウムは酸素と反応して酸化バナジウム(V)を作る代表例があります。', '4V + 5O2 -> 2V2O5', 'powder', '#d99a2b', 'heat_or_combustion', 'medium'],
        ['Co', 'O', 'CoO', '酸化コバルト(II)', 'コバルトは条件を制御すると酸化コバルト(II)を作ります。', '2Co + O2 -> 2CoO', 'powder', '#3d3b34', 'heat', 'medium'],
        ['Ga', 'O', 'Ga2O3', '酸化ガリウム(III)', 'ガリウムは酸素と反応して酸化ガリウム(III)を作ります。', '4Ga + 3O2 -> 2Ga2O3', 'powder', '#f4f2ea', 'heat_or_surface_oxidation', 'high'],
        ['Ge', 'O', 'GeO2', '二酸化ゲルマニウム', 'ゲルマニウムは酸素と反応して二酸化ゲルマニウムを作ります。', 'Ge + O2 -> GeO2', 'powder', '#f4f2ea', 'heat_or_combustion', 'high'],
        ['Zr', 'O', 'ZrO2', '二酸化ジルコニウム', 'ジルコニウムは酸素と反応して二酸化ジルコニウムを作ります。', 'Zr + O2 -> ZrO2', 'powder', '#f4f2ea', 'heat_or_surface_oxidation', 'high'],
        ['Nb', 'O', 'Nb2O5', '酸化ニオブ(V)', 'ニオブは酸素と反応して酸化ニオブ(V)を作る代表例があります。', '4Nb + 5O2 -> 2Nb2O5', 'powder', '#f4f2ea', 'heat', 'medium'],
        ['Mo', 'O', 'MoO3', '酸化モリブデン(VI)', 'モリブデンは酸素と反応して酸化モリブデン(VI)を作る代表例があります。', '2Mo + 3O2 -> 2MoO3', 'powder', '#efe4a8', 'heat', 'medium'],
        ['Cd', 'O', 'CdO', '酸化カドミウム', 'カドミウムは酸素と反応して酸化カドミウムを作ります。', '2Cd + O2 -> 2CdO', 'powder', '#8b4c2f', 'heat', 'medium'],
        ['In', 'O', 'In2O3', '酸化インジウム(III)', 'インジウムは酸素と反応して酸化インジウム(III)を作ります。', '4In + 3O2 -> 2In2O3', 'powder', '#f4f2ea', 'heat', 'high'],
        ['Se', 'O', 'SeO2', '二酸化セレン', 'セレンは酸素と反応して二酸化セレンを作ります。', 'Se + O2 -> SeO2', 'powder', '#f4f2ea', 'combustion', 'medium'],
        ['Te', 'O', 'TeO2', '二酸化テルル', 'テルルは酸素と反応して二酸化テルルを作ります。', 'Te + O2 -> TeO2', 'powder', '#f4f2ea', 'combustion', 'medium'],
        ['Sb', 'O', 'Sb2O3', '酸化アンチモン(III)', 'アンチモンは酸素と反応して酸化アンチモン(III)を作る代表例があります。', '4Sb + 3O2 -> 2Sb2O3', 'powder', '#f4f2ea', 'heat', 'medium'],
        ['Bi', 'O', 'Bi2O3', '酸化ビスマス(III)', 'ビスマスは酸素と反応して酸化ビスマス(III)を作ります。', '4Bi + 3O2 -> 2Bi2O3', 'powder', '#d4a23b', 'heat', 'high'],
        ['Y', 'O', 'Y2O3', '酸化イットリウム', 'イットリウムは酸素と反応して酸化イットリウムを作ります。', '4Y + 3O2 -> 2Y2O3', 'powder', '#f4f2ea', 'heat_or_combustion', 'high'],

        ['Be', 'S', 'BeS', '硫化ベリリウム', 'ベリリウムと硫黄は硫化ベリリウムを作ります。毒性があるため安全側に扱います。', 'Be + S -> BeS', 'powder', '#eee7c8', 'controlled_reaction', 'medium'],
        ['Sr', 'S', 'SrS', '硫化ストロンチウム', 'ストロンチウムと硫黄は硫化ストロンチウムを作ります。', 'Sr + S -> SrS', 'powder', '#eee7c8', 'heat', 'high'],
        ['Ba', 'S', 'BaS', '硫化バリウム', 'バリウムと硫黄は硫化バリウムを作ります。', 'Ba + S -> BaS', 'powder', '#eee7c8', 'heat', 'high'],
        ['Mn', 'S', 'MnS', '硫化マンガン(II)', 'マンガンと硫黄は硫化マンガン(II)を作る代表例があります。', 'Mn + S -> MnS', 'powder', '#b08a7a', 'heat', 'medium'],
        ['Co', 'S', 'CoS', '硫化コバルト(II)', 'コバルトと硫黄は硫化コバルト(II)を作る代表例があります。', 'Co + S -> CoS', 'powder', '#25221d', 'heat', 'medium'],
        ['Ni', 'S', 'NiS', '硫化ニッケル(II)', 'ニッケルと硫黄は硫化ニッケル(II)を作る代表例があります。', 'Ni + S -> NiS', 'powder', '#25221d', 'heat', 'medium'],
        ['Cd', 'S', 'CdS', '硫化カドミウム', 'カドミウムと硫黄は硫化カドミウムを作ります。', 'Cd + S -> CdS', 'powder', '#f1ce38', 'controlled_reaction', 'medium'],
        ['Ga', 'S', 'Ga2S3', '硫化ガリウム(III)', 'ガリウムと硫黄は硫化ガリウム(III)を作ります。', '2Ga + 3S -> Ga2S3', 'powder', '#eee7c8', 'heat', 'high'],
        ['In', 'S', 'In2S3', '硫化インジウム(III)', 'インジウムと硫黄は硫化インジウム(III)を作ります。', '2In + 3S -> In2S3', 'powder', '#d99a2b', 'heat', 'high'],
        ['Ge', 'S', 'GeS2', '硫化ゲルマニウム(IV)', 'ゲルマニウムと硫黄は硫化ゲルマニウム(IV)を作ります。', 'Ge + 2S -> GeS2', 'powder', '#f4f2ea', 'heat', 'high'],
        ['Sn', 'S', 'SnS2', '硫化スズ(IV)', 'スズと硫黄は硫化スズ(IV)を作る代表例があります。', 'Sn + 2S -> SnS2', 'flake', '#c9a227', 'heat', 'medium'],
        ['Sb', 'S', 'Sb2S3', '硫化アンチモン(III)', 'アンチモンと硫黄は硫化アンチモン(III)を作る代表例があります。', '2Sb + 3S -> Sb2S3', 'powder', '#a6422f', 'heat', 'medium'],
        ['Bi', 'S', 'Bi2S3', '硫化ビスマス(III)', 'ビスマスと硫黄は硫化ビスマス(III)を作ります。', '2Bi + 3S -> Bi2S3', 'powder', '#25221d', 'heat', 'high'],

        ['Be', 'N', 'Be3N2', '窒化ベリリウム', 'ベリリウムは窒素と反応して窒化ベリリウムを作ります。毒性があるため安全側に扱います。', '3Be + N2 -> Be3N2', 'powder', '#d8cfb8', 'high_temperature', 'medium'],
        ['Sr', 'N', 'Sr3N2', '窒化ストロンチウム', 'ストロンチウムは窒素と反応して窒化ストロンチウムを作ります。', '3Sr + N2 -> Sr3N2', 'powder', '#d8cfb8', 'heat', 'high'],
        ['Ba', 'N', 'Ba3N2', '窒化バリウム', 'バリウムは窒素と反応して窒化バリウムを作ります。', '3Ba + N2 -> Ba3N2', 'powder', '#d8cfb8', 'heat', 'high'],
        ['Ti', 'N', 'TiN', '窒化チタン', 'チタンと窒素は高温条件で窒化チタンを作ります。', '2Ti + N2 -> 2TiN', 'crystal', '#b99a35', 'high_temperature', 'high'],
        ['Zr', 'N', 'ZrN', '窒化ジルコニウム', 'ジルコニウムと窒素は高温条件で窒化ジルコニウムを作ります。', '2Zr + N2 -> 2ZrN', 'crystal', '#b99a35', 'high_temperature', 'high'],
        ['V', 'N', 'VN', '窒化バナジウム', 'バナジウムと窒素は高温条件で窒化バナジウムを作ります。', '2V + N2 -> 2VN', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Cr', 'N', 'CrN', '窒化クロム', 'クロムと窒素は高温条件で窒化クロムを作る代表例があります。', '2Cr + N2 -> 2CrN', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ga', 'N', 'GaN', '窒化ガリウム', 'ガリウムと窒素は高温条件で窒化ガリウムを作ります。', '2Ga + N2 -> 2GaN', 'crystal', '#d8d8d8', 'high_temperature', 'high'],
        ['In', 'N', 'InN', '窒化インジウム', 'インジウムと窒素は高温条件で窒化インジウムを作ります。', '2In + N2 -> 2InN', 'crystal', '#d8d8d8', 'high_temperature', 'high'],
        ['Nb', 'N', 'NbN', '窒化ニオブ', 'ニオブと窒素は高温条件で窒化ニオブを作ります。', '2Nb + N2 -> 2NbN', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ta', 'N', 'TaN', '窒化タンタル', 'タンタルと窒素は高温条件で窒化タンタルを作ります。', '2Ta + N2 -> 2TaN', 'crystal', '#555555', 'high_temperature', 'medium'],

        ['Zr', 'C', 'ZrC', '炭化ジルコニウム', 'ジルコニウムと炭素は高温条件で炭化ジルコニウムを作ります。', 'Zr + C -> ZrC', 'crystal', '#555555', 'high_temperature', 'high'],
        ['V', 'C', 'VC', '炭化バナジウム', 'バナジウムと炭素は高温条件で炭化バナジウムを作ります。', 'V + C -> VC', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Nb', 'C', 'NbC', '炭化ニオブ', 'ニオブと炭素は高温条件で炭化ニオブを作ります。', 'Nb + C -> NbC', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Ta', 'C', 'TaC', '炭化タンタル', 'タンタルと炭素は高温条件で炭化タンタルを作ります。', 'Ta + C -> TaC', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Hf', 'C', 'HfC', '炭化ハフニウム', 'ハフニウムと炭素は高温条件で炭化ハフニウムを作ります。', 'Hf + C -> HfC', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Mo', 'C', 'Mo2C', '炭化モリブデン', 'モリブデンと炭素は高温条件で炭化モリブデンを作る代表例があります。', '2Mo + C -> Mo2C', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Cr', 'C', 'Cr3C2', '炭化クロム', 'クロムと炭素は高温条件で炭化クロムを作る代表例があります。', '3Cr + 2C -> Cr3C2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Be', 'C', 'Be2C', '炭化ベリリウム', 'ベリリウムと炭素は高温条件で炭化ベリリウムを作ります。毒性があるため安全側に扱います。', '2Be + C -> Be2C', 'crystal', '#6f6a5d', 'high_temperature', 'medium'],

        ['Mg', 'Si', 'Mg2Si', 'ケイ化マグネシウム', 'マグネシウムとケイ素は高温条件でケイ化マグネシウムを作ります。', '2Mg + Si -> Mg2Si', 'crystal', '#6f6a5d', 'high_temperature', 'high'],
        ['Ca', 'Si', 'Ca2Si', 'ケイ化カルシウム', 'カルシウムとケイ素は高温条件でケイ化カルシウムを作ります。', '2Ca + Si -> Ca2Si', 'crystal', '#6f6a5d', 'high_temperature', 'high'],
        ['Ti', 'Si', 'TiSi2', 'ケイ化チタン', 'チタンとケイ素は高温条件でケイ化チタンを作ります。', 'Ti + 2Si -> TiSi2', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Mo', 'Si', 'MoSi2', 'ケイ化モリブデン', 'モリブデンとケイ素は高温条件でケイ化モリブデンを作ります。', 'Mo + 2Si -> MoSi2', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Fe', 'Si', 'FeSi', 'ケイ化鉄', '鉄とケイ素は高温条件でケイ化鉄を作る代表例があります。', 'Fe + Si -> FeSi', 'crystal', '#555555', 'high_temperature_metallurgy', 'medium'],
        ['Mg', 'B', 'MgB2', '二ホウ化マグネシウム', 'マグネシウムとホウ素は高温条件で二ホウ化マグネシウムを作ります。', 'Mg + 2B -> MgB2', 'crystal', '#4f4f4f', 'high_temperature', 'high'],
        ['Ti', 'B', 'TiB2', '二ホウ化チタン', 'チタンとホウ素は高温条件で二ホウ化チタンを作ります。', 'Ti + 2B -> TiB2', 'crystal', '#4f4f4f', 'high_temperature', 'high'],
        ['Zr', 'B', 'ZrB2', '二ホウ化ジルコニウム', 'ジルコニウムとホウ素は高温条件で二ホウ化ジルコニウムを作ります。', 'Zr + 2B -> ZrB2', 'crystal', '#4f4f4f', 'high_temperature', 'high'],
        ['Al', 'B', 'AlB2', '二ホウ化アルミニウム', 'アルミニウムとホウ素は高温条件で二ホウ化アルミニウムを作る代表例があります。', 'Al + 2B -> AlB2', 'crystal', '#4f4f4f', 'high_temperature', 'medium'],
        ['Ca', 'B', 'CaB6', '六ホウ化カルシウム', 'カルシウムとホウ素は高温条件で六ホウ化カルシウムを作ります。', 'Ca + 6B -> CaB6', 'crystal', '#4f4f4f', 'high_temperature', 'high']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, solidForm, color, requiredCondition, confidence] of rows) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState: solidForm === 'flake' ? 'solid' : solidForm,
            solidForm,
            color,
            requiredCondition,
            confidence
        });
    }
}

function registerTransitionMetalHalides() {
    const trivalentMetals = [
        ['Sc', 'スカンジウム', 'high'],
        ['V', 'バナジウム', 'medium'],
        ['Cr', 'クロム', 'medium']
    ];

    for (const [symbol, name, confidence] of trivalentMetals) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB: halogen.symbol,
                formula: `${symbol}${halogen.symbol}3`,
                productName: `${halogen.prefix}${name}(III)`,
                summary: `${name}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${name}(III)を作ります。`,
                equation: `2${symbol} + 3${halogen.molecule} -> 2${symbol}${halogen.symbol}3`,
                productState: 'crystal',
                solidForm: 'crystal',
                color: halogen.symbol === 'I' ? '#7a4f8f' : '#b8c6a5',
                requiredCondition: 'controlled_halogenation',
                safetyNote: '遷移金属ハロゲン化物は酸化数や条件で生成物が変わるため、VCLでは条件付き代表例として表示します。',
                confidence
            });
        }
    }

    const tetravalentMetals = [
        ['Ti', 'チタン', 'high'],
        ['Zr', 'ジルコニウム', 'high'],
        ['Hf', 'ハフニウム', 'high']
    ];

    for (const [symbol, name, confidence] of tetravalentMetals) {
        for (const halogen of HALOGENS) {
            const isLiquid = symbol === 'Ti' && halogen.symbol === 'Cl';
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB: halogen.symbol,
                formula: `${symbol}${halogen.symbol}4`,
                productName: `${halogen.prefix}${name}(IV)`,
                summary: `${name}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${name}(IV)を作ります。`,
                equation: `${symbol} + 2${halogen.molecule} -> ${symbol}${halogen.symbol}4`,
                productState: isLiquid ? 'liquid' : 'crystal',
                solidForm: isLiquid ? 'none' : 'crystal',
                color: isLiquid ? '#dfefff' : '#f4edcf',
                requiredCondition: 'controlled_halogenation',
                safetyNote: '四ハロゲン化物には揮発性や腐食性を持つものがあるため、VCLでは教材用表示だけに限定します。',
                confidence
            });
        }
    }

    const divalentMetals = [
        ['Mn', 'マンガン', '#d8b4a8', 'medium'],
        ['Co', 'コバルト', '#6b76b8', 'medium'],
        ['Ni', 'ニッケル', '#72a66b', 'medium'],
        ['Zn', '亜鉛', '#f4edcf', 'high'],
        ['Cd', 'カドミウム', '#f4edcf', 'medium'],
        ['Hg', '水銀', '#f4edcf', 'medium']
    ];

    for (const [symbol, name, color, confidence] of divalentMetals) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB: halogen.symbol,
                formula: `${symbol}${halogen.symbol}2`,
                productName: `${halogen.prefix}${name}(II)`,
                summary: `${name}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${name}(II)を作ります。`,
                equation: `${symbol} + ${halogen.molecule} -> ${symbol}${halogen.symbol}2`,
                productState: 'crystal',
                solidForm: 'crystal',
                color: halogen.symbol === 'I' ? '#ead78a' : color,
                requiredCondition: 'controlled_halogenation',
                safetyNote: '遷移金属ハロゲン化物は毒性や酸化数の違いがあるため、VCLでは条件付き代表例として表示します。',
                confidence
            });
        }
    }

    for (const halogen of HALOGENS) {
        const isIodide = halogen.symbol === 'I';
        registerExpandedReactionRow({
            symbolA: 'Fe',
            symbolB: halogen.symbol,
            formula: isIodide ? 'FeI2' : `Fe${halogen.symbol}3`,
            productName: isIodide ? 'ヨウ化鉄(II)' : `${halogen.prefix}鉄(III)`,
            summary: isIodide
                ? '鉄とヨウ素は、代表例としてヨウ化鉄(II)を作ります。'
                : `鉄と${halogen.prefix.replace('化', '')}素は、ハロゲン過剰などの条件で${halogen.prefix}鉄(III)を作る代表例があります。`,
            equation: isIodide ? 'Fe + I2 -> FeI2' : `2Fe + 3${halogen.molecule} -> 2Fe${halogen.symbol}3`,
            productState: 'crystal',
            solidForm: 'crystal',
            color: isIodide ? '#6f5f4a' : '#7a4b2d',
            requiredCondition: 'controlled_halogenation',
            safetyNote: '鉄のハロゲン化物は酸化状態が条件で変わるため、VCLでは条件付き代表例として表示します。',
            confidence: 'medium'
        });
    }

    for (const halogen of HALOGENS) {
        const isIodide = halogen.symbol === 'I';
        registerExpandedReactionRow({
            symbolA: 'Cu',
            symbolB: halogen.symbol,
            formula: isIodide ? 'CuI' : `Cu${halogen.symbol}2`,
            productName: isIodide ? 'ヨウ化銅(I)' : `${halogen.prefix}銅(II)`,
            summary: isIodide
                ? '銅とヨウ素は、代表例としてヨウ化銅(I)を作ります。'
                : `銅と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}銅(II)を作ります。`,
            equation: isIodide ? '2Cu + I2 -> 2CuI' : `Cu + ${halogen.molecule} -> Cu${halogen.symbol}2`,
            productState: 'crystal',
            solidForm: 'crystal',
            color: isIodide ? '#f4edcf' : '#4f9cb8',
            requiredCondition: 'controlled_halogenation',
            safetyNote: '銅のハロゲン化物は酸化状態が条件で変わるため、VCLでは条件付き代表例として表示します。',
            confidence: 'medium'
        });
    }

    for (const halogen of HALOGENS) {
        registerExpandedReactionRow({
            symbolA: 'Ag',
            symbolB: halogen.symbol,
            formula: `Ag${halogen.symbol}`,
            productName: `${halogen.prefix}銀`,
            summary: `銀と${halogen.prefix.replace('化', '')}素は、${halogen.prefix}銀を作ります。塩化銀・臭化銀・ヨウ化銀は沈殿や感光性でも知られます。`,
            equation: `2Ag + ${halogen.molecule} -> 2Ag${halogen.symbol}`,
            productState: 'crystal',
            solidForm: 'crystal',
            color: halogen.symbol === 'Cl' ? '#f4f2ea' : halogen.symbol === 'Br' ? '#ead78a' : halogen.symbol === 'I' ? '#d6a842' : '#f4f2ea',
            requiredCondition: 'controlled_halogenation',
            safetyNote: '銀ハロゲン化物は感光性など性質があるため、VCLでは教材用の代表例として表示します。',
            confidence: 'high'
        });
    }
}

function registerSemiconductorAndMaterialRows() {
    const rows = [
        ['B', 'P', 'BP', 'リン化ホウ素', 'ホウ素とリンは高温条件でリン化ホウ素を作ります。', '4B + P4 -> 4BP', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['B', 'As', 'BAs', 'ヒ化ホウ素', 'ホウ素とヒ素は高温条件でヒ化ホウ素を作ります。', 'B + As -> BAs', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Al', 'As', 'AlAs', 'ヒ化アルミニウム', 'アルミニウムとヒ素は高温条件でヒ化アルミニウムを作ります。', 'Al + As -> AlAs', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Al', 'Sb', 'AlSb', 'アンチモン化アルミニウム', 'アルミニウムとアンチモンは高温条件でアンチモン化アルミニウムを作ります。', 'Al + Sb -> AlSb', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ga', 'P', 'GaP', 'リン化ガリウム', 'ガリウムとリンは高温条件でリン化ガリウムを作ります。', '4Ga + P4 -> 4GaP', 'crystal', '#d98b3a', 'high_temperature', 'high'],
        ['Ga', 'As', 'GaAs', 'ヒ化ガリウム', 'ガリウムとヒ素は高温条件でヒ化ガリウムを作ります。', 'Ga + As -> GaAs', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Ga', 'Sb', 'GaSb', 'アンチモン化ガリウム', 'ガリウムとアンチモンは高温条件でアンチモン化ガリウムを作ります。', 'Ga + Sb -> GaSb', 'crystal', '#555555', 'high_temperature', 'high'],
        ['In', 'P', 'InP', 'リン化インジウム', 'インジウムとリンは高温条件でリン化インジウムを作ります。', '4In + P4 -> 4InP', 'crystal', '#555555', 'high_temperature', 'high'],
        ['In', 'As', 'InAs', 'ヒ化インジウム', 'インジウムとヒ素は高温条件でヒ化インジウムを作ります。', 'In + As -> InAs', 'crystal', '#555555', 'high_temperature', 'high'],
        ['In', 'Sb', 'InSb', 'アンチモン化インジウム', 'インジウムとアンチモンは高温条件でアンチモン化インジウムを作ります。', 'In + Sb -> InSb', 'crystal', '#555555', 'high_temperature', 'high'],

        ['Zn', 'Se', 'ZnSe', 'セレン化亜鉛', '亜鉛とセレンは高温条件でセレン化亜鉛を作ります。', 'Zn + Se -> ZnSe', 'crystal', '#ead78a', 'high_temperature', 'high'],
        ['Zn', 'Te', 'ZnTe', 'テルル化亜鉛', '亜鉛とテルルは高温条件でテルル化亜鉛を作ります。', 'Zn + Te -> ZnTe', 'crystal', '#8a3f2b', 'high_temperature', 'high'],
        ['Cd', 'Se', 'CdSe', 'セレン化カドミウム', 'カドミウムとセレンは高温条件でセレン化カドミウムを作ります。', 'Cd + Se -> CdSe', 'crystal', '#c6422f', 'high_temperature', 'medium'],
        ['Cd', 'Te', 'CdTe', 'テルル化カドミウム', 'カドミウムとテルルは高温条件でテルル化カドミウムを作ります。', 'Cd + Te -> CdTe', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Hg', 'Se', 'HgSe', 'セレン化水銀(II)', '水銀とセレンは高温条件でセレン化水銀を作る代表例があります。', 'Hg + Se -> HgSe', 'crystal', '#555555', 'unsafe', 'medium'],
        ['Hg', 'Te', 'HgTe', 'テルル化水銀(II)', '水銀とテルルは高温条件でテルル化水銀を作る代表例があります。', 'Hg + Te -> HgTe', 'crystal', '#555555', 'unsafe', 'medium'],
        ['Pb', 'Se', 'PbSe', 'セレン化鉛(II)', '鉛とセレンは高温条件でセレン化鉛を作ります。', 'Pb + Se -> PbSe', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Pb', 'Te', 'PbTe', 'テルル化鉛(II)', '鉛とテルルは高温条件でテルル化鉛を作ります。', 'Pb + Te -> PbTe', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Sn', 'Se', 'SnSe', 'セレン化スズ(II)', 'スズとセレンは高温条件でセレン化スズ(II)を作る代表例があります。', 'Sn + Se -> SnSe', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Sn', 'Te', 'SnTe', 'テルル化スズ(II)', 'スズとテルルは高温条件でテルル化スズ(II)を作る代表例があります。', 'Sn + Te -> SnTe', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Bi', 'Se', 'Bi2Se3', 'セレン化ビスマス(III)', 'ビスマスとセレンは高温条件でセレン化ビスマス(III)を作ります。', '2Bi + 3Se -> Bi2Se3', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Bi', 'Te', 'Bi2Te3', 'テルル化ビスマス(III)', 'ビスマスとテルルは高温条件でテルル化ビスマス(III)を作ります。', '2Bi + 3Te -> Bi2Te3', 'crystal', '#555555', 'high_temperature', 'medium'],

        ['Mo', 'S', 'MoS2', '二硫化モリブデン', 'モリブデンと硫黄は高温条件で二硫化モリブデンを作る代表例があります。', 'Mo + 2S -> MoS2', 'flake', '#333333', 'high_temperature', 'high'],
        ['W', 'S', 'WS2', '二硫化タングステン', 'タングステンと硫黄は高温条件で二硫化タングステンを作ります。', 'W + 2S -> WS2', 'flake', '#333333', 'high_temperature', 'high'],
        ['Mo', 'Se', 'MoSe2', '二セレン化モリブデン', 'モリブデンとセレンは高温条件で二セレン化モリブデンを作ります。', 'Mo + 2Se -> MoSe2', 'flake', '#333333', 'high_temperature', 'high'],
        ['W', 'Se', 'WSe2', '二セレン化タングステン', 'タングステンとセレンは高温条件で二セレン化タングステンを作ります。', 'W + 2Se -> WSe2', 'flake', '#333333', 'high_temperature', 'high'],

        ['Ta', 'B', 'TaB2', '二ホウ化タンタル', 'タンタルとホウ素は高温条件で二ホウ化タンタルを作ります。', 'Ta + 2B -> TaB2', 'crystal', '#4f4f4f', 'high_temperature', 'high'],
        ['Hf', 'B', 'HfB2', '二ホウ化ハフニウム', 'ハフニウムとホウ素は高温条件で二ホウ化ハフニウムを作ります。', 'Hf + 2B -> HfB2', 'crystal', '#4f4f4f', 'high_temperature', 'high'],
        ['V', 'B', 'VB2', '二ホウ化バナジウム', 'バナジウムとホウ素は高温条件で二ホウ化バナジウムを作ります。', 'V + 2B -> VB2', 'crystal', '#4f4f4f', 'high_temperature', 'medium'],
        ['Nb', 'B', 'NbB2', '二ホウ化ニオブ', 'ニオブとホウ素は高温条件で二ホウ化ニオブを作ります。', 'Nb + 2B -> NbB2', 'crystal', '#4f4f4f', 'high_temperature', 'high'],
        ['Mo', 'B', 'MoB2', '二ホウ化モリブデン', 'モリブデンとホウ素は高温条件で二ホウ化モリブデンを作る代表例があります。', 'Mo + 2B -> MoB2', 'crystal', '#4f4f4f', 'high_temperature', 'medium'],
        ['W', 'B', 'WB2', '二ホウ化タングステン', 'タングステンとホウ素は高温条件で二ホウ化タングステンを作る代表例があります。', 'W + 2B -> WB2', 'crystal', '#4f4f4f', 'high_temperature', 'medium'],
        ['Zr', 'Si', 'ZrSi2', 'ケイ化ジルコニウム', 'ジルコニウムとケイ素は高温条件でケイ化ジルコニウムを作ります。', 'Zr + 2Si -> ZrSi2', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Hf', 'Si', 'HfSi2', 'ケイ化ハフニウム', 'ハフニウムとケイ素は高温条件でケイ化ハフニウムを作ります。', 'Hf + 2Si -> HfSi2', 'crystal', '#555555', 'high_temperature', 'high'],
        ['W', 'Si', 'WSi2', 'ケイ化タングステン', 'タングステンとケイ素は高温条件でケイ化タングステンを作ります。', 'W + 2Si -> WSi2', 'crystal', '#555555', 'high_temperature', 'high'],
        ['V', 'Si', 'VSi2', 'ケイ化バナジウム', 'バナジウムとケイ素は高温条件でケイ化バナジウムを作る代表例があります。', 'V + 2Si -> VSi2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Nb', 'Si', 'NbSi2', 'ケイ化ニオブ', 'ニオブとケイ素は高温条件でケイ化ニオブを作ります。', 'Nb + 2Si -> NbSi2', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Ta', 'Si', 'TaSi2', 'ケイ化タンタル', 'タンタルとケイ素は高温条件でケイ化タンタルを作ります。', 'Ta + 2Si -> TaSi2', 'crystal', '#555555', 'high_temperature', 'high']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, solidForm, color, requiredCondition, confidence] of rows) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState: solidForm === 'flake' ? 'solid' : solidForm,
            solidForm,
            color,
            requiredCondition,
            confidence
        });
    }
}

function registerAdditionalOxideRows() {
    const rows = [
        ['Hf', 'O', 'HfO2', '二酸化ハフニウム', 'ハフニウムは酸素と反応して二酸化ハフニウムを作ります。', 'Hf + O2 -> HfO2', '#f4f2ea', 'high'],
        ['Ta', 'O', 'Ta2O5', '酸化タンタル(V)', 'タンタルは酸素と反応して酸化タンタル(V)を作る代表例があります。', '4Ta + 5O2 -> 2Ta2O5', '#f4f2ea', 'high'],
        ['W', 'O', 'WO3', '酸化タングステン(VI)', 'タングステンは酸素と反応して酸化タングステン(VI)を作る代表例があります。', '2W + 3O2 -> 2WO3', '#efe4a8', 'medium'],
        ['Ru', 'O', 'RuO2', '二酸化ルテニウム', 'ルテニウムは酸素と反応して二酸化ルテニウムを作る代表例があります。', 'Ru + O2 -> RuO2', '#333333', 'medium'],
        ['Rh', 'O', 'Rh2O3', '酸化ロジウム(III)', 'ロジウムは酸素と反応して酸化ロジウム(III)を作る代表例があります。', '4Rh + 3O2 -> 2Rh2O3', '#333333', 'medium'],
        ['Pd', 'O', 'PdO', '酸化パラジウム(II)', 'パラジウムは酸素と反応して酸化パラジウム(II)を作る代表例があります。', '2Pd + O2 -> 2PdO', '#333333', 'medium'],
        ['Ag', 'O', 'Ag2O', '酸化銀(I)', '銀は条件を制御すると酸化銀(I)を作ります。', '4Ag + O2 -> 2Ag2O', '#3d3b34', 'medium'],
        ['Hg', 'O', 'HgO', '酸化水銀(II)', '水銀は酸素と反応して酸化水銀(II)を作る代表例があります。水銀化合物は危険なため安全側に扱います。', '2Hg + O2 -> 2HgO', '#d8492f', 'medium'],
        ['Re', 'O', 'Re2O7', '酸化レニウム(VII)', 'レニウムは酸素と反応して酸化レニウム(VII)を作る代表例があります。', '4Re + 7O2 -> 2Re2O7', '#f4f2ea', 'medium'],
        ['La', 'O', 'La2O3', '酸化ランタン', 'ランタンは酸素と反応して酸化ランタンを作ります。', '4La + 3O2 -> 2La2O3', '#f4f2ea', 'high'],
        ['Ce', 'O', 'CeO2', '二酸化セリウム', 'セリウムは酸素と反応して二酸化セリウムを作る代表例があります。', 'Ce + O2 -> CeO2', '#efe4a8', 'medium'],
        ['Nd', 'O', 'Nd2O3', '酸化ネオジム', 'ネオジムは酸素と反応して酸化ネオジムを作ります。', '4Nd + 3O2 -> 2Nd2O3', '#bba8d8', 'high'],
        ['Sm', 'O', 'Sm2O3', '酸化サマリウム', 'サマリウムは酸素と反応して酸化サマリウムを作ります。', '4Sm + 3O2 -> 2Sm2O3', '#f4f2ea', 'high'],
        ['Eu', 'O', 'Eu2O3', '酸化ユウロピウム', 'ユウロピウムは酸素と反応して酸化ユウロピウムを作る代表例があります。', '4Eu + 3O2 -> 2Eu2O3', '#f4f2ea', 'medium'],
        ['Gd', 'O', 'Gd2O3', '酸化ガドリニウム', 'ガドリニウムは酸素と反応して酸化ガドリニウムを作ります。', '4Gd + 3O2 -> 2Gd2O3', '#f4f2ea', 'high'],
        ['Dy', 'O', 'Dy2O3', '酸化ジスプロシウム', 'ジスプロシウムは酸素と反応して酸化ジスプロシウムを作ります。', '4Dy + 3O2 -> 2Dy2O3', '#f4f2ea', 'high'],
        ['Er', 'O', 'Er2O3', '酸化エルビウム', 'エルビウムは酸素と反応して酸化エルビウムを作ります。', '4Er + 3O2 -> 2Er2O3', '#e0a6c8', 'high'],
        ['Yb', 'O', 'Yb2O3', '酸化イッテルビウム', 'イッテルビウムは酸素と反応して酸化イッテルビウムを作ります。', '4Yb + 3O2 -> 2Yb2O3', '#f4f2ea', 'high'],
        ['Lu', 'O', 'Lu2O3', '酸化ルテチウム', 'ルテチウムは酸素と反応して酸化ルテチウムを作ります。', '4Lu + 3O2 -> 2Lu2O3', '#f4f2ea', 'high']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, color, confidence] of rows) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState: 'powder',
            solidForm: 'powder',
            color,
            requiredCondition: 'heat_or_combustion',
            confidence
        });
    }
}

function registerRareEarthHalides() {
    const rareEarths = [
        ['Y', 'イットリウム', 'high'],
        ['La', 'ランタン', 'high'],
        ['Ce', 'セリウム', 'medium'],
        ['Pr', 'プラセオジム', 'medium'],
        ['Nd', 'ネオジム', 'high'],
        ['Sm', 'サマリウム', 'high'],
        ['Eu', 'ユウロピウム', 'medium'],
        ['Gd', 'ガドリニウム', 'high'],
        ['Tb', 'テルビウム', 'medium'],
        ['Dy', 'ジスプロシウム', 'high'],
        ['Ho', 'ホルミウム', 'high'],
        ['Er', 'エルビウム', 'high'],
        ['Tm', 'ツリウム', 'high'],
        ['Yb', 'イッテルビウム', 'medium'],
        ['Lu', 'ルテチウム', 'high']
    ];

    for (const [symbol, name, confidence] of rareEarths) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB: halogen.symbol,
                formula: `${symbol}${halogen.symbol}3`,
                productName: `${halogen.prefix}${name}(III)`,
                summary: `${name}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${name}(III)を作ります。希土類ハロゲン化物は水分や酸化状態の管理が必要です。`,
                equation: `2${symbol} + 3${halogen.molecule} -> 2${symbol}${halogen.symbol}3`,
                productState: 'crystal',
                solidForm: 'crystal',
                color: halogen.symbol === 'I' ? '#ead78a' : '#f4edcf',
                requiredCondition: 'controlled_halogenation',
                safetyNote: '希土類ハロゲン化物は実際には乾燥条件や高温条件が必要な場合があるため、VCLでは教材用の代表例として表示します。',
                confidence
            });
        }
    }
}

function registerRareEarthChalcogenidesAndNitrides() {
    const rareEarths = [
        ['Y', 'イットリウム', 'high'],
        ['La', 'ランタン', 'high'],
        ['Ce', 'セリウム', 'medium'],
        ['Pr', 'プラセオジム', 'medium'],
        ['Nd', 'ネオジム', 'high'],
        ['Sm', 'サマリウム', 'high'],
        ['Gd', 'ガドリニウム', 'high'],
        ['Dy', 'ジスプロシウム', 'high'],
        ['Er', 'エルビウム', 'high'],
        ['Yb', 'イッテルビウム', 'medium'],
        ['Lu', 'ルテチウム', 'high']
    ];

    for (const [symbol, name, confidence] of rareEarths) {
        registerExpandedReactionRow({
            symbolA: symbol,
            symbolB: 'N',
            formula: `${symbol}N`,
            productName: `窒化${name}`,
            summary: `${name}と窒素は高温条件で窒化${name}を作る代表例があります。`,
            equation: `2${symbol} + N2 -> 2${symbol}N`,
            productState: 'crystal',
            solidForm: 'crystal',
            color: '#555555',
            requiredCondition: 'high_temperature',
            confidence
        });

        registerExpandedReactionRow({
            symbolA: symbol,
            symbolB: 'S',
            formula: `${symbol}2S3`,
            productName: `硫化${name}(III)`,
            summary: `${name}と硫黄は高温条件で硫化${name}(III)を作る代表例があります。`,
            equation: `2${symbol} + 3S -> ${symbol}2S3`,
            productState: 'powder',
            solidForm: 'powder',
            color: '#d8b25a',
            requiredCondition: 'high_temperature',
            confidence
        });

        for (const [symbolB, elementName, suffix, color] of [
            ['Se', 'セレン', 'セレン化', '#8a3f2b'],
            ['Te', 'テルル', 'テルル化', '#555555']
        ]) {
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB,
                formula: `${symbol}2${symbolB}3`,
                productName: `${suffix}${name}(III)`,
                summary: `${name}と${elementName}は高温条件で${suffix}${name}(III)を作る代表例があります。`,
                equation: `2${symbol} + 3${symbolB} -> ${symbol}2${symbolB}3`,
                productState: 'crystal',
                solidForm: 'crystal',
                color,
                requiredCondition: 'high_temperature',
                confidence: confidence === 'high' ? 'medium' : confidence
            });
        }
    }
}

function registerAlkaliAndAlkalineChalcogenides() {
    const alkaliMetals = [
        ['Li', 'リチウム'],
        ['Na', 'ナトリウム'],
        ['K', 'カリウム'],
        ['Rb', 'ルビジウム'],
        ['Cs', 'セシウム']
    ];
    const alkalineMetals = [
        ['Be', 'ベリリウム', 'medium'],
        ['Mg', 'マグネシウム', 'high'],
        ['Ca', 'カルシウム', 'high'],
        ['Sr', 'ストロンチウム', 'high'],
        ['Ba', 'バリウム', 'high']
    ];
    const chalcogens = [
        ['Se', 'セレン', 'セレン化', '#c98a3a'],
        ['Te', 'テルル', 'テルル化', '#555555']
    ];

    for (const [metalSymbol, metalName] of alkaliMetals) {
        for (const [chalcogenSymbol, chalcogenName, prefix, color] of chalcogens) {
            registerExpandedReactionRow({
                symbolA: metalSymbol,
                symbolB: chalcogenSymbol,
                formula: `${metalSymbol}2${chalcogenSymbol}`,
                productName: `${prefix}${metalName}`,
                summary: `${metalName}と${chalcogenName}は条件を制御すると${prefix}${metalName}を作ります。`,
                equation: `2${metalSymbol} + ${chalcogenSymbol} -> ${metalSymbol}2${chalcogenSymbol}`,
                productState: 'crystal',
                solidForm: 'crystal',
                color,
                requiredCondition: 'controlled_reaction',
                safetyNote: 'アルカリ金属とカルコゲンの反応は激しい場合があるため、VCLでは教材用表示だけに限定します。',
                confidence: 'medium'
            });
        }
    }

    for (const [metalSymbol, metalName, confidence] of alkalineMetals) {
        for (const [chalcogenSymbol, chalcogenName, prefix, color] of chalcogens) {
            registerExpandedReactionRow({
                symbolA: metalSymbol,
                symbolB: chalcogenSymbol,
                formula: `${metalSymbol}${chalcogenSymbol}`,
                productName: `${prefix}${metalName}`,
                summary: `${metalName}と${chalcogenName}は条件を制御すると${prefix}${metalName}を作ります。`,
                equation: `${metalSymbol} + ${chalcogenSymbol} -> ${metalSymbol}${chalcogenSymbol}`,
                productState: 'crystal',
                solidForm: 'crystal',
                color,
                requiredCondition: 'controlled_reaction',
                safetyNote: '実際の反応は高温や乾燥条件が必要な場合があるため、VCLでは教材用の代表例として表示します。',
                confidence
            });
        }
    }
}

function registerAdditionalPnictides() {
    const rows = [
        ['Li', 'P', 'Li3P', 'リン化リチウム', 'リチウムとリンは条件を制御するとリン化リチウムを作ります。', '12Li + P4 -> 4Li3P', 'crystal', '#7c6f5a', 'controlled_reaction', 'medium'],
        ['Na', 'P', 'Na3P', 'リン化ナトリウム', 'ナトリウムとリンは条件を制御するとリン化ナトリウムを作ります。', '12Na + P4 -> 4Na3P', 'crystal', '#7c6f5a', 'controlled_reaction', 'medium'],
        ['K', 'P', 'K3P', 'リン化カリウム', 'カリウムとリンは条件を制御するとリン化カリウムを作ります。', '12K + P4 -> 4K3P', 'crystal', '#7c6f5a', 'controlled_reaction', 'medium'],
        ['Sr', 'P', 'Sr3P2', 'リン化ストロンチウム', 'ストロンチウムとリンは条件を制御するとリン化ストロンチウムを作ります。', '6Sr + P4 -> 2Sr3P2', 'powder', '#7c6f5a', 'controlled_reaction', 'high'],
        ['Ba', 'P', 'Ba3P2', 'リン化バリウム', 'バリウムとリンは条件を制御するとリン化バリウムを作ります。', '6Ba + P4 -> 2Ba3P2', 'powder', '#7c6f5a', 'controlled_reaction', 'high'],
        ['Sc', 'P', 'ScP', 'リン化スカンジウム', 'スカンジウムとリンは高温条件でリン化スカンジウムを作る代表例があります。', '4Sc + P4 -> 4ScP', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Y', 'P', 'YP', 'リン化イットリウム', 'イットリウムとリンは高温条件でリン化イットリウムを作ります。', '4Y + P4 -> 4YP', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ti', 'P', 'TiP', 'リン化チタン', 'チタンとリンは高温条件でリン化チタンを作る代表例があります。', '4Ti + P4 -> 4TiP', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Zr', 'P', 'ZrP', 'リン化ジルコニウム', 'ジルコニウムとリンは高温条件でリン化ジルコニウムを作る代表例があります。', '4Zr + P4 -> 4ZrP', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['La', 'P', 'LaP', 'リン化ランタン', 'ランタンとリンは高温条件でリン化ランタンを作ります。', '4La + P4 -> 4LaP', 'crystal', '#555555', 'high_temperature', 'medium'],

        ['Mg', 'As', 'Mg3As2', 'ヒ化マグネシウム', 'マグネシウムとヒ素は条件を制御するとヒ化マグネシウムを作る代表例があります。', '3Mg + 2As -> Mg3As2', 'crystal', '#555555', 'controlled_reaction', 'medium'],
        ['Ca', 'As', 'Ca3As2', 'ヒ化カルシウム', 'カルシウムとヒ素は条件を制御するとヒ化カルシウムを作る代表例があります。', '3Ca + 2As -> Ca3As2', 'crystal', '#555555', 'controlled_reaction', 'medium'],
        ['Sr', 'As', 'Sr3As2', 'ヒ化ストロンチウム', 'ストロンチウムとヒ素は条件を制御するとヒ化ストロンチウムを作る代表例があります。', '3Sr + 2As -> Sr3As2', 'crystal', '#555555', 'controlled_reaction', 'medium'],
        ['Ba', 'As', 'Ba3As2', 'ヒ化バリウム', 'バリウムとヒ素は条件を制御するとヒ化バリウムを作る代表例があります。', '3Ba + 2As -> Ba3As2', 'crystal', '#555555', 'controlled_reaction', 'medium'],
        ['Zn', 'As', 'Zn3As2', 'ヒ化亜鉛', '亜鉛とヒ素は高温条件でヒ化亜鉛を作る代表例があります。', '3Zn + 2As -> Zn3As2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Cd', 'As', 'Cd3As2', 'ヒ化カドミウム', 'カドミウムとヒ素は高温条件でヒ化カドミウムを作る代表例があります。', '3Cd + 2As -> Cd3As2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['La', 'As', 'LaAs', 'ヒ化ランタン', 'ランタンとヒ素は高温条件でヒ化ランタンを作る代表例があります。', 'La + As -> LaAs', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Y', 'As', 'YAs', 'ヒ化イットリウム', 'イットリウムとヒ素は高温条件でヒ化イットリウムを作る代表例があります。', 'Y + As -> YAs', 'crystal', '#555555', 'high_temperature', 'medium'],

        ['Mg', 'Sb', 'Mg3Sb2', 'アンチモン化マグネシウム', 'マグネシウムとアンチモンは高温条件でアンチモン化マグネシウムを作ります。', '3Mg + 2Sb -> Mg3Sb2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ca', 'Sb', 'Ca3Sb2', 'アンチモン化カルシウム', 'カルシウムとアンチモンは高温条件でアンチモン化カルシウムを作る代表例があります。', '3Ca + 2Sb -> Ca3Sb2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Sr', 'Sb', 'Sr3Sb2', 'アンチモン化ストロンチウム', 'ストロンチウムとアンチモンは高温条件でアンチモン化ストロンチウムを作る代表例があります。', '3Sr + 2Sb -> Sr3Sb2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ba', 'Sb', 'Ba3Sb2', 'アンチモン化バリウム', 'バリウムとアンチモンは高温条件でアンチモン化バリウムを作る代表例があります。', '3Ba + 2Sb -> Ba3Sb2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Zn', 'Sb', 'Zn3Sb2', 'アンチモン化亜鉛', '亜鉛とアンチモンは高温条件でアンチモン化亜鉛を作る代表例があります。', '3Zn + 2Sb -> Zn3Sb2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Cd', 'Sb', 'CdSb', 'アンチモン化カドミウム', 'カドミウムとアンチモンは高温条件でアンチモン化カドミウムを作る代表例があります。', 'Cd + Sb -> CdSb', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['La', 'Sb', 'LaSb', 'アンチモン化ランタン', 'ランタンとアンチモンは高温条件でアンチモン化ランタンを作る代表例があります。', 'La + Sb -> LaSb', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Y', 'Sb', 'YSb', 'アンチモン化イットリウム', 'イットリウムとアンチモンは高温条件でアンチモン化イットリウムを作る代表例があります。', 'Y + Sb -> YSb', 'crystal', '#555555', 'high_temperature', 'medium']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, solidForm, color, requiredCondition, confidence] of rows) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState: solidForm,
            solidForm,
            color,
            requiredCondition,
            safetyNote: 'ヒ素・アンチモン・リン化物などは有害性や発火性を持つ場合があるため、VCLでは教材用の代表例として表示します。',
            confidence
        });
    }
}

function registerMainGroupHydridesAndHalides() {
    const hydrides = [
        ['B', 'H', 'B2H6', 'ジボラン', 'ホウ素と水素からジボランを扱う場合は、通常の混合ではなく制御された合成条件が必要です。', '2B + 3H2 -> B2H6', 'gas', '#dff6ff', 'controlled_synthesis', 'medium'],
        ['C', 'H', 'CH4', 'メタン', '炭素と水素からメタンを得るには高温・触媒などの条件が必要です。VCLでは代表的な炭化水素として表示します。', 'C + 2H2 -> CH4', 'gas', '#dff6ff', 'high_temperature_catalyst', 'medium'],
        ['Si', 'H', 'SiH4', 'シラン', 'ケイ素と水素からシランを扱う場合は、通常の混合ではなく制御された合成条件が必要です。', 'Si + 2H2 -> SiH4', 'gas', '#dff6ff', 'controlled_synthesis', 'medium'],
        ['Ge', 'H', 'GeH4', 'ゲルマン', 'ゲルマニウムと水素からゲルマンを扱う場合は、制御された合成条件が必要です。', 'Ge + 2H2 -> GeH4', 'gas', '#dff6ff', 'controlled_synthesis', 'medium'],
        ['Sn', 'H', 'SnH4', 'スタンナン', 'スズと水素からスタンナンを扱う場合は、制御された合成条件が必要です。', 'Sn + 2H2 -> SnH4', 'gas', '#dff6ff', 'controlled_synthesis', 'medium'],
        ['P', 'H', 'PH3', 'ホスフィン', 'リンと水素からホスフィンを扱う場合は、制御された合成条件が必要です。', 'P4 + 6H2 -> 4PH3', 'gas', '#dff6ff', 'controlled_synthesis', 'medium'],
        ['As', 'H', 'AsH3', 'アルシン', 'ヒ素と水素からアルシンを扱う場合は、制御された合成条件が必要です。非常に有毒な気体です。', '2As + 3H2 -> 2AsH3', 'gas', '#dff6ff', 'unsafe', 'medium'],
        ['Sb', 'H', 'SbH3', 'スチビン', 'アンチモンと水素からスチビンを扱う場合は、制御された合成条件が必要です。非常に有毒な気体です。', '2Sb + 3H2 -> 2SbH3', 'gas', '#dff6ff', 'unsafe', 'medium'],
        ['S', 'H', 'H2S', '硫化水素', '硫黄と水素から硫化水素を扱う場合は、制御された条件が必要です。硫化水素は有毒です。', 'H2 + S -> H2S', 'gas', '#dff6ff', 'unsafe', 'medium'],
        ['Se', 'H', 'H2Se', 'セレン化水素', 'セレンと水素からセレン化水素を扱う場合は、制御された条件が必要です。非常に有毒な気体です。', 'H2 + Se -> H2Se', 'gas', '#dff6ff', 'unsafe', 'medium'],
        ['Te', 'H', 'H2Te', 'テルル化水素', 'テルルと水素からテルル化水素を扱う場合は、制御された条件が必要です。非常に有毒な気体です。', 'H2 + Te -> H2Te', 'gas', '#dff6ff', 'unsafe', 'medium']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, productState, color, requiredCondition, confidence] of hydrides) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState,
            solidForm: 'none',
            color,
            requiredCondition,
            safetyNote: '有毒性・発火性を持つ水素化物が多いため、VCLでは教材用の代表例として表示します。',
            confidence
        });
    }

    function carbonTetrahalideState(symbol) {
        if (symbol === 'F') return { productState: 'gas', solidForm: 'none', color: '#dff6ff' };
        if (symbol === 'Cl') return { productState: 'liquid', solidForm: 'none', color: '#dfefff' };
        return { productState: 'crystal', solidForm: 'crystal', color: symbol === 'Br' ? '#f4edcf' : '#7a4f8f' };
    }

    const carbonTetrahalideNames = {
        F: '四フッ化炭素',
        Cl: '四塩化炭素',
        Br: '四臭化炭素',
        I: '四ヨウ化炭素'
    };

    function pnictogenTrihalideState(symbol) {
        if (symbol === 'F') return { productState: 'gas', solidForm: 'none', color: '#dff6ff' };
        if (symbol === 'Cl' || symbol === 'Br') return { productState: 'liquid', solidForm: 'none', color: symbol === 'Br' ? '#c58b4c' : '#dfefff' };
        return { productState: 'crystal', solidForm: 'crystal', color: '#7a4f8f' };
    }

    for (const halogen of HALOGENS) {
        const state = carbonTetrahalideState(halogen.symbol);
        registerExpandedReactionRow({
            symbolA: 'C',
            symbolB: halogen.symbol,
            formula: `C${halogen.symbol}4`,
            productName: carbonTetrahalideNames[halogen.symbol],
            summary: `炭素と${halogen.prefix.replace('化', '')}素は、条件を制御すると${carbonTetrahalideNames[halogen.symbol]}を作る代表例があります。`,
            equation: `C + 2${halogen.molecule} -> C${halogen.symbol}4`,
            productState: state.productState,
            solidForm: state.solidForm,
            color: state.color,
            requiredCondition: 'controlled_halogenation',
            safetyNote: '炭素ハロゲン化物には毒性や環境影響を持つものがあるため、VCLでは教材用表示だけに限定します。',
            confidence: 'medium'
        });
    }

    const pnictogenTrihalides = [
        ['P', 'リン'],
        ['As', 'ヒ素']
    ];

    for (const [symbol, name] of pnictogenTrihalides) {
        for (const halogen of HALOGENS) {
            const state = pnictogenTrihalideState(halogen.symbol);
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB: halogen.symbol,
                formula: `${symbol}${halogen.symbol}3`,
                productName: `${halogen.prefix}${name}(III)`,
                summary: `${name}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${name}(III)を作ります。`,
                equation: `2${symbol} + 3${halogen.molecule} -> 2${symbol}${halogen.symbol}3`,
                productState: state.productState,
                solidForm: state.solidForm,
                color: state.color,
                requiredCondition: 'controlled_halogenation',
                safetyNote: '主族ハロゲン化物は加水分解性や毒性を持つものがあるため、VCLでは教材用表示だけに限定します。',
                confidence: 'medium'
            });
        }
    }

    const chalcogenHalides = [
        ['S', 'F', 'SF6', '六フッ化硫黄', '硫黄とフッ素は、条件を制御すると六フッ化硫黄を作る代表例があります。', 'S + 3F2 -> SF6', 'gas', '#dff6ff', 'controlled_fluorination'],
        ['Se', 'F', 'SeF6', '六フッ化セレン', 'セレンとフッ素は、条件を制御すると六フッ化セレンを作る代表例があります。', 'Se + 3F2 -> SeF6', 'gas', '#dff6ff', 'controlled_fluorination'],
        ['Te', 'F', 'TeF6', '六フッ化テルル', 'テルルとフッ素は、条件を制御すると六フッ化テルルを作る代表例があります。', 'Te + 3F2 -> TeF6', 'gas', '#dff6ff', 'controlled_fluorination'],
        ['S', 'Cl', 'SCl2', '二塩化硫黄', '硫黄と塩素は、条件を制御すると二塩化硫黄を作る代表例があります。', 'S + Cl2 -> SCl2', 'liquid', '#c9a227', 'controlled_chlorination'],
        ['Se', 'Cl', 'SeCl4', '四塩化セレン', 'セレンと塩素は、条件を制御すると四塩化セレンを作る代表例があります。', 'Se + 2Cl2 -> SeCl4', 'crystal', '#f4edcf', 'controlled_chlorination'],
        ['Te', 'Cl', 'TeCl4', '四塩化テルル', 'テルルと塩素は、条件を制御すると四塩化テルルを作る代表例があります。', 'Te + 2Cl2 -> TeCl4', 'crystal', '#f4edcf', 'controlled_chlorination']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, productState, color, requiredCondition] of chalcogenHalides) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState,
            solidForm: productState === 'crystal' ? 'crystal' : 'none',
            color,
            requiredCondition,
            safetyNote: 'カルコゲンのハロゲン化物は反応性や毒性が高いため、VCLでは教材用表示だけに限定します。',
            confidence: 'medium'
        });
    }
}

function registerMoreTransitionChalcogenides() {
    const metals = [
        ['Ti', 'チタン', 'high'],
        ['Zr', 'ジルコニウム', 'high'],
        ['Hf', 'ハフニウム', 'high'],
        ['V', 'バナジウム', 'medium'],
        ['Nb', 'ニオブ', 'high'],
        ['Ta', 'タンタル', 'high'],
        ['Re', 'レニウム', 'medium']
    ];
    const chalcogens = [
        ['S', '硫黄', '二硫化', '#333333'],
        ['Se', 'セレン', '二セレン化', '#333333'],
        ['Te', 'テルル', '二テルル化', '#333333']
    ];

    for (const [metalSymbol, metalName, confidence] of metals) {
        for (const [chalcogenSymbol, chalcogenName, prefix, color] of chalcogens) {
            registerExpandedReactionRow({
                symbolA: metalSymbol,
                symbolB: chalcogenSymbol,
                formula: `${metalSymbol}${chalcogenSymbol}2`,
                productName: `${prefix}${metalName}`,
                summary: `${metalName}と${chalcogenName}は高温条件で${prefix}${metalName}を作る代表例があります。`,
                equation: `${metalSymbol} + 2${chalcogenSymbol} -> ${metalSymbol}${chalcogenSymbol}2`,
                productState: 'solid',
                solidForm: 'flake',
                color,
                requiredCondition: 'high_temperature',
                safetyNote: '遷移金属カルコゲナイドは高温合成や粉じん管理が必要なため、VCLでは教材用の代表例として表示します。',
                confidence
            });
        }
    }
}

function registerAdvancedMetalHalidesAndOxides() {
    for (const metal of [
        ['Nb', 'ニオブ'],
        ['Ta', 'タンタル']
    ]) {
        for (const halogen of HALOGENS) {
            registerExpandedReactionRow({
                symbolA: metal[0],
                symbolB: halogen.symbol,
                formula: `${metal[0]}${halogen.symbol}5`,
                productName: `${halogen.prefix}${metal[1]}(V)`,
                summary: `${metal[1]}と${halogen.prefix.replace('化', '')}素は、代表例として${halogen.prefix}${metal[1]}(V)を作ります。`,
                equation: `2${metal[0]} + 5${halogen.molecule} -> 2${metal[0]}${halogen.symbol}5`,
                productState: 'crystal',
                solidForm: 'crystal',
                color: halogen.symbol === 'I' ? '#7a4f8f' : '#f4edcf',
                requiredCondition: 'controlled_halogenation',
                safetyNote: '高酸化数ハロゲン化物は揮発性や腐食性を持つものがあるため、VCLでは教材用表示だけに限定します。',
                confidence: halogen.symbol === 'I' ? 'medium' : 'high'
            });
        }
    }

    const rows = [
        ['Mo', 'F', 'MoF6', '六フッ化モリブデン', 'モリブデンとフッ素は、条件を制御すると六フッ化モリブデンを作る代表例があります。', 'Mo + 3F2 -> MoF6', 'gas', '#dff6ff', 'controlled_fluorination', 'medium'],
        ['W', 'F', 'WF6', '六フッ化タングステン', 'タングステンとフッ素は、条件を制御すると六フッ化タングステンを作ります。', 'W + 3F2 -> WF6', 'gas', '#dff6ff', 'controlled_fluorination', 'high'],
        ['Mo', 'Cl', 'MoCl5', '塩化モリブデン(V)', 'モリブデンと塩素は、代表例として塩化モリブデン(V)を作ります。', '2Mo + 5Cl2 -> 2MoCl5', 'crystal', '#2f3a2c', 'controlled_chlorination', 'medium'],
        ['W', 'Cl', 'WCl6', '塩化タングステン(VI)', 'タングステンと塩素は、代表例として塩化タングステン(VI)を作ります。', 'W + 3Cl2 -> WCl6', 'crystal', '#3d3b34', 'controlled_chlorination', 'medium'],
        ['Re', 'F', 'ReF6', '六フッ化レニウム', 'レニウムとフッ素は、代表例として六フッ化レニウムを作ります。', 'Re + 3F2 -> ReF6', 'gas', '#dff6ff', 'controlled_fluorination', 'medium'],
        ['Os', 'O', 'OsO4', '四酸化オスミウム', 'オスミウムと酸素は、代表例として四酸化オスミウムを作ります。非常に有毒な物質です。', 'Os + 2O2 -> OsO4', 'crystal', '#f4edcf', 'unsafe', 'medium'],
        ['Ir', 'O', 'IrO2', '二酸化イリジウム', 'イリジウムは酸素と反応して二酸化イリジウムを作る代表例があります。', 'Ir + O2 -> IrO2', 'powder', '#333333', 'heat_or_combustion', 'medium'],
        ['Pt', 'O', 'PtO2', '二酸化白金', '白金は条件を制御すると二酸化白金を作る代表例があります。', 'Pt + O2 -> PtO2', 'powder', '#333333', 'controlled_oxidation', 'medium'],
        ['Au', 'O', 'Au2O3', '酸化金(III)', '金は条件を制御すると酸化金(III)を作る代表例があります。', '4Au + 3O2 -> 2Au2O3', 'powder', '#5b3528', 'controlled_oxidation', 'medium']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, productState, color, requiredCondition, confidence] of rows) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState,
            solidForm: productState === 'gas' || productState === 'liquid' ? 'none' : productState === 'crystal' ? 'crystal' : 'powder',
            color,
            requiredCondition,
            safetyNote: '高酸化数化合物や貴金属酸化物は危険性や条件依存性があるため、VCLでは教材用の代表例として表示します。',
            confidence
        });
    }
}

function registerAdditionalGroupChalcogenidesAndRareEarthPnictides() {
    const rows = [
        ['Al', 'Se', 'Al2Se3', 'セレン化アルミニウム', 'アルミニウムとセレンは高温条件でセレン化アルミニウムを作ります。', '2Al + 3Se -> Al2Se3', 'crystal', '#c98a3a', 'high_temperature', 'high'],
        ['Al', 'Te', 'Al2Te3', 'テルル化アルミニウム', 'アルミニウムとテルルは高温条件でテルル化アルミニウムを作ります。', '2Al + 3Te -> Al2Te3', 'crystal', '#555555', 'high_temperature', 'high'],
        ['Ga', 'Se', 'Ga2Se3', 'セレン化ガリウム(III)', 'ガリウムとセレンは高温条件でセレン化ガリウム(III)を作る代表例があります。', '2Ga + 3Se -> Ga2Se3', 'crystal', '#c98a3a', 'high_temperature', 'medium'],
        ['Ga', 'Te', 'Ga2Te3', 'テルル化ガリウム(III)', 'ガリウムとテルルは高温条件でテルル化ガリウム(III)を作る代表例があります。', '2Ga + 3Te -> Ga2Te3', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['In', 'Se', 'In2Se3', 'セレン化インジウム(III)', 'インジウムとセレンは高温条件でセレン化インジウム(III)を作る代表例があります。', '2In + 3Se -> In2Se3', 'crystal', '#c98a3a', 'high_temperature', 'medium'],
        ['In', 'Te', 'In2Te3', 'テルル化インジウム(III)', 'インジウムとテルルは高温条件でテルル化インジウム(III)を作る代表例があります。', '2In + 3Te -> In2Te3', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Ge', 'Se', 'GeSe2', 'セレン化ゲルマニウム(IV)', 'ゲルマニウムとセレンは高温条件でセレン化ゲルマニウム(IV)を作ります。', 'Ge + 2Se -> GeSe2', 'crystal', '#c98a3a', 'high_temperature', 'high'],
        ['Ge', 'Te', 'GeTe', 'テルル化ゲルマニウム(II)', 'ゲルマニウムとテルルは高温条件でテルル化ゲルマニウム(II)を作る代表例があります。', 'Ge + Te -> GeTe', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Si', 'S', 'SiS2', '硫化ケイ素', 'ケイ素と硫黄は高温条件で硫化ケイ素を作る代表例があります。', 'Si + 2S -> SiS2', 'crystal', '#eee7c8', 'high_temperature', 'medium'],
        ['Si', 'Se', 'SiSe2', 'セレン化ケイ素', 'ケイ素とセレンは高温条件でセレン化ケイ素を作る代表例があります。', 'Si + 2Se -> SiSe2', 'crystal', '#c98a3a', 'high_temperature', 'medium'],
        ['Si', 'Te', 'SiTe2', 'テルル化ケイ素', 'ケイ素とテルルは高温条件でテルル化ケイ素を作る代表例があります。', 'Si + 2Te -> SiTe2', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['P', 'S', 'P4S10', '十硫化四リン', 'リンと硫黄は条件を制御すると十硫化四リンを作る代表例があります。', 'P4 + 10S -> P4S10', 'powder', '#ead78a', 'controlled_reaction', 'medium'],
        ['P', 'Se', 'P4Se3', '三セレン化四リン', 'リンとセレンは条件を制御すると三セレン化四リンを作る代表例があります。', 'P4 + 3Se -> P4Se3', 'crystal', '#8a3f2b', 'controlled_reaction', 'medium'],
        ['As', 'S', 'As2S3', '硫化ヒ素(III)', 'ヒ素と硫黄は条件を制御すると硫化ヒ素(III)を作る代表例があります。', '2As + 3S -> As2S3', 'powder', '#d99a2b', 'controlled_reaction', 'medium'],
        ['As', 'Se', 'As2Se3', 'セレン化ヒ素(III)', 'ヒ素とセレンは条件を制御するとセレン化ヒ素(III)を作る代表例があります。', '2As + 3Se -> As2Se3', 'crystal', '#8a3f2b', 'controlled_reaction', 'medium'],
        ['As', 'Te', 'As2Te3', 'テルル化ヒ素(III)', 'ヒ素とテルルは条件を制御するとテルル化ヒ素(III)を作る代表例があります。', '2As + 3Te -> As2Te3', 'crystal', '#555555', 'controlled_reaction', 'medium'],
        ['Sb', 'Se', 'Sb2Se3', 'セレン化アンチモン(III)', 'アンチモンとセレンは高温条件でセレン化アンチモン(III)を作る代表例があります。', '2Sb + 3Se -> Sb2Se3', 'crystal', '#555555', 'high_temperature', 'medium'],
        ['Sb', 'Te', 'Sb2Te3', 'テルル化アンチモン(III)', 'アンチモンとテルルは高温条件でテルル化アンチモン(III)を作る代表例があります。', '2Sb + 3Te -> Sb2Te3', 'crystal', '#555555', 'high_temperature', 'medium']
    ];

    for (const [symbolA, symbolB, formula, productName, summary, equation, solidForm, color, requiredCondition, confidence] of rows) {
        registerExpandedReactionRow({
            symbolA,
            symbolB,
            formula,
            productName,
            summary,
            equation,
            productState: solidForm,
            solidForm,
            color,
            requiredCondition,
            safetyNote: '主族カルコゲン化物は毒性や高温条件が関係するため、VCLでは教材用の代表例として表示します。',
            confidence
        });
    }

    const rareEarths = [
        ['Ce', 'セリウム'],
        ['Pr', 'プラセオジム'],
        ['Nd', 'ネオジム'],
        ['Sm', 'サマリウム'],
        ['Gd', 'ガドリニウム'],
        ['Dy', 'ジスプロシウム'],
        ['Er', 'エルビウム'],
        ['Lu', 'ルテチウム']
    ];

    for (const [symbol, name] of rareEarths) {
        for (const [pnictogenSymbol, pnictogenName, prefix] of [
            ['P', 'リン', 'リン化'],
            ['As', 'ヒ素', 'ヒ化'],
            ['Sb', 'アンチモン', 'アンチモン化']
        ]) {
            registerExpandedReactionRow({
                symbolA: symbol,
                symbolB: pnictogenSymbol,
                formula: `${symbol}${pnictogenSymbol}`,
                productName: `${prefix}${name}`,
                summary: `${name}と${pnictogenName}は高温条件で${prefix}${name}を作る代表例があります。`,
                equation: pnictogenSymbol === 'P'
                    ? `4${symbol} + P4 -> 4${symbol}P`
                    : `${symbol} + ${pnictogenSymbol} -> ${symbol}${pnictogenSymbol}`,
                productState: 'crystal',
                solidForm: 'crystal',
                color: '#555555',
                requiredCondition: 'high_temperature',
                safetyNote: '希土類ニクタイドは高温合成や毒性管理が関係するため、VCLでは教材用の代表例として表示します。',
                confidence: 'medium'
            });
        }
    }
}

registerAlkaliMetalHalides();
registerAlkalineEarthMetalHalides();
registerAluminumHalides();
registerNamedExactReactions();
registerHydrides();
registerExpandedHalides();
registerAdditionalRepresentativeRows();
registerTransitionMetalHalides();
registerSemiconductorAndMaterialRows();
registerAdditionalOxideRows();
registerRareEarthHalides();
registerRareEarthChalcogenidesAndNitrides();
registerAlkaliAndAlkalineChalcogenides();
registerAdditionalPnictides();
registerMainGroupHydridesAndHalides();
registerMoreTransitionChalcogenides();
registerAdvancedMetalHalidesAndOxides();
registerAdditionalGroupChalcogenidesAndRareEarthPnictides();

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

function symbolPairKey(elementA, elementB) {
    return [elementA.symbol, elementB.symbol].sort((left, right) => left.localeCompare(right)).join('__');
}

function isCategory(element, category) {
    return element.category === category;
}

function isMetal(element) {
    return METAL_CATEGORIES.has(element.category);
}

function visualDetail({
    productName = null,
    productState = 'none',
    solidForm = 'none',
    solidColor = null,
    gasName = null,
    bubbleColor = null,
    colorChange = null,
    displayHint = '',
    requiredCondition = 'none'
}) {
    return {
        productName,
        productState,
        solidForm,
        solidColor,
        gasName,
        bubbleColor,
        colorChange,
        displayHint,
        requiredCondition
    };
}

function result(testTubeElement, flaskElement, {
    ruleId,
    title,
    summary,
    equation = '',
    visualEffect = 'no_reaction',
    liquidColor = null,
    detail = {},
    safetyNote = '実際の実験は先生の指示と安全管理に従ってください。',
    confidence = 'low',
    verificationStatus = 'verified_condition_dependent_no_single_product'
}) {
    return {
        pair_key: orderedPairKey(testTubeElement, flaskElement),
        reaction_key: reactionKey(testTubeElement.name, flaskElement.name),
        test_tube_symbol: testTubeElement.symbol,
        flask_symbol: flaskElement.symbol,
        reactant_a: testTubeElement.name,
        reactant_b: flaskElement.name,
        title,
        summary,
        equation,
        visualEffect,
        liquidColor,
        visualDetail: visualDetail(detail),
        safetyNote,
        confidence,
        verificationStatus,
        source: 'periodic-dataset',
        ruleId,
        dataVersion: DATA_VERSION
    };
}

function exactReaction(testTubeElement, flaskElement, reaction) {
    return result(testTubeElement, flaskElement, {
        ruleId: reaction.ruleId,
        title: reaction.title,
        summary: reaction.summary,
        equation: reaction.equation,
        visualEffect: reaction.visualEffect,
        liquidColor: reaction.liquidColor,
        detail: {
            productName: reaction.productName,
            productState: reaction.productState,
            solidForm: reaction.solidForm || 'none',
            solidColor: reaction.solidColor || null,
            gasName: reaction.gasName || null,
            bubbleColor: reaction.bubbleColor || null,
            colorChange: reaction.colorChange || null,
            displayHint: reaction.displayHint,
            requiredCondition: reaction.requiredCondition
        },
        safetyNote: reaction.safetyNote,
        confidence: reaction.confidence,
        verificationStatus: 'verified_representative'
    });
}

function sameElementResult(elementA, elementB) {
    return result(elementA, elementB, {
        ruleId: 'same-element-no-new-substance',
        title: `${elementA.name}どうし`,
        summary: `試験管とフラスコのどちらも${elementA.name}なので、新しい物質ができる反応としては扱いません。`,
        detail: {
            productName: elementA.name,
            productState: 'none',
            solidForm: 'none',
            displayHint: '同じ元素どうしのため、目立つ変化は表示しない',
            requiredCondition: 'none'
        },
        confidence: 'high',
        verificationStatus: 'verified_no_new_substance'
    });
}

function actinideSafetyResult(elementA, elementB, actinide) {
    return result(elementA, elementB, {
        ruleId: 'actinide-safety-blocked',
        title: `${actinide.name}を含むため表示を制限`,
        summary: `${actinide.name}は放射性元素として安全管理が必要なため、VCLでは反応生成物を断定せず、安全側の表示にします。`,
        detail: {
            productState: 'unknown',
            solidForm: 'none',
            displayHint: '安全上、生成物や反応演出を表示しない',
            requiredCondition: 'unsafe'
        },
        safetyNote: '放射性元素を含む実験は学校実験の対象外として扱います。',
        confidence: 'high',
        verificationStatus: 'verified_safety_blocked'
    });
}

function nobleGasResult(elementA, elementB, nobleGas) {
    return result(elementA, elementB, {
        ruleId: 'noble-gas-no-obvious-reaction',
        title: '希ガスの安定性',
        summary: `${nobleGas.name}は非常に反応しにくい希ガスなので、常温で単に混ぜるだけでは目立つ変化は起こりにくいと考えられます。`,
        detail: {
            productState: 'none',
            solidForm: 'none',
            displayHint: '希ガスの安定性を示すため、目立つ変化は表示しない',
            requiredCondition: 'none'
        },
        confidence: 'high',
        verificationStatus: 'verified_no_obvious_reaction'
    });
}

function metalPairResult(elementA, elementB) {
    return result(elementA, elementB, {
        ruleId: 'metal-metal-room-temperature-no-obvious-reaction',
        title: '常温混合では大きな変化なし',
        summary: `${elementA.name}と${elementB.name}は、金属どうしなので常温で置いて混ぜるだけでは新しい化合物ができる反応としては扱いません。合金化には溶融など別条件が必要です。`,
        detail: {
            productState: 'none',
            solidForm: 'none',
            displayHint: '常温混合では目立つ変化を表示しない',
            requiredCondition: 'high_temperature_melting_for_alloy'
        },
        confidence: 'medium',
        verificationStatus: 'verified_condition_required_no_room_temp_reaction'
    });
}

function oxygenConditionDependentResult(elementA, elementB, otherElement) {
    return result(elementA, elementB, {
        ruleId: 'oxygen-condition-dependent-no-single-product',
        title: '酸化は条件依存',
        summary: `${otherElement.name}と酸素は、加熱・燃焼・表面状態などの条件で酸化物を作る場合があります。ただし、この組み合わせの生成物を全条件で1つに断定するのは科学的に不正確なため、VCLでは反応演出を出しません。`,
        detail: {
            productState: 'unknown',
            solidForm: 'none',
            displayHint: '条件が足りないため、生成物を断定せず観察文だけ表示',
            requiredCondition: 'condition_dependent'
        },
        confidence: 'low',
        verificationStatus: 'verified_condition_dependent_no_single_product'
    });
}

function conditionDependentResult(elementA, elementB) {
    return result(elementA, elementB, {
        ruleId: 'condition-dependent-no-single-product',
        title: '条件依存（生成物は断定しない）',
        summary: `${elementA.name}と${elementB.name}は、温度、圧力、触媒、酸素量、水分、物質の状態などで結果が変わる可能性があります。単一の生成物を断定するのは科学的に不正確なため、VCLでは反応演出を出しません。`,
        detail: {
            productState: 'unknown',
            solidForm: 'none',
            displayHint: '条件が足りないため、生成物を表示しない',
            requiredCondition: 'unknown_or_condition_dependent'
        },
        safetyNote: '条件依存の組み合わせは、安全と正確性のため実験手順や生成物を断定しません。',
        confidence: 'low',
        verificationStatus: 'verified_condition_dependent_no_single_product'
    });
}

function classifyPair(testTubeElement, flaskElement) {
    const elementA = testTubeElement;
    const elementB = flaskElement;

    if (elementA.symbol === elementB.symbol) {
        return sameElementResult(elementA, elementB);
    }

    const actinide = isCategory(elementA, 'actinide') ? elementA : isCategory(elementB, 'actinide') ? elementB : null;
    if (actinide) {
        return actinideSafetyResult(elementA, elementB, actinide);
    }

    const nobleGas = isCategory(elementA, 'noble-gas') ? elementA : isCategory(elementB, 'noble-gas') ? elementB : null;
    if (nobleGas) {
        return nobleGasResult(elementA, elementB, nobleGas);
    }

    const exact = EXACT_REACTIONS_BY_SYMBOL_KEY.get(symbolPairKey(elementA, elementB));
    if (exact) {
        return exactReaction(elementA, elementB, exact);
    }

    if (elementA.symbol === 'O' || elementB.symbol === 'O') {
        const other = elementA.symbol === 'O' ? elementB : elementA;
        return oxygenConditionDependentResult(elementA, elementB, other);
    }

    if (isMetal(elementA) && isMetal(elementB)) {
        return metalPairResult(elementA, elementB);
    }

    return conditionDependentResult(elementA, elementB);
}

function main() {
    const rows = [];

    for (const testTubeElement of periodicTableLayout) {
        for (const flaskElement of periodicTableLayout) {
            rows.push(classifyPair(testTubeElement, flaskElement));
        }
    }

    const pairKeys = new Set(rows.map(row => row.pair_key));
    if (rows.length !== 13924) {
        throw new Error(`Expected 13924 rows, got ${rows.length}.`);
    }
    if (pairKeys.size !== rows.length) {
        throw new Error(`Duplicate ordered pair keys detected: ${rows.length - pairKeys.size}.`);
    }

    fs.writeFileSync(OUT_PATH, `${JSON.stringify(rows)}\n`, 'utf8');
    console.log(`Generated ${rows.length} verified-classification periodic free-mode reaction rows.`);
    console.log(`Output: ${path.relative(ROOT_DIR, OUT_PATH)}`);
}

main();
