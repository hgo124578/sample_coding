# コーディング規約

コードレビュー（人間・AI）における規約準拠チェックのための規約。

## 1. ファイル・ディレクトリ構造

- コンポーネントは `src/components/` に置く
- ページは `src/app/` 以下に Next.js の規約通りに配置する
- 型定義は `src/types/` に置く
- 1ファイル1コンポーネントを原則とする

## 2. 命名規則

- コンポーネントファイル名はPascalCase（例: `MetricCard.tsx`）
- それ以外のファイル名はcamelCase（例: `metric.ts`）
- Reactコンポーネントの関数名はPascalCase
- 変数・関数名はcamelCase
- 型名はPascalCase

## 3. TypeScript の使い方

- strict モードを有効にする（`tsconfig.json` で `strict: true`）
- 型定義には `interface` ではなく `type` を使う
- Props の型名は `Props` とする
- `any` の使用を禁止する

## 4. テスト

- E2Eテストは Playwright を使う
- テストファイルは `e2e/` ディレクトリに置く
- テスト関数名は「何をテストするか」を日本語または英語で明確に記述する
