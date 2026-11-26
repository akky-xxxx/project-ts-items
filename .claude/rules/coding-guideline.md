# コーディング規約(ツールで強制されるもの)

- フォーマット(oxfmt): セミコロンなし、ダブルクォート、printWidth 100、trailing comma all
- import 順(oxfmt sortImports): builtin/external → internal/subpath → parent/sibling/index → type import の順にグループ化し、グループ間は空行
- 型 import は `import type { ... }` を別文で書く(`typescript/consistent-type-imports` の separate-type-imports)
- oxlint は全カテゴリ(correctness / pedantic / perf / restriction / style / suspicious)を error で有効化している。default export はルートの `*.mts` のみ許可、Node 組み込みモジュールは `scripts/**` とルートの `*.mts` のみ許可
- 識別子は2文字以上(`id-length`。`v` や `_` も不可)、ネストした三項演算子は禁止
- 主な閾値(`oxlint-config/src/configurations/baseConfig/rules/eslintRules/eslintRules.ts`): `max-lines` 100 / `max-statements` 10 / `complexity` 5 / `max-depth` 3 / `max-params` 3。他に `no-magic-numbers`、`sort-keys`(asc。空行でグループ分け可)、`curly`(all)も有効
- `bunfig.toml` により依存は exact バージョンで追加され、公開から7日未満のバージョンはインストールされない。公開パッケージの `dependencies` は例外として `^` 付きの範囲にする(`bun add` / `bun update` の後に付け直す。`.claude/rules/publish-packages.md` を参照)
- ツールで強制されない規約(関数はアロー関数式で定義する、仮引数で分割代入しない等)は `AGENTS.md` の「レビュー観点」に書かれている。codex はこれを基準にレビューするため、実装後・result 作成前に同節で自己点検する。既存コードに規約と異なる書き方が残っていても、前例として踏襲しない
  - 自己点検の範囲は、自分が追加・変更した箇所ではなく、result でレビュー対象として示す範囲全体とする(未コミットの WIP やブランチを引き継いだ場合は、引き継いだ部分も含む)。入力が有限でリポジトリ内にあるデータ(共有パッケージの設定値など)を処理するロジックは、代表ケースだけでなく、実データ全件を通して実行し、結果を照合する
  - 設計フェーズで設計だけを書いた result を作成する場合も、提出前に同節で設計内容を自己点検する。設計内容が、レビュー観点と同じ対象(依存の版指定など)を文章で扱う場合(規約・ADR への追記で既存の観点を言い換える等)は、観点の趣旨だけでなく、適用範囲を絞る語(「レジストリから取得する」「公開パッケージの」等)まで字句で照合する。同じブランチで先に変更した観点も照合の対象に含める。特に「テスト」の観点では、導入・置き換える処理(既定の setup を自前のものに置き換える等)に回帰テストを残すかを判断し、残さない場合はその理由を `## 設計判断` に書く。スクラッチでの動作確認のために書いたテスト・story は、取り除く前に回帰テストとしてリポジトリに残すかを検討する。表示用のサンプルを置かない(YAGNI)ことは、回帰テストを置かない理由にならない
