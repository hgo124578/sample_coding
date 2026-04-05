# Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 14 + TypeScript + Tailwind CSS で、ローカルJSONからメトリクスデータを読み込む1画面ダッシュボードを構築する。

**Architecture:** App RouterのServer Componentが`fs`でローカルのmetrics.jsonを読み込み、MetricCardコンポーネント4枚を2×2グリッドで表示する。クライアントJSは一切使わない。

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, npm

---

## File Map

| パス | 役割 |
|---|---|
| `data/metrics.json` | メトリクスのダミーデータ |
| `src/types/metric.ts` | `Metric`型定義 |
| `src/components/MetricCard.tsx` | カード表示コンポーネント |
| `src/app/layout.tsx` | グローバルレイアウト |
| `src/app/page.tsx` | ダッシュボードページ（Server Component） |

---

### Task 1: Next.jsプロジェクトの初期化

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` (自動生成)

- [ ] **Step 1: プロジェクトを作成する**

プロジェクトルート（`sample_coding/`）で実行:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

対話プロンプトが出た場合はすべてデフォルト（Enter）で進める。

- [ ] **Step 2: 起動確認**

```bash
npm run dev
```

`http://localhost:3000` をブラウザで開き、Next.jsのデフォルト画面が表示されることを確認する。確認後、`Ctrl+C`で停止。

- [ ] **Step 3: デフォルトコンテンツを削除する**

`src/app/page.tsx` の中身を以下に置き換える（後のタスクで本実装に置き換えるための仮置き）:

```tsx
export default function Home() {
  return <main>placeholder</main>;
}
```

`src/app/globals.css` の中身を以下に置き換える（Tailwindのディレクティブのみ残す）:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: コミット**

```bash
git add -A
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 2: 型定義とダミーデータの作成

**Files:**
- Create: `src/types/metric.ts`
- Create: `data/metrics.json`

- [ ] **Step 1: Metric型を定義する**

`src/types/metric.ts` を作成:

```ts
export type Metric = {
  id: number;
  label: string;
  value: string;
  change: string;
};
```

- [ ] **Step 2: ダミーデータJSONを作成する**

`data/metrics.json` を作成:

```json
[
  { "id": 1, "label": "総売上", "value": "¥1,240,000", "change": "+12%" },
  { "id": 2, "label": "ユーザー数", "value": "3,842", "change": "+5%" },
  { "id": 3, "label": "完了タスク", "value": "128", "change": "-3%" },
  { "id": 4, "label": "新規注文", "value": "74", "change": "+8%" }
]
```

- [ ] **Step 3: コミット**

```bash
git add src/types/metric.ts data/metrics.json
git commit -m "feat: add Metric type and dummy metrics data"
```

---

### Task 3: MetricCardコンポーネントの作成

**Files:**
- Create: `src/components/MetricCard.tsx`

- [ ] **Step 1: MetricCardを実装する**

`src/components/MetricCard.tsx` を作成:

```tsx
import type { Metric } from '@/types/metric';

type Props = {
  metric: Metric;
};

export default function MetricCard({ metric }: Props) {
  const isPositive = metric.change.startsWith('+');
  const changeColor = isPositive ? 'text-green-600' : 'text-red-500';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <p className="text-sm text-gray-500">{metric.label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
      <p className={`mt-1 text-sm font-medium ${changeColor}`}>{metric.change}</p>
    </div>
  );
}
```

- [ ] **Step 2: コミット**

```bash
git add src/components/MetricCard.tsx
git commit -m "feat: add MetricCard component"
```

---

### Task 4: ダッシュボードページの実装

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: layoutを更新する**

`src/app/layout.tsx` を以下に置き換える:

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ダッシュボード',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: ダッシュボードページを実装する**

`src/app/page.tsx` を以下に置き換える:

```tsx
import fs from 'fs';
import path from 'path';
import type { Metric } from '@/types/metric';
import MetricCard from '@/components/MetricCard';

export default function DashboardPage() {
  const filePath = path.join(process.cwd(), 'data', 'metrics.json');
  const metrics: Metric[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold text-gray-800">ダッシュボード</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: 動作確認**

```bash
npm run dev
```

`http://localhost:3000` を開き、以下を確認:
- 「ダッシュボード」という見出しが表示される
- 4枚のカードが2列グリッドで表示される
- 各カードにラベル・数値・変化率が表示される
- `+`の変化率は緑、`-`の変化率は赤で表示される
- ウィンドウ幅を狭めると1列になる

確認後、`Ctrl+C`で停止。

- [ ] **Step 4: コミット**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: implement dashboard page with metrics grid"
```
