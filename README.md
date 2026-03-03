# Amazing Communications LP

Next.js (App Router) + MUI で構築した LP プロジェクトです。  
GitHub Pages へ静的サイトとして公開します。

## Local Development

```bash
npm run dev
```

## Build (Static Export)

```bash
npm run build
```

GitHub Pages 向け（`.nojekyll` 作成込み）のビルド:

```bash
npm run build:pages
```

## フォルダ構成概要

- `src/app`: App Router のページ/レイアウト
- `src/data`: 静的データ
- `src/theme.ts`: MUI テーマ設定
- `public/`: 画像などの静的アセット
- `.github/workflows/`: CI/CD（GitHub Actions）
- `out/`: 静的エクスポート出力（Pages 配信対象）
- `.next/`: Next.js のローカル生成物
- `node_modules/`: 依存ライブラリ
- `next.config.ts`: Next.js 設定
- `package.json`: 依存関係と npm scripts

## Deploy Overview

- `main` へ push
- GitHub Actions が実行
- 静的ファイル `out/` を `gh-pages` ブランチへデプロイ
- GitHub Pages が `gh-pages` を配信

公開 URL:

- `https://aandcorg.github.io/AmazingCommunicationsLP/`

## Configuration Source of Truth

運用詳細は以下を参照してください（README では重複管理しません）。

- ワークフロー定義: `.github/workflows/deploy.yml`
- ビルドスクリプト: `package.json` (`build`, `build:pages`)
- Pages 用パス設定: `.env.production`, `next.config.ts`
