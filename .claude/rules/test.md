---
paths:
  - "**/*.stories.{mts,ts,tsx}"
  - "**/*.test.{mts,ts,tsx}"
---

# テスト

テストを書く・直すときのガイドライン。

## 期待値

- 期待値に、実装と同じ定数を import して使わない。cookie 名・キー名など、値の変更が利用者に影響するものはリテラルで固定する(期待値にも定数を使うと、定数を誤って変更してもテストが通り、変更に気付けない)
- 実装側は定数を参照して、書き込み・読み込みなど複数箇所の一致を担保する。テスト側は実際の値を固定する、という役割分担にする

## Storybook

- テスト用のストーリー(名前が `TestFor` で始まるストーリー)は、表示用のストーリーを置く `X.stories.tsx` と分け、同じディレクトリの `X.test.stories.tsx`(stories が `.ts` の場合は `X.test.stories.ts`)に置く
  - `X.stories.test.tsx` にはしない。Storybook の既定の CSF インデクサは `stories.tsx` / `story.tsx` などで終わるファイルしか読み込まず、`.storybook/main.ts` の `stories` に追加してもインデックス時にエラーになる(storybook 10.6.5 で確認)
  - meta は `X.stories.tsx` の default export を import して spread し、`tags: ["!dev", "!autodocs"]` を付ける。サイドバーと autodocs には出さず、vitest(`@storybook/addon-vitest`)でだけ実行する
  - 表示用のストーリー(`En` / `Ja` 等)の設定を前提にする場合は、`X.stories.tsx` から import して spread する
