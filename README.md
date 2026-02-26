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
