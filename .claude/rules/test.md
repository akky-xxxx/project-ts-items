---
paths:
  - "**/*.stories.{mts,ts,tsx}"
  - "**/*.test.{mts,ts,tsx}"
---

# テスト

テストを書く・直すときのガイドライン。

## describe / it の文言

- トップレベルの `describe` のタイトルは、テスト対象の名前(関数・コンポーネント・型・定数・スキーマ・entry の名前など)だけにする(例: `describe("createOutputDirectory", ...)`、`describe("FcWithChildren", ...)`、または対象の関数を直接渡す `describe(getApiMode, ...)`)。日本語の説明は付けない
  - 1つの対象の検証を観点ごとに複数のファイルへ分ける場合(dry run の entry 等)も、トップレベルには共通の対象の名前を置き、検証の観点はネストした `describe` に書く
- ネストした `describe` と `it` は、振る舞いを日本語で書く

## 期待値

- 期待値に、実装と同じ定数を import して使わない。cookie 名・キー名など、値の変更が利用者に影響するものはリテラルで固定する(期待値にも定数を使うと、定数を誤って変更してもテストが通り、変更に気付けない)
- 実装側は定数を参照して、書き込み・読み込みなど複数箇所の一致を担保する。テスト側は実際の値を固定する、という役割分担にする

## 修正前のコードでの失敗の確認

- 不具合修正の回帰テストが修正前のコードで失敗することを、追跡対象のファイルを一時的に書き戻して確かめる場合は、修正後のファイルをリポジトリ外(スクラッチディレクトリ)へ退避してから書き戻す。テストの実行後に退避ファイルから戻したら、戻した各ファイルを退避ファイルと `diff` で直接比較し、一致することを確認してから次の作業に進む。`git diff` は比較元が index・HEAD のため、修正が未ステージ・未コミットの場合は、復元に失敗して修正前のままでも差分が出ず、確認に使えない
- 退避・復元・削除には、`/bin/cp -f` / `/bin/rm -f` のようにエイリアスを経由しない形を使う。shell はユーザーの profile で初期化されるため、`cp` / `rm` が対話モード(`-i`)のエイリアスになっていることがある。非対話の実行では上書き・削除が拒否されても後続の処理が進み、ファイルが修正前のまま残る

## Storybook

- テスト用のストーリー(名前が `TestFor` で始まるストーリー)は、表示用のストーリーを置く `X.stories.tsx` と分け、同じディレクトリの `X.test.stories.tsx`(stories が `.ts` の場合は `X.test.stories.ts`)に置く
  - `X.stories.test.tsx` にはしない。Storybook の既定の CSF インデクサは `stories.tsx` / `story.tsx` などで終わるファイルしか読み込まず、`.storybook/main.ts` の `stories` に追加してもインデックス時にエラーになる(storybook 10.6.5 で確認)
  - meta は `X.stories.tsx` の default export を import して spread し、`tags: ["!dev", "!autodocs"]` を付ける。サイドバーと autodocs には出さず、vitest(`@storybook/addon-vitest`)でだけ実行する
  - 表示対象の無いもの(Storybook 用の setup・helper など)をテストする場合は、表示用の `X.stories.tsx` を作らず、`X.test.stories.tsx` の meta を直接書く。`component` には website の `src/tests/DummyForStorybook` を使い、`tags: ["!dev", "!autodocs"]`・ファイル名・`TestFor` で始まる story 名の規約は同じく適用する(例: `src/tests/setupMswWorkerForStorybook/setupMswWorkerForStorybook.test.stories.tsx`)
  - 表示用のストーリー(`En` / `Ja` 等)の設定を前提にする場合は、`X.stories.tsx` から import して spread する
