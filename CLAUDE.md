# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Bun workspaces による TypeScript モノレポ。ルートの開発ツール設定(lint / format / commitlint 等)と、それを切り出した共有設定パッケージ(`oxfmt-config` / `oxlint-config`)が中心。

- ランタイム / パッケージマネージャ: Bun(Node のバージョンは `.node-version` で固定。oxfmt / oxlint / cspell は `.mts` 設定を Node で読むため Node 22.18 以上が必要)
- TypeScript は `peerDependencies` で指定。ルートの `tsconfig.json` は `@tsconfig/strictest` を継承し、`noEmit` + `moduleResolution: bundler` + `allowImportingTsExtensions`
- テストランナーはまだ導入されていない

## コマンド

ルートで実行する。

```bash
bun install          # 依存インストール(prepare で husky のセットアップと各パッケージの build も走る)
bun lint             # lint:* を並列実行(cspell / knip / oxfmt --check / oxlint / sort-package-json --check / type-check)
bun fix              # fix:* を並列実行(oxfmt / oxlint --fix / sort-package-json)
bun a:lint           # ルート + 全 workspace の lint(a:fix も同様)
bun prepare:build    # 全パッケージの build(bun --filter "@ts-items/*" build)

bun lint:oxlint      # 個別実行も可能(lint:<name> / fix:<name>)
```

- oxlint は `--deny-warnings --report-unused-disable-directives` 付きで実行されるため、warning や不要な disable コメントも失敗扱いになる
- `@ts-items/*` パッケージにはルートと同じ `lint` / `fix` 系スクリプトがある(`bun --filter <name> <script>` で実行)。`a:lint` / `w:lint` / `prepare:build` の対象も `@ts-items/*` のみで、`website` は含まれない
- ルートの `prepare` はスクリプト名の羅列のみにし(`run-s prepare:husky prepare:build`)、実処理は `prepare:<name>` に定義する
- workspace 内で build を個別実行する場合は `bun run build`(`bun build` は Bun 組み込みのバンドラーが起動する)

## 構成

```
configurations/            # リポジトリ固有の設定(1ディレクトリ1エクスポート)。@ts-items/configurations として workspace 化
workspaces/applications/*  # アプリケーション(例: website)
workspaces/packages/*/*    # 共有パッケージ。カテゴリ/パッケージ名 の2階層(例: configurations/oxfmt-config)
```

- ルートの `*.config.mts` は薄いエントリにとどめる。oxfmt / oxlint の共通設定は `@ts-items/oxfmt-config` / `@ts-items/oxlint-config` から import し、このリポジトリ固有の設定(commitlint の `directories`、cspell の `packages.txt`、oxlint の `forConfigurationFiles` など)は `configurations/<tool>/<name>/` に置く
- `configurations/` の設定を workspace から使う場合は `"@ts-items/configurations": "workspace:*"` に依存し、`@ts-items/configurations/<tool>/<name>` で import する(公開対象は `configurations/package.json` の `exports` に追加)
- 設定ファイルは `defineConfig` か `as const satisfies <ConfigType>` で型付けする
- cspell / knip / oxfmt / oxlint は、ルートでは `workspaces/**` を対象外にしている(各 workspace は自身の設定で lint する)

### 共有パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)

- 設定の実体を `src/configurations/<name>/` に置き、`src/configurations/index.ts` で集約して `exports` の `"."` から公開する(例: `import { baseConfig } from "@ts-items/oxfmt-config"`、`import { baseConfig, reactConfig } from "@ts-items/oxlint-config"`)
- `src/` を `tsc -p tsconfig.build.json` で `dist/` にトランスパイルする(`build` スクリプト。`prepublishOnly` でも実行)
  - `exports` は `dist/` の `.js` / `.d.ts` を指し、`files` は `dist` のみ。他の workspace からも `dist/` を参照するため、`src/` を変更したら `bun prepare:build` で再ビルドしないと反映されない
  - `exports` が `dist/` を指すため knip が `src/` のエントリを辿れない。各パッケージの `knip.config.mts` の `entry` に `src/configurations/index.ts` を指定している
- パッケージ自身の設定ファイルは、自パッケージが提供する設定なら `./src/...` を相対参照し、もう一方のパッケージの設定は `@ts-items/*-config`(= `dist/`)経由で参照する(例: `oxlint-config/oxlint.config.mts` → `./src/configurations/index.ts`、`oxlint-config/oxfmt.config.mts` → `@ts-items/oxfmt-config`)
- `oxlint-config` 自身の lint は `typeAware: true`(`oxlint-tsgolint`)で実行される
- cspell が未知語として報告するパッケージ名・ツール名などは `configurations/cspell/packages.txt` に1行1語で追加する
- `extends` など設定ファイル経由でしか参照されない依存(例: `@tsconfig/strictest`)は knip が未使用と判定するため、`knip.config.mts` の `ignoreDependencies` に追加する

## コーディング規約(ツールで強制されるもの)

- フォーマット(oxfmt): セミコロンなし、ダブルクォート、printWidth 100、trailing comma all
- import 順(oxfmt sortImports): builtin/external → internal/subpath → parent/sibling/index → type import の順にグループ化し、グループ間は空行
- 型 import は `import type { ... }` を別文で書く(`typescript/consistent-type-imports` の separate-type-imports)
- oxlint は全カテゴリ(correctness / pedantic / perf / restriction / style / suspicious)を error で有効化している。default export はルートの `*.mts` のみ許可、Node 組み込みモジュールは `configurations/**` とルートの `*.mts` のみ許可
- 識別子は2文字以上(`id-length`。`v` や `_` も不可)、ネストした三項演算子は禁止
- 主な閾値(`oxlint-config/src/configurations/baseConfig/rules/eslintRules/eslintRules.ts`): `max-lines` 100 / `max-statements` 10 / `complexity` 5 / `max-depth` 3 / `max-params` 3。他に `no-magic-numbers`、`sort-keys`(asc。空行でグループ分け可)、`curly`(all)も有効
- `bunfig.toml` により依存は exact バージョンで追加され、公開から7日未満のバージョンはインストールされない

## コミット

- husky の `commit-msg` フックで commitlint が走る
- type は `chore` / `feat` / `fix` / `docs` / `style` / `refactor` / `test` / `revert` のみ
- **scope は必須**。許可される値は `root` / `*` / `packages` と、`package.json` の `workspaces` glob に一致するディレクトリ名(例: `configurations`, `website`, `oxfmt-config`, `oxlint-config`)。workspace を追加すると自動で scope に加わる(`configurations/commitlint/directories/directories.mts`)
