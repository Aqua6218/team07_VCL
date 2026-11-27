# バーチャル・ケミストリー・ラボ（VCL）

小学校高学年〜中学生向けの学習用 Web アプリです。Nintendo Switch の Joy-Con を疑似実験器具として扱い、化学実験をバーチャルに体験できます。

> このリポジトリは、HAL大阪でのチーム制作作品を、チームの合意を得て公開したコピーです。
> オリジナル： https://github.com/indo40722/team07_VCL

## 概要

- **クエストモード**：実験手順をクエスト形式で学べるモード。実験の定義（表示・手順・反応演出）はクエスト定義から制御されます
- **フリーモード**：試薬を自由に組み合わせて反応を試せるモード。既知の反応は DB から、未登録の組み合わせはサーバー側で補完します
- **学習進捗の管理**：学習進捗やトロフィー履歴を保存。先生用アカウント、生徒 ID の発行、クラス別の進捗管理に対応しています

詳しい仕様は [要件定義書](docs/requirements.md) と [画面仕様書](docs/screen_spec.md) を参照してください。

## 技術スタック

| 領域 | 使用技術 |
| --- | --- |
| フロントエンド | Vite、Three.js、Socket.IO Client、Supabase |
| バックエンド | Node.js、Express、Socket.IO、node-hid（Joy-Con 接続） |
| DB・認証 | Supabase（PostgreSQL） |
| テスト | Vitest、Playwright（E2E） |

## リポジトリ構成

```
backend/    バックエンド（Express + Socket.IO、Joy-Con 接続処理）
frontend/   フロントエンド（Vite + Three.js）
supabase/   Supabase のスキーマ・設定
docs/       要件定義書・画面仕様書・DB 設計書・各種マニュアル
e2e/        E2E テスト（Playwright）
scripts/    補助スクリプト
```

## ドキュメント

- [要件定義書](docs/requirements.md)
- [画面仕様書](docs/screen_spec.md)
- [DB 設計書](docs/database_design.md)
- [Joy-Con 接続マニュアル](docs/joycon_connection_manual.md)
- [サービス起動マニュアル](docs/service_startup_manual.md)
- [クエストマニュアル](docs/quest_manual.md)

## 開発

前提：Node.js。Supabase の接続情報など、環境変数の設定が必要です（起動手順の詳細は [サービス起動マニュアル](docs/service_startup_manual.md)）。

```bash
# 依存関係のインストール（npm workspaces）
npm install

# フロントエンドとバックエンドを同時起動
npm run dev

# テスト
npm run test:frontend
npm run test:backend
npm run test:e2e
```

## クレジット

HAL大阪のチーム制作として開発しました。本リポジトリはポートフォリオ公開用に、チームの合意を得て複製・公開したものです。
