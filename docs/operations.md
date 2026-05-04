# 運用ガイド

このファイルに、日々の更新手順を追記していきます。

## 1. 販売・展開情報の更新（ビルド不要）

トップページに表示している販売・展開情報は、以下のテキストを編集すると反映されます。

- `public/content/sales-info/brand.txt`

記載形式:

- `日付|内容文|URL(任意)`
- 例: `2026-03-09|「ハッタリ商会」をボードゲームマーケット出展|https://gamemarket.jp/access`
- URLを省略した場合はリンクなしで表示されます。
- 表示は日付の新しい順で最新5件のみです（6件目以降はファイルに残っていても非表示）。

## 2. 問い合わせフォーム（Googleフォーム）設定

問い合わせ表示設定は以下のJSONで管理しています。

- `public/content/contact/config.json`

設定項目:

- `googleFormUrl`: 別タブで開くフォームURL
- `googleFormEmbedUrl`: 埋め込みURL（`?embedded=true`）

## 3. ゲームマーケット購入予約フォーム（イベント期間限定）

予約フォームは既存の問い合わせフォームとは別に、以下のJSONで管理しています。

- `public/content/game-market-reservation/config.json`

設定項目:

- `eventName`: メール件名やフォーム見出しで使うイベント名
- `mailTo`: LP内フォームからメール作成画面を開く送信先
- `googleFormUrl`: Googleフォームを使う場合の別タブURL（任意）
- `googleFormEmbedUrl`: Googleフォームを使う場合の埋め込みURL（任意、`?embedded=true`）

Googleフォームの埋め込みURLを設定すると、LP内の入力フォームではなくGoogleフォームを表示します。
ゲームマーケット終了後に削除する場合は、`src/app/page.tsx` の `GameMarketReservationSection` の import と呼び出し、`src/components/GameMarketReservationSection.tsx`、この設定フォルダを削除します。

## 4. 画像差し替え

商品画像は以下のフォルダに置き、`src/data/products.ts` のパスを更新します。

- `public/products/<slug>/...`

## 5. ブラウザ確認方法

### 推奨: 開発サーバーで確認

```powershell
npm run dev
```

- `http://localhost:3000/` で確認できます。
- 見た目確認はこの方法が最も確実です。

### 静的出力（out）を確認

`out/index.html` は存在しますが、`file://` で直接開くと、絶対パス参照やfetch制約で正しく表示できない場合があります。
静的確認する場合はHTTPサーバー経由で確認してください。

例:

```powershell
python -m http.server 8080 --directory out
```

その後 `http://localhost:8080/` にアクセスします。

## 6. 本番向けビルド

```powershell
npm run build:pages
```

- `out/` がGitHub Pages配信用成果物です。
- `.env.production` の `NEXT_PUBLIC_BASE_PATH` を前提に出力されます。
