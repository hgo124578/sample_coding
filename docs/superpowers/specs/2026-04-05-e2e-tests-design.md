# Playwright E2E Tests Design Spec
**Date:** 2026-04-05
**Topic:** Playwright e2e テスト追加

## 目的

ダッシュボード画面の表示内容（タイトル・カード・テキスト・色分け）を自動検証するe2eテストを追加する。

## 技術スタック

- **テストフレームワーク:** @playwright/test
- **対象サーバー:** next start（本番ビルド）
- **ブラウザ:** Chromium のみ

## アーキテクチャ

`playwright.config.ts` の `webServer` 設定により、`npm run test:e2e` 実行時に Playwright が自動で `npm run start` を起動・終了する。テスト前に `npm run build` が必要。

## ディレクトリ構成

```
sample_coding/
├── e2e/
│   └── dashboard.spec.ts
├── playwright.config.ts
└── package.json          # scripts に test:e2e を追加
```

## 設定ファイル

### `playwright.config.ts`

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### `package.json` scripts 追加

```json
"test:e2e": "playwright test"
```

## テスト仕様

### `e2e/dashboard.spec.ts`

| # | テスト名 | 検証内容 |
|---|---|---|
| 1 | ページタイトル | `<title>` が「ダッシュボード」 |
| 2 | 見出し | `<h1>` テキストが「ダッシュボード」 |
| 3 | カード枚数 | カード要素が4件存在する |
| 4 | カードラベル | 「総売上」「ユーザー数」「完了タスク」「新規注文」がそれぞれ表示される |
| 5 | 正の変化率の色 | +の変化率要素が `text-green-600` クラスを持つ |
| 6 | 負の変化率の色 | -の変化率要素が `text-red-500` クラスを持つ |

## 実行方法

```bash
# 初回のみ: ブラウザバイナリをインストール
npx playwright install chromium

# テスト実行（ビルドが最新の場合）
npm run test:e2e

# ビルドからテストまで一括
npm run build && npm run test:e2e
```

## 注意事項

- `next start` はビルド済みの `.next/` ディレクトリを必要とする。テスト実行前に `npm run build` が完了していること。
- `reuseExistingServer: !process.env.CI` により、ローカル開発時にすでにサーバーが起動していれば再利用する。CI環境では常に新規起動する。
