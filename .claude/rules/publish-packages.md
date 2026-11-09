---
paths:
  - "workspaces/packages/**"
---

# 共有パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)

- 設定の実体を `src/configurations/<name>/` に置き、`src/configurations/index.ts` で集約して `exports` の `"."` から公開する(例: `import { baseConfig } from "@ts-items/oxfmt-config"`、`import { baseConfig, reactConfig } from "@ts-items/oxlint-config"`)
- `src/` を `tsc -p tsconfig.build.json` で `dist/` にトランスパイルする(`build` スクリプト。`prepublishOnly` でも実行)
  - `exports` は `dist/` の `.js` / `.d.ts` を指し、`files` は `dist` のみ。他の workspace からも `dist/` を参照するため、`src/` を変更したら `bun prepare:build` で再ビルドしないと反映されない
  - `exports` が `dist/` を指すため knip が `src/` のエントリを辿れない。各パッケージの `knip.config.mts` の `entry` に `src/configurations/index.ts` を指定している
- パッケージ自身の設定ファイルは、自パッケージが提供する設定なら `./src/...` を相対参照し、もう一方のパッケージの設定は `@ts-items/*-config`(= `dist/`)経由で参照する(例: `oxlint-config/oxlint.config.mts` → `./src/configurations/index.ts`、`oxlint-config/oxfmt.config.mts` → `@ts-items/oxfmt-config`)
- `oxlint-config` 自身の lint は `typeAware: true`(`oxlint-tsgolint`)で実行される
- 公開資材の dry run(`dryRun/`、`test` スクリプト): `bun pm pack` した tarball を `<package>/.dry-run/node_modules/` に展開し、利用者と同じ経路(`files` / `exports`)で設定を読み込んで fixture に oxlint / oxfmt を実行する。共通処理は `@ts-items/configurations/dryRun`
  - fixture は `dryRun/<config>/fixtures/` に置く。oxlint-config は `<rule>/{invalid,valid,disabled}.ts` で診断の有無と severity を、oxfmt-config は `<option>/{input,output}/<file>` で整形結果を検証する
  - 明示的に書いた設定値(rules / categories / plugins / オプション)を追加・変更したら、対応する fixture とテストケースも追加・更新する
  - dry run の helper(`runCommand` / `preparePackedPackage` / `lintFixtures` / `formatFixtures`)自体にも co-location でテストがある。`@ts-items/configurations` のテストは `test` スクリプト(build 不要)で実行する
  - fixture は意図的に違反・未整形なので、各ツールの設定で `DRY_RUN_IGNORE_PATTERNS` を対象外にしている(`tsconfig.json` は `exclude` に直書き)。knip は `.gitignore` 済みの `.dry-run/` を自動で対象外にするため、fixture のパターンだけを持つ `DRY_RUN_FIXTURE_PATTERNS` を使う
- release-please が生成する各パッケージの `CHANGELOG.md` は、`@ts-items/configurations/release` の `GENERATED_RELEASE_PATTERNS` で oxfmt(`ignorePatterns`)/ cspell(`ignorePaths`)の対象外にしている。release-please の出力(見出し後の連続した空行、`*` のリストマーカー)は oxfmt の整形結果と一致せず、cspell もコミットの subject 由来の未知語で失敗しうる。いずれも生成物なので手で直さない
