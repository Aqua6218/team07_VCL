# VCL サービス起動マニュアル

このマニュアルは、VCL をローカルPCで起動するための手順をまとめたものです。

## 1. 起動するもの

VCL は、フロントエンドとバックエンドの2つを同時に起動します。

| 種類 | 役割 | URL |
| --- | --- | --- |
| フロントエンド | 画面表示、3D実験室、クエスト画面 | `http://localhost:5173` |
| バックエンド | Joy-Con接続、API、Socket.IO、Supabase連携 | `http://localhost:3000` |

通常は、ルートフォルダで `npm run dev` を実行すれば両方まとめて起動できます。

## 2. 事前準備

### 2.1 必要なもの

- Node.js
- npm
- Git
- Bluetooth が使えるPC
- Joy-Con L/R

Node.js が入っているか確認します。

```powershell
node -v
npm -v
```

バージョンが表示されればOKです。

### 2.2 初回だけ依存関係を入れる

プロジェクトのルートで実行します。

```powershell
cd C:\Users\indod\OneDrive\デスクトップ\Team07_VCL
npm install
```

`node_modules` が作成されれば準備完了です。

## 3. 環境変数の設定

Supabase の先生・生徒管理を使う場合は `.env` を用意します。

### 3.1 バックエンド

`backend/.env.example` をコピーして `backend/.env` を作成します。

```powershell
Copy-Item backend\.env.example backend\.env
```

`backend/.env` の中身を設定します。

```env
PORT=3000
SUPABASE_URL=https://hjfofaxwmgaloogqwtes.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VCL_JWT_SECRET=replace-with-long-random-secret
ALLOW_UNVERIFIED_TEACHERS=false
```

注意:

- `SUPABASE_SERVICE_ROLE_KEY` は公開してはいけません。
- `VCL_JWT_SECRET` は長めのランダム文字列にします。
- フリーモードのAI補完を使う場合だけ、追加で `OPENAI_API_KEY` を設定します。

### 3.2 フロントエンド

`frontend/.env.example` をコピーして `frontend/.env` を作成します。

```powershell
Copy-Item frontend\.env.example frontend\.env
```

`frontend/.env` の中身を設定します。

```env
VITE_SUPABASE_URL=https://hjfofaxwmgaloogqwtes.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

ゲスト体験や画面確認だけなら、Supabaseの値が未設定でも一部画面は確認できます。先生ログイン、生徒ログイン、進捗保存を確認する場合は設定が必要です。

## 4. 通常起動

一番使うコマンドです。

```powershell
npm run dev
```

このコマンドで以下が同時に起動します。

```txt
backend  → http://localhost:3000
frontend → http://localhost:5173
```

ブラウザで次を開きます。

```txt
http://localhost:5173
```

## 5. 個別に起動したい場合

### 5.1 フロントエンドだけ起動

```powershell
npm run dev:frontend
```

または:

```powershell
npm run dev --workspace=frontend
```

### 5.2 バックエンドだけ起動

```powershell
npm run dev:backend
```

または:

```powershell
npm run dev --workspace=backend
```

### 5.3 本番に近い起動

バックエンドのみ通常起動する場合:

```powershell
npm run start --workspace=backend
```

フロントエンドをビルドする場合:

```powershell
npm run build --workspace=frontend
```

## 6. Joy-Con 接続手順

1. Windows の Bluetooth 設定を開く。
2. Joy-Con のシンクロボタンを長押しする。
3. `Joy-Con (L)` または `Joy-Con (R)` をペアリングする。
4. VCL を `npm run dev` で起動する。
5. `http://localhost:5173/connection-guide` を開く。
6. Joy-Con を傾けて、画面の角度表示が動くか確認する。

詳しい接続手順は [Joy-Con 接続マニュアル](./joycon_connection_manual.md) を参照します。

## 7. よく使う確認コマンド

### 7.1 バックエンドテスト

```powershell
npm run test --workspace=backend -- --run
```

### 7.2 フロントエンドテスト

```powershell
npm run test --workspace=frontend -- --run
```

### 7.3 フロントエンドビルド確認

```powershell
npm run build --workspace=frontend
```

ビルド確認後に `frontend/dist` が不要なら削除します。

```powershell
Remove-Item -Recurse -Force frontend\dist
```

## 8. 終了方法

起動しているターミナルで次を押します。

```txt
Ctrl + C
```

確認が出たら `Y` を押します。

## 9. よくあるエラー

### 9.1 `localhost:5173` が開けない

フロントエンドが起動していない可能性があります。

```powershell
npm run dev:frontend
```

### 9.2 `サーバーに接続できません` と出る

バックエンドが起動していない可能性があります。

```powershell
npm run dev:backend
```

バックエンドは `http://localhost:3000` で起動します。

### 9.3 Joy-Con が反応しない

- Windows 側で Joy-Con がペアリング済みか確認する。
- `connection-guide` を開いて接続状態を見る。
- バックエンドを再起動する。
- Joy-Con の電池残量を確認する。

### 9.4 Supabase 関連のエラーが出る

`backend/.env` と `frontend/.env` があるか確認します。

特に以下を確認します。

```env
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### 9.5 ポートが使用中と言われる

別のVCLやNode.jsが起動中の可能性があります。

```powershell
Get-NetTCPConnection -LocalPort 3000,5173 -ErrorAction SilentlyContinue
```

不要なプロセスを終了してから、もう一度 `npm run dev` を実行します。

## 10. 発表・デモ時のおすすめ手順

1. Joy-Con を先に Windows に接続する。
2. `npm run dev` で VCL を起動する。
3. `http://localhost:5173/connection-guide` で動作確認する。
4. `http://localhost:5173/select-mode` で実験を選ぶ。
5. 実験画面で薬品投入、Joy-Con操作、反応表示を見せる。
6. トロフィー画面や先生管理画面を見せる。

デモ直前は、ターミナルを閉じずにそのままにしておくと、Joy-ConやAPIのログを確認できます。
