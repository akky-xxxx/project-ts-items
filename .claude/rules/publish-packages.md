---
paths:
  - "workspaces/packages/**"
---

# 共有パッケージ

`workspaces/packages/<カテゴリ>/<パッケージ名>/` に置き、npm に公開する。設定パッケージ(`configurations/`)と型パッケージ(`types/`)がある。

## 共通

- `src/` を `tsc -p tsconfig.build.json` で `dist/` に出力する(`build` スクリプト。`prepublishOnly` でも実行)。`files` は `dist` のみ
- `exports` が `dist/` を指すため knip が `src/` のエントリを辿れない。各パッケージの `knip.config.mts` の `entry` に `src/` のエントリ(設定パッケージは `src/configurations/index.ts`、型パッケージは `src/index.ts`)を指定している
- release-please が生成する各パッケージの `CHANGELOG.md` は、`@ts-items/configurations/release` の `GENERATED_RELEASE_PATTERNS` で oxfmt(`ignorePatterns`)/ cspell(`ignorePaths`)の対象外にしている。release-please の出力(見出し後の連続した空行、`*` のリストマーカー)は oxfmt の整形結果と一致せず、cspell もコミットの subject 由来の未知語で失敗しうる。いずれも生成物なので手で直さない

## 設定パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)

- 設定の実体を `src/configurations/<name>/` に置き、`src/configurations/index.ts` で集約して `exports` の `"."` から公開する(例: `import { baseConfig } from "@ts-items/oxfmt-config"`、`import { baseConfig, reactConfig } from "@ts-items/oxlint-config"`)
- `exports` は `dist/` の `.js` / `.d.ts` を指す。他の workspace からも `dist/` を参照するため、`src/` を変更したら `bun prepare:build` で再ビルドしないと反映されない
- パッケージ自身の設定ファイルは、自パッケージが提供する設定なら `./src/...` を相対参照し、もう一方のパッケージの設定は `@ts-items/*-config`(= `dist/`)経由で参照する(例: `oxlint-config/oxlint.config.mts` → `./src/configurations/index.ts`、`oxlint-config/oxfmt.config.mts` → `@ts-items/oxfmt-config`)
- `oxlint-config` 自身の lint は `typeAware: true`(`oxlint-tsgolint`)で実行される
- 公開資材の dry run(`dryRun/`、`test` スクリプト): `bun pm pack` した tarball を `<package>/.dry-run/node_modules/` に展開し、利用者と同じ経路(`files` / `exports`)で設定を読み込んで fixture に oxlint / oxfmt を実行する。共通処理は `@ts-items/configurations/dryRun`
  - fixture は `dryRun/<config>/fixtures/` に置く。oxlint-config は `<rule>/{invalid,valid,disabled}.ts` で診断の有無と severity を、oxfmt-config は `<option>/{input,output}/<file>` で整形結果を検証する
  - 明示的に書いた設定値(rules / categories / plugins / オプション)を追加・変更したら、対応する fixture とテストケースも追加・更新する
    - 1つのルールに複数のオプションを明示した場合は、オプションごとに、その値によって結果が変わる入力の fixture を用意する(`<rule>/<条件>/{invalid,valid}.ts` のように条件ごとに分ける。例: oxlint-config の `dryRun/vitestConfig/fixtures/preferExpectAssertions/`)。そのオプションを省略すると結果が変わる場合は、省略時との差が出る fixture にする。既定値と同じ値を明示した場合(省略しても結果が変わらない場合)は、そのオプションだけを、挙動が変わる別の有効な値にしたときに結果が変わる入力の fixture にする(例: `id-length` の `min: 2` なら2文字の識別子。`min` を 3 にすると診断される。真偽値は反対の値にしたときの差で検証する)。ルール単位で invalid / valid が揃っていても、各オプションを検証したことにはならない
  - dry run の helper(`runCommand` / `preparePackedPackage` / `lintFixtures` / `formatFixtures`)自体にも co-location でテストがある。`@ts-items/configurations` のテストは `test` スクリプト(build 不要)で実行する
  - fixture は意図的に違反・未整形なので、各ツールの設定で `DRY_RUN_IGNORE_PATTERNS` を対象外にしている(`tsconfig.json` は `exclude` に直書き)。knip は `.gitignore` 済みの `.dry-run/` を自動で対象外にするため、fixture のパターンだけを持つ `DRY_RUN_FIXTURE_PATTERNS` を使う

## 型パッケージ(`@ts-items/react-types`)

- 型の実体を `src/types/<Name>/<Name>.ts` に置き、`src/index.ts` で集約して `exports` の `"."` から公開する(例: `import type { FcWithChildren } from "@ts-items/react-types"`)
- `exports` は `types` 条件だけで `dist/index.d.ts` を指す。`exports` を読まない `moduleResolution: node`(node10)の利用者のため、トップレベルの `types` にも同じファイルを指定する。`tsconfig.build.json` の `emitDeclarationOnly` で、`dist/` には宣言ファイル(`.d.ts`)だけを出力する
- 自身の lint は `typeAware: true`(`oxlint-tsgolint`)で実行される
- 公開している型が意図せず変わらないことを、co-location の型テスト(`src/types/<Name>/<Name>.test.ts`)で検証する。型を追加・変更したら、型テストも追加・更新する
  - `bun:test` の `expectTypeOf` を使い、期待する型を書き下して `toEqualTypeOf` で比較する。代入できる・できないで足りる性質は `toExtend` / `.not.toExtend` で検証する
  - 型は利用者と同じ経路(パッケージ名での self-reference。`exports` 経由で `dist/` の `.d.ts` に解決される)から import する。そのため `test` スクリプトは build してから型チェックする
  - 不一致は型チェック(`bun check`)だけが検出する。`expectTypeOf` は実行時には何もしないため、`bun test` では失敗しない。`test` スクリプトも `bun test` ではなく型チェックを実行する
  - `@types/react` の版ごとに型チェックする(`test:react-<major>`)。`devDependencies` の `@types/react` が最新の major を、alias の `@types/react-18`(`npm:@types/react@<18.x の版>`)が 18 を提供し、`tsconfig.react-18.json` の `paths` で `react` を alias に割り当てる。対象の版を増やす・変える場合は、alias の devDependency・tsconfig・`test:react-<major>` スクリプト・`.github/workflows/check-react-types.yml` の matrix を揃えて変更する
  - alias は tsconfig の `paths` からしか参照されないため、knip の `ignoreDependencies` に追加している
- `peerDependencies` の `typescript` の下限(5.0)で build 済みの宣言を読み込めることを、`test:typescript-5.0` で検証する。alias の `typescript-5.0`(`npm:typescript@<5.0.x の版>`)の tsc で、`compatibility/typescript-5.0/index.ts`(公開している型をパッケージ名で import するだけのファイル)を `skipLibCheck: false` で型チェックする。`tsconfig.typescript-5.0.json` は TS 5.0 に無いオプションを避けるため、`tsconfig.json` ではなく `@tsconfig/strictest` を直接継承する
  - 下限の TS で読めるかは、`dist/index.d.ts` から読み込まれる宣言すべてについて検証される(`skipLibCheck: false` のため)。公開する型を追加しても、このファイルを変更する必要は無い。下限を変える場合は、alias・tsconfig・ディレクトリ名・`test:typescript-<版>` スクリプト・`check-react-types.yml` の matrix と、`peerDependencies` を揃えて変更する
