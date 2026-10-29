# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Bun workspaces による TypeScript モノレポ。現時点ではルートの開発ツール設定(lint / format / commitlint 等)が中心で、各 workspace はまだ雛形(`bun init` 直後の状態)のみ。

- ランタイム / パッケージマネージャ: Bun(Node のバージョンは `.node-version` で固定)
- TypeScript は `peerDependencies` で指定。ルートの `tsconfig.json` は `@tsconfig/strictest` を継承し、`noEmit` + `moduleResolution: bundler` + `allowImportingTsExtensions`(workspace 側の tsconfig はまだ `bun init` の雛形のまま)
- テストランナーはまだ導入されていない

## コマンド

ルートで実行する。

```bash
bun install          # 依存インストール
bun lint             # lint:* を並列実行(cspell / knip / oxfmt --check / oxlint / sort-package-json --check / type-check)
bun fix              # fix:* を並列実行(oxfmt / oxlint --fix / sort-package-json)

bun lint:oxlint      # 個別実行も可能(lint:<name> / fix:<name>)
```

- oxlint は `--deny-warnings --report-unused-disable-directives` 付きで実行されるため、warning や不要な disable コメントも失敗扱いになる
- 各 workspace の `package.json` にも `lint:sort-package-json` / `fix:sort-package-json` / `typecheck` がある(ルートの `lint:type-check` と異なり workspace 側は `typecheck` のまま。`bun --filter <name> <script>` で実行)

## 構成

```
configurations/            # 設定の実体(1ディレクトリ1エクスポート)。@ts-items/configurations として workspace 化
workspaces/applications/*  # アプリケーション(例: website)
workspaces/packages/*/*    # 共有パッケージ。カテゴリ/パッケージ名 の2階層(例: configurations/oxfmt-config)
```

- ルートの `*.config.mts` は薄いエントリにとどめ、中身は `configurations/<tool>/<name>/<name>.mts` に切り出す(例: `oxfmt.config.mts` → `configurations/oxfmt/tsItemConfig/tsItemConfig.mts`)
- 各 workspace から `configurations/` の設定を使う場合は `"@ts-items/configurations": "workspace:*"` に依存し、`@ts-items/configurations/<tool>` で import する(公開対象は `configurations/package.json` の `exports` に追加)。ルートの `*.config.mts` は相対パスで参照する
- 設定ファイルは `defineConfig` か `as const satisfies <ConfigType>` で型付けする
- 共有パッケージは `@ts-items/*` スコープ。`workspaces/packages/configurations/` 配下の `oxfmt-config` / `oxlint-config` は、ルートの oxfmt / oxlint 設定をパッケージとして切り出す先として用意されている(現状は未実装)
- cspell / knip / oxfmt は `workspaces/**` を対象外にしている(ルート設定のみが対象)
- cspell が未知語として報告するパッケージ名・ツール名などは `configurations/cspell/packages.txt` に1行1語で追加する
- `extends` など設定ファイル経由でしか参照されない依存(例: `@tsconfig/strictest`)は knip が未使用と判定するため、`knip.config.mts` の `ignoreDependencies` に追加する

## コーディング規約(ツールで強制されるもの)

- フォーマット(oxfmt): セミコロンなし、ダブルクォート、printWidth 100、trailing comma all
- import 順(oxfmt sortImports): builtin/external → internal/subpath → parent/sibling/index → type import の順にグループ化し、グループ間は空行
- 型 import は `import type { ... }` を別文で書く(`typescript/consistent-type-imports` の separate-type-imports)
- oxlint は全カテゴリ(correctness / pedantic / perf / restriction / style / suspicious)を error で有効化している。default export はルートの `*.mts` のみ許可、Node 組み込みモジュールは `configurations/**` とルートの `*.mts` のみ許可
- 識別子は2文字以上(`v` と `_` は例外)、ネストした三項演算子は禁止
- `bunfig.toml` により依存は exact バージョンで追加され、公開から7日未満のバージョンはインストールされない

## コミット

- husky の `commit-msg` フックで commitlint が走る
- type は `chore` / `feat` / `fix` / `docs` / `style` / `refactor` / `test` / `revert` のみ
- **scope は必須**。許可される値は `root` / `*` / `packages` と、`package.json` の `workspaces` glob に一致するディレクトリ名(例: `configurations`, `website`, `oxfmt-config`, `oxlint-config`)。workspace を追加すると自動で scope に加わる(`configurations/commitlint/directories/directories.mts`)
