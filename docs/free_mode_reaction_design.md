# フリーモード反応DB・AI補完設計

## 目的

フリーモードで選ばれた物質の組み合わせについて、既知の教材反応はDBから返し、DBにない組み合わせだけAIで補完する。

すべての組み合わせを事前登録すると数が増えすぎるため、以下の二段構えにする。

- 既存クエストや教材として確定している反応は `free_reaction_rules` に保存する。
- 未登録の組み合わせはOpenAI APIで短い説明と演出種別を生成し、`free_reaction_ai_cache` に保存する。
- APIやAI補完が使えない場合は、フロントエンド側の周期表カテゴリ推定で安全側の観察結果を返す。

## 保存先

Supabase に追加SQLとして [free_mode_reactions.sql](../supabase/free_mode_reactions.sql) を用意する。

現時点では既存の `schema.sql` に直接混ぜず、フリーモード用追加スキーマとして分けて管理する。

AI補完キャッシュの初期候補として、[free_mode_ai_seed.sql](../supabase/free_mode_ai_seed.sql) に200件分の `free_reaction_ai_cache` 登録SQLを用意する。
生成内容の確認用に [free_mode_ai_seed.preview.json](../supabase/free_mode_ai_seed.preview.json) も出力する。

周期表元素どうしの組み合わせは、[freeModePeriodicReactionData.json](../frontend/src/data/freeModePeriodicReactionData.json) に118×118の全順序付きペア13,924件を保持する。各データは観察名、説明、演出種別、生成物状態、固体形状、色、必要条件、安全補足、信頼度、検証状態を持つ。

DB側の `reaction_key` は物質名の順番を無視する設計であるため、`H + O` と `O + H` を別レコードとして保存すると衝突する。フロントエンドの全件JSONでは、試験管側とフラスコ側を区別するため `H->O` 形式の `pair_key` を使う。

科学的正確性を優先するため、全件データでは生成物を無理に作らない。全13,924件に `verificationStatus` を付与し、生成物まで確定できる代表反応だけ `verificationStatus: verified_representative` として、生成物名、反応式、3D演出を持たせる。条件依存で単一生成物を断定できないペアは `verificationStatus: verified_condition_dependent_no_single_product` などで分類し、観察文だけを表示して、結晶・沈殿・泡などの反応演出は出さない。

生成物確定データは、順序付きでは1,168通り、逆順を1つにまとめると584組である。生成物確定として扱うには、生成物名、反応式、演出種別、必要条件、安全補足がそろっていることをテストで検証する。

## テーブル

### free_reaction_rules

教材として確定している反応を保存する。

| カラム | 内容 |
| --- | --- |
| `reaction_key` | 物質名2つを正規化して並べた検索キー |
| `reactant_a` / `reactant_b` | 反応物名 |
| `title` | 画面に出す短い反応名 |
| `summary` | 中学生向けの説明 |
| `equation` | 反応式 |
| `visual_effect` | `no_reaction`、`color_change`、`bubbles`、`precipitate`、`dissolve`、`unknown` などの演出種別 |
| `liquid_color` | 色変化に使う色 |
| `visual_detail` | 生成物名、生成物状態、固体形状、固体色、気体名、泡色、必要条件などの3D表示詳細 |
| `safety_note` | 安全面や教材上の補足 |

### free_reaction_ai_cache

DB未登録の組み合わせをAIで補完した結果を保存する。

| カラム | 内容 |
| --- | --- |
| `reaction_key` | 物質名2つを正規化して並べた検索キー |
| `reactant_a` / `reactant_b` | ユーザーが選んだ物質名 |
| `model` | 生成に使ったOpenAIモデル名 |
| `response_json` | AIが返した反応説明、演出指定、`visualDetail` |

## API

### POST `/api/free-mode/reactions/evaluate`

フリーモードで試験管とフラスコに入った物質名を受け取り、反応候補を返す。

リクエスト:

```json
{
  "testTubeChemical": "塩酸",
  "flaskChemical": "石灰石"
}
```

レスポンス:

```json
{
  "source": "db",
  "reactionKey": "塩酸__石灰石",
  "reaction": {
    "title": "二酸化炭素の発生",
    "summary": "石灰石に含まれる炭酸カルシウムが塩酸と反応し、二酸化炭素が発生します。",
    "equation": "CaCO3 + 2HCl -> CaCl2 + H2O + CO2",
    "visualEffect": "bubbles",
    "liquidColor": "#f4f4f4",
    "visualDetail": {
      "productName": "二酸化炭素",
      "productState": "gas",
      "solidForm": "none",
      "solidColor": null,
      "gasName": "二酸化炭素",
      "bubbleColor": "#ffffff",
      "colorChange": null,
      "displayHint": "二酸化炭素が泡として発生する様子を表示",
      "requiredCondition": "room_temp_mix"
    },
    "safetyNote": "塩酸は刺激性があるため、実験では保護具と換気が必要です。",
    "confidence": "high"
  }
}
```

## 判定順

1. フロントエンドから `POST /api/free-mode/reactions/evaluate` を呼び、APIを優先する。
2. API側では `free_reaction_rules` を `reaction_key` で検索する。
3. 見つからない場合、登録済み物質名から再正規化して照合する。
4. それでもない場合、`free_reaction_ai_cache` を検索する。
5. キャッシュもない場合、OpenAI APIで補完する。
6. 生成結果を `free_reaction_ai_cache` に保存する。
7. `OPENAI_API_KEY` がない場合などAPI側が低信頼のフォールバックを返したときは、フロントエンド側のローカル判定で補強する。
8. API通信自体に失敗した場合も、フロントエンド側のローカル判定へ切り替える。
9. APIが低信頼の `unknown` または目立つ変化なし相当の結果を返した場合は、DB確定結果でない限り、周期表ローカル推定の結果を優先して画面に表示する。

## フロントエンドのローカル判定

APIが利用できない場合でも発表や授業中に画面が止まらないよう、フロントエンドには以下の順でローカル判定を持たせる。

1. 発表で使いやすい既知反応辞書を確認する。
2. 118元素の周期表データをもとに、元素名・元素記号・英語名を同じ元素として解決する。
3. 元素カテゴリ、金属/非金属、希ガス、ハロゲン、酸素、水素、硫黄族などの大まかな性質から観察モデルを推定する。
4. 周期表元素どうしは `freeModePeriodicReactionData.json` の順序付き全件データから、118×118の13,924通りを返す。
5. 周期表以外の学校実験向け薬品は、`freeModeReactionSeed.json` と酸・塩基・炭酸塩などの簡易ルールで補う。
6. どれにも当てはまらない場合は「目立つ変化なし」として安全側に表示する。

フロントエンドのテストでは、周期表118元素の全13,924通りについて、全件データからタイトル、説明、演出種別、`visualDetail.requiredCondition`、`visualDetail.displayHint`、`verificationStatus` が必ず返ることを検証する。また、条件依存ペアでは生成物や結晶を断定しないことも検証する。

全件データは [generate-free-mode-periodic-data.mjs](../scripts/generate-free-mode-periodic-data.mjs) で生成する。周期表データや判定テンプレートを変更した場合は、以下を実行してJSONを再生成する。

```bash
node scripts/generate-free-mode-periodic-data.mjs
```

このローカル判定は教材用の簡略表示であり、正確な反応条件や実験手順の代替ではない。正確な説明は、DB登録済み反応またはOpenAI API補完キャッシュを優先する。

## 初期seed生成

[generate-free-mode-ai-seed.mjs](../scripts/generate-free-mode-ai-seed.mjs) で、フリーモードに使う物質の組み合わせから200件のAIキャッシュ候補を生成する。

通常はOpenAI APIで候補を作成する。

```bash
node scripts/generate-free-mode-ai-seed.mjs
```

OpenAI APIキーが未設定または無効な場合は、ローカルの安全側ルールで候補を作成できる。

```bash
node scripts/generate-free-mode-ai-seed.mjs --local-fallback
```

`--local-fallback` で作る候補は教材化前のたたき台であり、正式に採用する反応は内容確認後に `free_reaction_rules` へ移す。

## OpenAI設定

サーバー側の環境変数で設定する。
開発時は `backend/.env` に置く。

| 変数 | 内容 |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI APIキー |
| `OPENAI_FREE_REACTION_MODEL` | フリーモード補完用モデル。未設定時は `gpt-5.4-nano` |

APIキーはバックエンドだけで使い、フロントエンドには出さない。

## 画面連携

フリーモードでは、ユーザーが試験管からフラスコへ物質を注ぎ、混ぜ始めたタイミングでAPIを呼ぶ。

返ってきた `visualEffect` と `visualDetail` に応じて、3D演出を反映する。

| visualEffect | 画面演出 |
| --- | --- |
| `bubbles` | `visualDetail.gasName` と `bubbleColor` を参考に泡を出す |
| `precipitate` | `solidForm` が `crystal` なら角ばった結晶、`powder` なら粉状沈殿、`flake` なら薄片を表示する |
| `color_change` | `liquidColor` または `visualDetail.colorChange` に近い色へ変える |
| `dissolve` | 溶ける粒子と泡を表示し、液体色も反映する |
| `no_reaction` | 目立つ反応は出さず、観察文だけを表示する |
| `unknown` | 目立つ反応は出さない |

`visualDetail.requiredCondition` に `heat`、`catalyst`、`high_pressure`、`electrolysis`、`unsafe` などが入る場合は、常温で混ぜるだけでは実際の反応条件を満たさない可能性がある。その場合もVCLでは教材用の観察モデルとして扱い、危険な実験手順は出さない。

## 注意

AI補完は教材としての候補説明であり、実験手順を現実に実施するための指示ではない。危険性がある、または確信が低い組み合わせは `unknown` として扱う。
