# Game Search App

React Native + Expo のゲーム検索アプリです。RAWG API を使ってゲームを検索し、一覧と詳細画面を表示します。

## 概要
- 日本語UI
- ゲーム検索
- キーワード検索結果の一覧表示
- 詳細画面表示
- React Query によるキャッシュと再取得

## 必要条件
- Node.js 18 以上
- npm
- Expo CLI
- RAWG API キー

## セットアップ
1. リポジトリをクローン
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. `.env.example` を `.env` にコピーして、RAWG API キーを設定
   ```bash
   cp .env.example .env
   ```
4. `.env` を編集して `EXPO_PUBLIC_RAWG_API_KEY` にキーを入れる
5. アプリを起動
   ```bash
   npm start
   ```

## RAWG API キーの取得
1. https://rawg.io にアクセス
2. アカウントを作成またはログイン
3. APIキーを発行
4. `.env` の `EXPO_PUBLIC_RAWG_API_KEY` に設定

## 実行コマンド
```bash
npm start
npm run android
npm run ios
npm run web
```

## 画面構成
- 検索画面
- ゲーム詳細画面

## 補足
- API キーは GitHub に公開しないでください
- `.env` は `.gitignore` で除外済みです
