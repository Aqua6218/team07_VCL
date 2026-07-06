export const PERIODIC_TABLE_COLUMNS = 18;
export const PERIODIC_TABLE_ROWS = 9;

const CATEGORY_LABELS = {
    'reactive-nonmetal': '非金属',
    'noble-gas': '希ガス',
    'alkali-metal': 'アルカリ金属',
    'alkaline-earth-metal': 'アルカリ土類金属',
    metalloid: '半金属',
    halogen: 'ハロゲン',
    'post-transition-metal': '典型金属',
    'transition-metal': '遷移金属',
    lanthanide: 'ランタノイド',
    actinide: 'アクチノイド'
};

const SOLID_NONMETALS = new Set(['B', 'C', 'Si', 'P', 'S', 'Ge', 'As', 'Se', 'Sb', 'Te', 'I', 'At', 'Ts']);
const LIQUID_ELEMENTS = new Set(['Br', 'Hg']);

function appearanceFor(symbol, category) {
    if (LIQUID_ELEMENTS.has(symbol)) return '液体';
    if (category === 'noble-gas' || ['H', 'N', 'O', 'F', 'Cl'].includes(symbol)) return '無色気体';
    if (SOLID_NONMETALS.has(symbol)) return '固体';
    return '銀白色の金属';
}

function element(number, symbol, name, englishName, group, period, category) {
    return {
        number,
        symbol,
        name,
        englishName,
        group,
        period,
        category,
        categoryLabel: CATEGORY_LABELS[category] || '元素',
        appearance: appearanceFor(symbol, category)
    };
}

export const periodicTableLayout = [
    element(1, 'H', '水素', 'Hydrogen', 1, 1, 'reactive-nonmetal'),
    element(2, 'He', 'ヘリウム', 'Helium', 18, 1, 'noble-gas'),

    element(3, 'Li', 'リチウム', 'Lithium', 1, 2, 'alkali-metal'),
    element(4, 'Be', 'ベリリウム', 'Beryllium', 2, 2, 'alkaline-earth-metal'),
    element(5, 'B', 'ホウ素', 'Boron', 13, 2, 'metalloid'),
    element(6, 'C', '炭素', 'Carbon', 14, 2, 'reactive-nonmetal'),
    element(7, 'N', '窒素', 'Nitrogen', 15, 2, 'reactive-nonmetal'),
    element(8, 'O', '酸素', 'Oxygen', 16, 2, 'reactive-nonmetal'),
    element(9, 'F', 'フッ素', 'Fluorine', 17, 2, 'halogen'),
    element(10, 'Ne', 'ネオン', 'Neon', 18, 2, 'noble-gas'),

    element(11, 'Na', 'ナトリウム', 'Sodium', 1, 3, 'alkali-metal'),
    element(12, 'Mg', 'マグネシウム', 'Magnesium', 2, 3, 'alkaline-earth-metal'),
    element(13, 'Al', 'アルミニウム', 'Aluminum', 13, 3, 'post-transition-metal'),
    element(14, 'Si', 'ケイ素', 'Silicon', 14, 3, 'metalloid'),
    element(15, 'P', 'リン', 'Phosphorus', 15, 3, 'reactive-nonmetal'),
    element(16, 'S', '硫黄', 'Sulfur', 16, 3, 'reactive-nonmetal'),
    element(17, 'Cl', '塩素', 'Chlorine', 17, 3, 'halogen'),
    element(18, 'Ar', 'アルゴン', 'Argon', 18, 3, 'noble-gas'),

    element(19, 'K', 'カリウム', 'Potassium', 1, 4, 'alkali-metal'),
    element(20, 'Ca', 'カルシウム', 'Calcium', 2, 4, 'alkaline-earth-metal'),
    element(21, 'Sc', 'スカンジウム', 'Scandium', 3, 4, 'transition-metal'),
    element(22, 'Ti', 'チタン', 'Titanium', 4, 4, 'transition-metal'),
    element(23, 'V', 'バナジウム', 'Vanadium', 5, 4, 'transition-metal'),
    element(24, 'Cr', 'クロム', 'Chromium', 6, 4, 'transition-metal'),
    element(25, 'Mn', 'マンガン', 'Manganese', 7, 4, 'transition-metal'),
    element(26, 'Fe', '鉄', 'Iron', 8, 4, 'transition-metal'),
    element(27, 'Co', 'コバルト', 'Cobalt', 9, 4, 'transition-metal'),
    element(28, 'Ni', 'ニッケル', 'Nickel', 10, 4, 'transition-metal'),
    element(29, 'Cu', '銅', 'Copper', 11, 4, 'transition-metal'),
    element(30, 'Zn', '亜鉛', 'Zinc', 12, 4, 'transition-metal'),
    element(31, 'Ga', 'ガリウム', 'Gallium', 13, 4, 'post-transition-metal'),
    element(32, 'Ge', 'ゲルマニウム', 'Germanium', 14, 4, 'metalloid'),
    element(33, 'As', 'ヒ素', 'Arsenic', 15, 4, 'metalloid'),
    element(34, 'Se', 'セレン', 'Selenium', 16, 4, 'reactive-nonmetal'),
    element(35, 'Br', '臭素', 'Bromine', 17, 4, 'halogen'),
    element(36, 'Kr', 'クリプトン', 'Krypton', 18, 4, 'noble-gas'),

    element(37, 'Rb', 'ルビジウム', 'Rubidium', 1, 5, 'alkali-metal'),
    element(38, 'Sr', 'ストロンチウム', 'Strontium', 2, 5, 'alkaline-earth-metal'),
    element(39, 'Y', 'イットリウム', 'Yttrium', 3, 5, 'transition-metal'),
    element(40, 'Zr', 'ジルコニウム', 'Zirconium', 4, 5, 'transition-metal'),
    element(41, 'Nb', 'ニオブ', 'Niobium', 5, 5, 'transition-metal'),
    element(42, 'Mo', 'モリブデン', 'Molybdenum', 6, 5, 'transition-metal'),
    element(43, 'Tc', 'テクネチウム', 'Technetium', 7, 5, 'transition-metal'),
    element(44, 'Ru', 'ルテニウム', 'Ruthenium', 8, 5, 'transition-metal'),
    element(45, 'Rh', 'ロジウム', 'Rhodium', 9, 5, 'transition-metal'),
    element(46, 'Pd', 'パラジウム', 'Palladium', 10, 5, 'transition-metal'),
    element(47, 'Ag', '銀', 'Silver', 11, 5, 'transition-metal'),
    element(48, 'Cd', 'カドミウム', 'Cadmium', 12, 5, 'transition-metal'),
    element(49, 'In', 'インジウム', 'Indium', 13, 5, 'post-transition-metal'),
    element(50, 'Sn', 'スズ', 'Tin', 14, 5, 'post-transition-metal'),
    element(51, 'Sb', 'アンチモン', 'Antimony', 15, 5, 'metalloid'),
    element(52, 'Te', 'テルル', 'Tellurium', 16, 5, 'metalloid'),
    element(53, 'I', 'ヨウ素', 'Iodine', 17, 5, 'halogen'),
    element(54, 'Xe', 'キセノン', 'Xenon', 18, 5, 'noble-gas'),

    element(55, 'Cs', 'セシウム', 'Cesium', 1, 6, 'alkali-metal'),
    element(56, 'Ba', 'バリウム', 'Barium', 2, 6, 'alkaline-earth-metal'),
    element(72, 'Hf', 'ハフニウム', 'Hafnium', 4, 6, 'transition-metal'),
    element(73, 'Ta', 'タンタル', 'Tantalum', 5, 6, 'transition-metal'),
    element(74, 'W', 'タングステン', 'Tungsten', 6, 6, 'transition-metal'),
    element(75, 'Re', 'レニウム', 'Rhenium', 7, 6, 'transition-metal'),
    element(76, 'Os', 'オスミウム', 'Osmium', 8, 6, 'transition-metal'),
    element(77, 'Ir', 'イリジウム', 'Iridium', 9, 6, 'transition-metal'),
    element(78, 'Pt', '白金', 'Platinum', 10, 6, 'transition-metal'),
    element(79, 'Au', '金', 'Gold', 11, 6, 'transition-metal'),
    element(80, 'Hg', '水銀', 'Mercury', 12, 6, 'transition-metal'),
    element(81, 'Tl', 'タリウム', 'Thallium', 13, 6, 'post-transition-metal'),
    element(82, 'Pb', '鉛', 'Lead', 14, 6, 'post-transition-metal'),
    element(83, 'Bi', 'ビスマス', 'Bismuth', 15, 6, 'post-transition-metal'),
    element(84, 'Po', 'ポロニウム', 'Polonium', 16, 6, 'post-transition-metal'),
    element(85, 'At', 'アスタチン', 'Astatine', 17, 6, 'halogen'),
    element(86, 'Rn', 'ラドン', 'Radon', 18, 6, 'noble-gas'),

    element(87, 'Fr', 'フランシウム', 'Francium', 1, 7, 'alkali-metal'),
    element(88, 'Ra', 'ラジウム', 'Radium', 2, 7, 'alkaline-earth-metal'),
    element(104, 'Rf', 'ラザホージウム', 'Rutherfordium', 4, 7, 'transition-metal'),
    element(105, 'Db', 'ドブニウム', 'Dubnium', 5, 7, 'transition-metal'),
    element(106, 'Sg', 'シーボーギウム', 'Seaborgium', 6, 7, 'transition-metal'),
    element(107, 'Bh', 'ボーリウム', 'Bohrium', 7, 7, 'transition-metal'),
    element(108, 'Hs', 'ハッシウム', 'Hassium', 8, 7, 'transition-metal'),
    element(109, 'Mt', 'マイトネリウム', 'Meitnerium', 9, 7, 'transition-metal'),
    element(110, 'Ds', 'ダームスタチウム', 'Darmstadtium', 10, 7, 'transition-metal'),
    element(111, 'Rg', 'レントゲニウム', 'Roentgenium', 11, 7, 'transition-metal'),
    element(112, 'Cn', 'コペルニシウム', 'Copernicium', 12, 7, 'transition-metal'),
    element(113, 'Nh', 'ニホニウム', 'Nihonium', 13, 7, 'post-transition-metal'),
    element(114, 'Fl', 'フレロビウム', 'Flerovium', 14, 7, 'post-transition-metal'),
    element(115, 'Mc', 'モスコビウム', 'Moscovium', 15, 7, 'post-transition-metal'),
    element(116, 'Lv', 'リバモリウム', 'Livermorium', 16, 7, 'post-transition-metal'),
    element(117, 'Ts', 'テネシン', 'Tennessine', 17, 7, 'halogen'),
    element(118, 'Og', 'オガネソン', 'Oganesson', 18, 7, 'noble-gas'),

    element(57, 'La', 'ランタン', 'Lanthanum', 3, 8, 'lanthanide'),
    element(58, 'Ce', 'セリウム', 'Cerium', 4, 8, 'lanthanide'),
    element(59, 'Pr', 'プラセオジム', 'Praseodymium', 5, 8, 'lanthanide'),
    element(60, 'Nd', 'ネオジム', 'Neodymium', 6, 8, 'lanthanide'),
    element(61, 'Pm', 'プロメチウム', 'Promethium', 7, 8, 'lanthanide'),
    element(62, 'Sm', 'サマリウム', 'Samarium', 8, 8, 'lanthanide'),
    element(63, 'Eu', 'ユウロピウム', 'Europium', 9, 8, 'lanthanide'),
    element(64, 'Gd', 'ガドリニウム', 'Gadolinium', 10, 8, 'lanthanide'),
    element(65, 'Tb', 'テルビウム', 'Terbium', 11, 8, 'lanthanide'),
    element(66, 'Dy', 'ジスプロシウム', 'Dysprosium', 12, 8, 'lanthanide'),
    element(67, 'Ho', 'ホルミウム', 'Holmium', 13, 8, 'lanthanide'),
    element(68, 'Er', 'エルビウム', 'Erbium', 14, 8, 'lanthanide'),
    element(69, 'Tm', 'ツリウム', 'Thulium', 15, 8, 'lanthanide'),
    element(70, 'Yb', 'イッテルビウム', 'Ytterbium', 16, 8, 'lanthanide'),
    element(71, 'Lu', 'ルテチウム', 'Lutetium', 17, 8, 'lanthanide'),

    element(89, 'Ac', 'アクチニウム', 'Actinium', 3, 9, 'actinide'),
    element(90, 'Th', 'トリウム', 'Thorium', 4, 9, 'actinide'),
    element(91, 'Pa', 'プロトアクチニウム', 'Protactinium', 5, 9, 'actinide'),
    element(92, 'U', 'ウラン', 'Uranium', 6, 9, 'actinide'),
    element(93, 'Np', 'ネプツニウム', 'Neptunium', 7, 9, 'actinide'),
    element(94, 'Pu', 'プルトニウム', 'Plutonium', 8, 9, 'actinide'),
    element(95, 'Am', 'アメリシウム', 'Americium', 9, 9, 'actinide'),
    element(96, 'Cm', 'キュリウム', 'Curium', 10, 9, 'actinide'),
    element(97, 'Bk', 'バークリウム', 'Berkelium', 11, 9, 'actinide'),
    element(98, 'Cf', 'カリホルニウム', 'Californium', 12, 9, 'actinide'),
    element(99, 'Es', 'アインスタイニウム', 'Einsteinium', 13, 9, 'actinide'),
    element(100, 'Fm', 'フェルミウム', 'Fermium', 14, 9, 'actinide'),
    element(101, 'Md', 'メンデレビウム', 'Mendelevium', 15, 9, 'actinide'),
    element(102, 'No', 'ノーベリウム', 'Nobelium', 16, 9, 'actinide'),
    element(103, 'Lr', 'ローレンシウム', 'Lawrencium', 17, 9, 'actinide')
];
