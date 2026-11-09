# コーディング規約(ツールで強制されるもの)

- フォーマット(oxfmt): セミコロンなし、ダブルクォート、printWidth 100、trailing comma all
- import 順(oxfmt sortImports): builtin/external → internal/subpath → parent/sibling/index → type import の順にグループ化し、グループ間は空行
- 型 import は `import type { ... }` を別文で書く(`typescript/consistent-type-imports` の separate-type-imports)
- oxlint は全カテゴリ(correctness / pedantic / perf / restriction / style / suspicious)を error で有効化している。default export はルートの `*.mts` のみ許可、Node 組み込みモジュールは `scripts/**` とルートの `*.mts` のみ許可
- 識別子は2文字以上(`id-length`。`v` や `_` も不可)、ネストした三項演算子は禁止
- 主な閾値(`oxlint-config/src/configurations/baseConfig/rules/eslintRules/eslintRules.ts`): `max-lines` 100 / `max-statements` 10 / `complexity` 5 / `max-depth` 3 / `max-params` 3。他に `no-magic-numbers`、`sort-keys`(asc。空行でグループ分け可)、`curly`(all)も有効
- `bunfig.toml` により依存は exact バージョンで追加され、公開から7日未満のバージョンはインストールされない
