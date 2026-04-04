# Dashboard Design Spec
**Date:** 2026-04-05
**Topic:** Next.js + Tailwind シンプルダッシュボード

## 目的

生成AIの挙動確認を主旨とした、シンプルなダッシュボード画面を1枚持つNext.jsプロジェクトを構築する。

## 技術スタック

- **フレームワーク:** Next.js 14（App Router）
- **言語:** TypeScript
- **スタイリング:** Tailwind CSS
- **パッケージ管理:** npm

## アーキテクチャ

App RouterのServer Componentでローカルのメトリクスデータを読み込み、カードコンポーネントへ渡す。クライアントJSは不使用。

## ディレクトリ構成

```
sample_coding/
├── data/
│   └── metrics.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── MetricCard.tsx
│   └── types/
│       └── metric.ts
├── tailwind.config.ts
└── tsconfig.json
```

## データ構造

`data/metrics.json`:

```json
[
  { "id": 1, "label": "総売上", "value": "¥1,240,000", "change": "+12%" },
  { "id": 2, "label": "ユーザー数", "value": "3,842", "change": "+5%" },
  { "id": 3, "label": "完了タスク", "value": "128", "change": "-3%" },
  { "id": 4, "label": "新規注文", "value": "74", "change": "+8%" }
]
```

## コンポーネント設計

### `src/types/metric.ts`
`Metric`型を定義（`id`, `label`, `value`, `change`）。

### `src/components/MetricCard.tsx`
- propsとして`Metric`を受け取る
- `change`が`+`始まり → 緑色表示、`-`始まり → 赤色表示
- Tailwindでカードスタイリング

### `src/app/page.tsx`（Server Component）
- `fs`と`path`でサーバー側から`data/metrics.json`を読み込む
- 4枚のカードを2×2グリッドで表示

### `src/app/layout.tsx`
- グローバルレイアウト、Tailwindのベーススタイル適用

## 表示仕様

- 画面タイトル: "ダッシュボード"
- カードは4枚を2×2グリッド（レスポンシブ対応: モバイルは1列）
- 各カード: ラベル、数値（大きめのフォント）、変化率（色付き）

## エラーハンドリング

JSONの読み込み失敗時はビルドエラーとして扱う（静的ビルド前提のため、ランタイムエラーハンドリングは不要）。

## テスト

本プロジェクトはAI挙動確認用のサンプルのため、テストコードは含まない。
