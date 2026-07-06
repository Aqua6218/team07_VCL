-- フリーモードAI補完キャッシュ用の初期候補。
-- 教材として確定した反応は free_reaction_rules へ昇格する。
insert into public.free_reaction_ai_cache (
    reaction_key,
    reactant_a,
    reactant_b,
    model,
    response_json
)
values
    (
        '食塩水__水',
        '水',
        '食塩水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 食塩水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__水',
        '水',
        '砂糖水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 砂糖水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__水',
        '水',
        '酢酸水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 酢酸水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__水',
        '水',
        '重曹水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 重曹水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__石灰水',
        '水',
        '石灰水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 石灰水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__二酸化炭素',
        '水',
        '二酸化炭素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 二酸化炭素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__水',
        '水',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 酸素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__水素',
        '水',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 水素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__水',
        '水',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 塩酸 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__水酸化ナトリウム水溶液',
        '水',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 水酸化ナトリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__水',
        '水',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と アンモニア水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__硫酸銅水溶液',
        '水',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 硫酸銅水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '硝酸銀水溶液__水',
        '水',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 硝酸銀水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__炭酸ナトリウム水溶液',
        '水',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 炭酸ナトリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__水',
        '水',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 塩化バリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__水',
        '水',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と ヨウ素液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__水',
        '水',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と デンプン水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__水',
        '水',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と フェノールフタレイン液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'btb溶液__水',
        '水',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と BTB溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'アルミニウム__水',
        '水',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と アルミニウム の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__鉄',
        '水',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 鉄 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__銅',
        '水',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 銅 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__水',
        '水',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 亜鉛 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__水',
        '水',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と マグネシウム の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__石灰石',
        '水',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 石灰石 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__二酸化マンガン',
        '水',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 二酸化マンガン の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__水',
        '水',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 過酸化水素水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__水',
        '水',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 塩化カルシウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '水__炭酸水',
        '水',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"水 と 炭酸水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__食塩水',
        '食塩水',
        '砂糖水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 砂糖水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__酢酸水溶液',
        '食塩水',
        '酢酸水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 酢酸水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__食塩水',
        '食塩水',
        '重曹水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 重曹水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__石灰水',
        '食塩水',
        '石灰水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 石灰水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__二酸化炭素',
        '食塩水',
        '二酸化炭素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 二酸化炭素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__食塩水',
        '食塩水',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 酸素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__水素',
        '食塩水',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 水素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__食塩水',
        '食塩水',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 塩酸 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__水酸化ナトリウム水溶液',
        '食塩水',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 水酸化ナトリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__食塩水',
        '食塩水',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と アンモニア水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__硫酸銅水溶液',
        '食塩水',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 硫酸銅水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '硝酸銀水溶液__食塩水',
        '食塩水',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"白い沈殿","summary":"銀イオンと塩化物イオンが出会うと、白い塩化銀の沈殿ができます。","equation":"Ag+ + Cl- -> AgCl","visualEffect":"precipitate","liquidColor":"#ffffff","safetyNote":"硝酸銀は皮膚や衣服を変色させることがあるため注意します。","confidence":"high"}'::jsonb
    ),
    (
        '食塩水__炭酸ナトリウム水溶液',
        '食塩水',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 炭酸ナトリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__食塩水',
        '食塩水',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 塩化バリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__食塩水',
        '食塩水',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と ヨウ素液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__食塩水',
        '食塩水',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と デンプン水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__食塩水',
        '食塩水',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と フェノールフタレイン液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'btb溶液__食塩水',
        '食塩水',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と BTB溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'アルミニウム__食塩水',
        '食塩水',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と アルミニウム の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__鉄',
        '食塩水',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 鉄 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__銅',
        '食塩水',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 銅 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__食塩水',
        '食塩水',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 亜鉛 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__食塩水',
        '食塩水',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と マグネシウム の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__石灰石',
        '食塩水',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 石灰石 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__二酸化マンガン',
        '食塩水',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 二酸化マンガン の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__食塩水',
        '食塩水',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 過酸化水素水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__食塩水',
        '食塩水',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 塩化カルシウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '食塩水__炭酸水',
        '食塩水',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"食塩水 と 炭酸水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__酢酸水溶液',
        '砂糖水',
        '酢酸水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 酢酸水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__重曹水',
        '砂糖水',
        '重曹水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 重曹水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__石灰水',
        '砂糖水',
        '石灰水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 石灰水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__二酸化炭素',
        '砂糖水',
        '二酸化炭素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 二酸化炭素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__酸素',
        '砂糖水',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 酸素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__水素',
        '砂糖水',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 水素 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__砂糖水',
        '砂糖水',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 塩酸 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__水酸化ナトリウム水溶液',
        '砂糖水',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 水酸化ナトリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__砂糖水',
        '砂糖水',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と アンモニア水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__硫酸銅水溶液',
        '砂糖水',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 硫酸銅水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__硝酸銀水溶液',
        '砂糖水',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 硝酸銀水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__炭酸ナトリウム水溶液',
        '砂糖水',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 炭酸ナトリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__砂糖水',
        '砂糖水',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 塩化バリウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__砂糖水',
        '砂糖水',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と ヨウ素液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__砂糖水',
        '砂糖水',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と デンプン水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__砂糖水',
        '砂糖水',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と フェノールフタレイン液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'btb溶液__砂糖水',
        '砂糖水',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と BTB溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'アルミニウム__砂糖水',
        '砂糖水',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と アルミニウム の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__鉄',
        '砂糖水',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 鉄 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__銅',
        '砂糖水',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 銅 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__砂糖水',
        '砂糖水',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 亜鉛 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__砂糖水',
        '砂糖水',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と マグネシウム の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__石灰石',
        '砂糖水',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 石灰石 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__二酸化マンガン',
        '砂糖水',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 二酸化マンガン の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__砂糖水',
        '砂糖水',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 過酸化水素水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__砂糖水',
        '砂糖水',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 塩化カルシウム水溶液 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '砂糖水__炭酸水',
        '砂糖水',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"大きな変化なし","summary":"砂糖水 と 炭酸水 の組み合わせでは、見た目の大きな変化は起こりにくいと考えられます。","equation":"","visualEffect":"no_reaction","liquidColor":"#d8f7ff","safetyNote":"フリーモードでは安全側の簡略表示として扱います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__酢酸水溶液',
        '酢酸水溶液',
        '重曹水',
        'local-ai-candidate-seed',
        '{"title":"二酸化炭素の発生","summary":"酸と炭酸を含む物質が反応し、二酸化炭素が発生します。","equation":"","visualEffect":"bubbles","liquidColor":"#f4f4f4","safetyNote":"酸性水溶液は刺激性があるため、実験では先生の指示に従います。","confidence":"medium"}'::jsonb
    ),
    (
        '酢酸水溶液__石灰水',
        '酢酸水溶液',
        '石灰水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 石灰水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__二酸化炭素',
        '酢酸水溶液',
        '二酸化炭素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 二酸化炭素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__酢酸水溶液',
        '酢酸水溶液',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 酸素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__水素',
        '酢酸水溶液',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 水素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__酢酸水溶液',
        '酢酸水溶液',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 塩酸 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__水酸化ナトリウム水溶液',
        '酢酸水溶液',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 水酸化ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__酢酸水溶液',
        '酢酸水溶液',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と アンモニア水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__硫酸銅水溶液',
        '酢酸水溶液',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 硫酸銅水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '硝酸銀水溶液__酢酸水溶液',
        '酢酸水溶液',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 硝酸銀水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__炭酸ナトリウム水溶液',
        '酢酸水溶液',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"二酸化炭素の発生","summary":"酸と炭酸を含む物質が反応し、二酸化炭素が発生します。","equation":"","visualEffect":"bubbles","liquidColor":"#f4f4f4","safetyNote":"酸性水溶液は刺激性があるため、実験では先生の指示に従います。","confidence":"medium"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__酢酸水溶液',
        '酢酸水溶液',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 塩化バリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__酢酸水溶液',
        '酢酸水溶液',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と ヨウ素液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__酢酸水溶液',
        '酢酸水溶液',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と デンプン水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__酢酸水溶液',
        '酢酸水溶液',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と フェノールフタレイン液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'btb溶液__酢酸水溶液',
        '酢酸水溶液',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"酸性の色変化","summary":"BTB溶液は酸性の水溶液で黄色系に変化します。","equation":"","visualEffect":"color_change","liquidColor":"#f6d84a","safetyNote":"酸性水溶液を扱うときは保護具を使います。","confidence":"medium"}'::jsonb
    ),
    (
        'アルミニウム__酢酸水溶液',
        '酢酸水溶液',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と アルミニウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__鉄',
        '酢酸水溶液',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 鉄 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__銅',
        '酢酸水溶液',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 銅 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__酢酸水溶液',
        '酢酸水溶液',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 亜鉛 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__酢酸水溶液',
        '酢酸水溶液',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と マグネシウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__石灰石',
        '酢酸水溶液',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"二酸化炭素の発生","summary":"酸と炭酸を含む物質が反応し、二酸化炭素が発生します。","equation":"","visualEffect":"bubbles","liquidColor":"#f4f4f4","safetyNote":"酸性水溶液は刺激性があるため、実験では先生の指示に従います。","confidence":"medium"}'::jsonb
    ),
    (
        '酢酸水溶液__二酸化マンガン',
        '酢酸水溶液',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 二酸化マンガン の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__酢酸水溶液',
        '酢酸水溶液',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 過酸化水素水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__酢酸水溶液',
        '酢酸水溶液',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 塩化カルシウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酢酸水溶液__炭酸水',
        '酢酸水溶液',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酢酸水溶液 と 炭酸水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__石灰水',
        '重曹水',
        '石灰水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 石灰水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__二酸化炭素',
        '重曹水',
        '二酸化炭素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 二酸化炭素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__重曹水',
        '重曹水',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 酸素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__水素',
        '重曹水',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 水素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__重曹水',
        '重曹水',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"二酸化炭素の発生","summary":"酸と炭酸を含む物質が反応し、二酸化炭素が発生します。","equation":"","visualEffect":"bubbles","liquidColor":"#f4f4f4","safetyNote":"酸性水溶液は刺激性があるため、実験では先生の指示に従います。","confidence":"medium"}'::jsonb
    ),
    (
        '重曹水__水酸化ナトリウム水溶液',
        '重曹水',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 水酸化ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__重曹水',
        '重曹水',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と アンモニア水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__硫酸銅水溶液',
        '重曹水',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 硫酸銅水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__硝酸銀水溶液',
        '重曹水',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 硝酸銀水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__炭酸ナトリウム水溶液',
        '重曹水',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 炭酸ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__重曹水',
        '重曹水',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 塩化バリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__重曹水',
        '重曹水',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と ヨウ素液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__重曹水',
        '重曹水',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と デンプン水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__重曹水',
        '重曹水',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"アルカリ性の色変化","summary":"フェノールフタレイン液はアルカリ性の水溶液で赤紫色に変化します。","equation":"","visualEffect":"color_change","liquidColor":"#ff5ca8","safetyNote":"水酸化ナトリウム水溶液は皮膚に触れないように注意します。","confidence":"high"}'::jsonb
    ),
    (
        'btb溶液__重曹水',
        '重曹水',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"アルカリ性の色変化","summary":"BTB溶液はアルカリ性の水溶液で青色系に変化します。","equation":"","visualEffect":"color_change","liquidColor":"#4f87ff","safetyNote":"アルカリ性水溶液は目や皮膚に触れないように注意します。","confidence":"medium"}'::jsonb
    ),
    (
        'アルミニウム__重曹水',
        '重曹水',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と アルミニウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__鉄',
        '重曹水',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 鉄 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__銅',
        '重曹水',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 銅 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__重曹水',
        '重曹水',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 亜鉛 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__重曹水',
        '重曹水',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と マグネシウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__石灰石',
        '重曹水',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 石灰石 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__二酸化マンガン',
        '重曹水',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 二酸化マンガン の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__重曹水',
        '重曹水',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 過酸化水素水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__重曹水',
        '重曹水',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 塩化カルシウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '重曹水__炭酸水',
        '重曹水',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"重曹水 と 炭酸水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__二酸化炭素',
        '石灰水',
        '二酸化炭素',
        'local-ai-candidate-seed',
        '{"title":"石灰水の白濁","summary":"二酸化炭素によって炭酸カルシウムができ、石灰水が白くにごります。","equation":"Ca(OH)2 + CO2 -> CaCO3 + H2O","visualEffect":"precipitate","liquidColor":"#ffffff","safetyNote":"石灰水は目や皮膚に触れないように注意します。","confidence":"high"}'::jsonb
    ),
    (
        '酸素__石灰水',
        '石灰水',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 酸素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '水素__石灰水',
        '石灰水',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 水素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__石灰水',
        '石灰水',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 塩酸 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '水酸化ナトリウム水溶液__石灰水',
        '石灰水',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 水酸化ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__石灰水',
        '石灰水',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と アンモニア水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__硫酸銅水溶液',
        '石灰水',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 硫酸銅水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '硝酸銀水溶液__石灰水',
        '石灰水',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 硝酸銀水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__炭酸ナトリウム水溶液',
        '石灰水',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 炭酸ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__石灰水',
        '石灰水',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 塩化バリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__石灰水',
        '石灰水',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と ヨウ素液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__石灰水',
        '石灰水',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と デンプン水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__石灰水',
        '石灰水',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"アルカリ性の色変化","summary":"フェノールフタレイン液はアルカリ性の水溶液で赤紫色に変化します。","equation":"","visualEffect":"color_change","liquidColor":"#ff5ca8","safetyNote":"水酸化ナトリウム水溶液は皮膚に触れないように注意します。","confidence":"high"}'::jsonb
    ),
    (
        'btb溶液__石灰水',
        '石灰水',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"アルカリ性の色変化","summary":"BTB溶液はアルカリ性の水溶液で青色系に変化します。","equation":"","visualEffect":"color_change","liquidColor":"#4f87ff","safetyNote":"アルカリ性水溶液は目や皮膚に触れないように注意します。","confidence":"medium"}'::jsonb
    ),
    (
        'アルミニウム__石灰水',
        '石灰水',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と アルミニウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__鉄',
        '石灰水',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 鉄 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__銅',
        '石灰水',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 銅 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__石灰水',
        '石灰水',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 亜鉛 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__石灰水',
        '石灰水',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と マグネシウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__石灰石',
        '石灰水',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 石灰石 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__二酸化マンガン',
        '石灰水',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 二酸化マンガン の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__石灰水',
        '石灰水',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 過酸化水素水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__石灰水',
        '石灰水',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"石灰水 と 塩化カルシウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰水__炭酸水',
        '石灰水',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"石灰水の白濁","summary":"二酸化炭素によって炭酸カルシウムができ、石灰水が白くにごります。","equation":"Ca(OH)2 + CO2 -> CaCO3 + H2O","visualEffect":"precipitate","liquidColor":"#ffffff","safetyNote":"石灰水は目や皮膚に触れないように注意します。","confidence":"high"}'::jsonb
    ),
    (
        '酸素__二酸化炭素',
        '二酸化炭素',
        '酸素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 酸素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '水素__二酸化炭素',
        '二酸化炭素',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 水素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__二酸化炭素',
        '二酸化炭素',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 塩酸 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '水酸化ナトリウム水溶液__二酸化炭素',
        '二酸化炭素',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 水酸化ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__二酸化炭素',
        '二酸化炭素',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と アンモニア水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '二酸化炭素__硫酸銅水溶液',
        '二酸化炭素',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 硫酸銅水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '硝酸銀水溶液__二酸化炭素',
        '二酸化炭素',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 硝酸銀水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '炭酸ナトリウム水溶液__二酸化炭素',
        '二酸化炭素',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 炭酸ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__二酸化炭素',
        '二酸化炭素',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 塩化バリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__二酸化炭素',
        '二酸化炭素',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と ヨウ素液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__二酸化炭素',
        '二酸化炭素',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と デンプン水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__二酸化炭素',
        '二酸化炭素',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と フェノールフタレイン液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'btb溶液__二酸化炭素',
        '二酸化炭素',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と BTB溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アルミニウム__二酸化炭素',
        '二酸化炭素',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と アルミニウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '鉄__二酸化炭素',
        '二酸化炭素',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 鉄 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '銅__二酸化炭素',
        '二酸化炭素',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 銅 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__二酸化炭素',
        '二酸化炭素',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 亜鉛 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__二酸化炭素',
        '二酸化炭素',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と マグネシウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '石灰石__二酸化炭素',
        '二酸化炭素',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 石灰石 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '二酸化マンガン__二酸化炭素',
        '二酸化炭素',
        '二酸化マンガン',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 二酸化マンガン の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '過酸化水素水__二酸化炭素',
        '二酸化炭素',
        '過酸化水素水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 過酸化水素水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化カルシウム水溶液__二酸化炭素',
        '二酸化炭素',
        '塩化カルシウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 塩化カルシウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '炭酸水__二酸化炭素',
        '二酸化炭素',
        '炭酸水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"二酸化炭素 と 炭酸水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__水素',
        '酸素',
        '水素',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 水素 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩酸__酸素',
        '酸素',
        '塩酸',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 塩酸 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__水酸化ナトリウム水溶液',
        '酸素',
        '水酸化ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 水酸化ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アンモニア水__酸素',
        '酸素',
        'アンモニア水',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と アンモニア水 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__硫酸銅水溶液',
        '酸素',
        '硫酸銅水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 硫酸銅水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__硝酸銀水溶液',
        '酸素',
        '硝酸銀水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 硝酸銀水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__炭酸ナトリウム水溶液',
        '酸素',
        '炭酸ナトリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 炭酸ナトリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '塩化バリウム水溶液__酸素',
        '酸素',
        '塩化バリウム水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 塩化バリウム水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'ヨウ素液__酸素',
        '酸素',
        'ヨウ素液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と ヨウ素液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'デンプン水溶液__酸素',
        '酸素',
        'デンプン水溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と デンプン水溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'フェノールフタレイン液__酸素',
        '酸素',
        'フェノールフタレイン液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と フェノールフタレイン液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'btb溶液__酸素',
        '酸素',
        'BTB溶液',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と BTB溶液 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'アルミニウム__酸素',
        '酸素',
        'アルミニウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と アルミニウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__鉄',
        '酸素',
        '鉄',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 鉄 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__銅',
        '酸素',
        '銅',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 銅 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '亜鉛__酸素',
        '酸素',
        '亜鉛',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 亜鉛 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        'マグネシウム__酸素',
        '酸素',
        'マグネシウム',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と マグネシウム の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    ),
    (
        '酸素__石灰石',
        '酸素',
        '石灰石',
        'local-ai-candidate-seed',
        '{"title":"観察候補","summary":"酸素 と 石灰石 の組み合わせは、フリーモードで観察候補として扱います。","equation":"","visualEffect":"unknown","liquidColor":null,"safetyNote":"実際の実験では、先生の指示と安全管理に従います。","confidence":"low"}'::jsonb
    )
on conflict (reaction_key) do update set
    reactant_a = excluded.reactant_a,
    reactant_b = excluded.reactant_b,
    model = excluded.model,
    response_json = excluded.response_json,
    updated_at = now();
