-- フリーモードで教材として確定している反応を保存する。
create table if not exists public.free_reaction_rules (
    id uuid primary key default gen_random_uuid(), -- 反応ルールID
    reaction_key text not null unique, -- 物質名2つを正規化して並べた検索キー
    reactant_a text not null, -- 片方の物質名
    reactant_b text not null, -- もう片方の物質名
    title text not null, -- 画面に出す短い反応名
    summary text not null, -- 中学生向けの説明
    equation text, -- 反応式。難しい場合は空でもよい
    visual_effect text not null default 'unknown' check (
        visual_effect in ('no_reaction', 'color_change', 'bubbles', 'precipitate', 'dissolve', 'unknown')
    ), -- 3D画面で使う反応演出
    liquid_color text, -- 色変化がある場合のHTMLカラー
    visual_detail jsonb, -- 生成物の状態や3D表示用の詳細
    safety_note text, -- 安全面や教材上の補足
    is_enabled boolean not null default true, -- フリーモードで使うか
    created_at timestamptz not null default now(), -- 作成日時
    updated_at timestamptz not null default now() -- 更新日時
);

alter table public.free_reaction_rules
    add column if not exists visual_detail jsonb;

-- DB未登録の組み合わせをAIで補完した結果を保存し、次回以降のAPI費用を抑える。
create table if not exists public.free_reaction_ai_cache (
    id uuid primary key default gen_random_uuid(), -- AI補完結果ID
    reaction_key text not null unique, -- 物質名2つを正規化して並べた検索キー
    reactant_a text not null, -- ユーザーが選んだ片方の物質名
    reactant_b text not null, -- ユーザーが選んだもう片方の物質名
    model text not null, -- 生成に使ったOpenAIモデル名
    response_json jsonb not null, -- 画面表示と演出に使うAI判定結果
    created_at timestamptz not null default now(), -- 作成日時
    updated_at timestamptz not null default now() -- 更新日時
);

-- フリーモード反応ルール更新時にupdated_atを更新する。
drop trigger if exists set_free_reaction_rules_updated_at on public.free_reaction_rules;
create trigger set_free_reaction_rules_updated_at
before update on public.free_reaction_rules
for each row execute function public.set_updated_at();

-- AIキャッシュ更新時にupdated_atを更新する。
drop trigger if exists set_free_reaction_ai_cache_updated_at on public.free_reaction_ai_cache;
create trigger set_free_reaction_ai_cache_updated_at
before update on public.free_reaction_ai_cache
for each row execute function public.set_updated_at();

-- フリーモード用テーブルも公開スキーマ上ではRLSを有効にする。通常アクセスはサーバー側API経由に限定する。
alter table public.free_reaction_rules enable row level security;
alter table public.free_reaction_ai_cache enable row level security;

-- 既存クエストで扱う反応はDBに固定データとして登録する。
insert into public.free_reaction_rules (
    reaction_key,
    reactant_a,
    reactant_b,
    title,
    summary,
    equation,
    visual_effect,
    liquid_color,
    visual_detail,
    safety_note,
    is_enabled
)
values
    (
        '過酸化水素水__二酸化マンガン',
        '過酸化水素水',
        '二酸化マンガン',
        '酸素の発生',
        '二酸化マンガンが触媒としてはたらき、過酸化水素水から酸素が発生します。',
        '2H2O2 -> 2H2O + O2',
        'bubbles',
        '#d8f7ff',
        '{"productName":"酸素","productState":"gas","solidForm":"none","solidColor":null,"gasName":"酸素","bubbleColor":"#ffffff","colorChange":null,"displayHint":"酸素が泡として発生する様子を表示","requiredCondition":"catalyst"}'::jsonb,
        '実際の過酸化水素水は濃度によって危険性が変わるため、学校では先生の指示に従います。',
        true
    ),
    (
        '塩酸__石灰石',
        '石灰石',
        '塩酸',
        '二酸化炭素の発生',
        '石灰石に含まれる炭酸カルシウムが塩酸と反応し、二酸化炭素が発生します。',
        'CaCO3 + 2HCl -> CaCl2 + H2O + CO2',
        'bubbles',
        '#f4f4f4',
        '{"productName":"二酸化炭素","productState":"gas","solidForm":"none","solidColor":null,"gasName":"二酸化炭素","bubbleColor":"#ffffff","colorChange":null,"displayHint":"二酸化炭素が泡として発生する様子を表示","requiredCondition":"room_temp_mix"}'::jsonb,
        '塩酸は刺激性があるため、実験では保護具と換気が必要です。',
        true
    ),
    (
        '塩酸__アルミニウム',
        'アルミニウム',
        '塩酸',
        '水素の発生',
        'アルミニウムが塩酸に溶け、水素が発生します。',
        '2Al + 6HCl -> 2AlCl3 + 3H2',
        'dissolve',
        '#eef5ff',
        '{"productName":"塩化アルミニウム水溶液と水素","productState":"dissolved","solidForm":"none","solidColor":"#d9dde4","gasName":"水素","bubbleColor":"#ffffff","colorChange":"#eef5ff","displayHint":"アルミニウムが小さくなりながら水素の泡が出る様子を表示","requiredCondition":"room_temp_mix"}'::jsonb,
        '水素は燃えやすいため、実験では火気を近づけません。',
        true
    ),
    (
        '石灰水__二酸化炭素',
        '石灰水',
        '二酸化炭素',
        '石灰水の白濁',
        '二酸化炭素を石灰水に通すと、炭酸カルシウムができて白くにごります。',
        'Ca(OH)2 + CO2 -> CaCO3 + H2O',
        'precipitate',
        '#ffffff',
        '{"productName":"炭酸カルシウム","productState":"powder","solidForm":"powder","solidColor":"#ffffff","gasName":null,"bubbleColor":null,"colorChange":"#ffffff","displayHint":"白い粉状沈殿で石灰水の白濁を表示","requiredCondition":"room_temp_mix"}'::jsonb,
        '石灰水は目や皮膚に触れないように注意します。',
        true
    ),
    (
        '食塩水__硝酸銀水溶液',
        '硝酸銀水溶液',
        '食塩水',
        '塩化銀の沈殿',
        '硝酸銀水溶液と食塩水を混ぜると、白い塩化銀の沈殿ができます。',
        'AgNO3 + NaCl -> AgCl + NaNO3',
        'precipitate',
        '#ffffff',
        '{"productName":"塩化銀","productState":"powder","solidForm":"powder","solidColor":"#ffffff","gasName":null,"bubbleColor":null,"colorChange":"#ffffff","displayHint":"白い粉状の塩化銀沈殿を表示","requiredCondition":"room_temp_mix"}'::jsonb,
        '硝酸銀は皮膚や衣服に付くと変色することがあるため、実験では注意します。',
        true
    )
on conflict (reaction_key) do update set
    reactant_a = excluded.reactant_a,
    reactant_b = excluded.reactant_b,
    title = excluded.title,
    summary = excluded.summary,
    equation = excluded.equation,
    visual_effect = excluded.visual_effect,
    liquid_color = excluded.liquid_color,
    visual_detail = excluded.visual_detail,
    safety_note = excluded.safety_note,
    is_enabled = excluded.is_enabled,
    updated_at = now();

create index if not exists idx_free_reaction_rules_reaction_key on public.free_reaction_rules(reaction_key); -- 既知反応の検索を速くする
create index if not exists idx_free_reaction_ai_cache_reaction_key on public.free_reaction_ai_cache(reaction_key); -- AIキャッシュの検索を速くする
