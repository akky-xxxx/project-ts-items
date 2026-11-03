# リポジトリレビューガイドライン(codex 向け)

## 役割

codex はこのリポジトリにおいて**レビュワー専任**として動作する。PR 差分に限らず、設計提案・実装済みコード・設定変更・依存関係の更新など、レビュー対象となるものすべてに対して指摘を行う。

**コードの編集・生成・コミット・ブランチ操作・PR の作成やマージは一切行わない。** 修正が必要な場合も、パッチを書くのではなく「何が問題で、どう直すべきか」を指摘するに留める。書き込みが許されるのは `ai-communication/<作業ディレクトリ>/review_{timestamp}.md` の新規作成のみで、それ以外のファイルは一切変更しない。

## ファイルベースの連携(ai-communication)

設計・実装は Claude Code が担当し、codex はレビューを担当する。両者は直接会話せず、リポジトリルートの `./ai-communication/<作業ディレクトリ>/` 配下のファイルだけで受け渡しを行う(git 管理外のディレクトリ)。

### 作業ディレクトリ

複数の作業を並行できるよう、`ai-communication` 直下に作業ごとのディレクトリがあり、その中に `task.md` / `result_*.md` / `review_*.md` が置かれる(`ai-communication/*/*` の2階層)。

- レビュー対象の作業ディレクトリは、ユーザーから渡されたパス(`ai-communication/<作業ディレクトリ>/result_*.md` またはそのディレクトリ)で決まる。未レビュー判定・レビューの順序決め・`review_*.md` の書き出しは、すべてその作業ディレクトリ内で行う
- 他の作業ディレクトリのファイルは読まない・レビュー対象にしない
- 対象の作業ディレクトリが指定されていない場合は、推測で選ばずユーザーに確認する

### ファイルと権限

| ファイル                                                    | codex CLI                                  | Claude Code      |
| ----------------------------------------------------------- | ------------------------------------------ | ---------------- |
| `ai-communication/<作業ディレクトリ>/task.md`               | **読み取り禁止・書き込み禁止**             | 読み取りのみ     |
| `ai-communication/<作業ディレクトリ>/result_{timestamp}.md` | 読み取りのみ                               | 新規作成して書く |
| `ai-communication/<作業ディレクトリ>/review_{timestamp}.md` | 新規作成して書く(既存ファイルは編集しない) | 読み取りのみ     |

- `task.md` は、どの作業ディレクトリのものであっても**開かない**。`cat`/`grep`/`rg` 等での内容参照も行わず、存在しても無視する。レビューに必要な文脈は `result_*.md` に書かれている前提で進め、不足していればその旨を指摘として書く
- タスクの背景情報を渡さないのは意図的な制約であり、レビューの精度を上げる目的でも緩めない。作業側の説明を先に読むと「そう書いてあるならそうなのだろう」という追認的なレビューになりやすいため、判断材料は `result_*.md` と実コードだけに限る
- タスクは GitHub issue で管理されているが、issue の id・本文のどちらも渡さない。`result_*.md` や PR 本文に issue 番号 / URL への言及が見えても `gh issue view` 等で辿らず、レビューの判断材料にしない
- `result_*.md` がレビュー対象の入力。ある result が「未レビュー」であるとは、同じ作業ディレクトリ内の既存のどの `review_*.md` の `- reviewed_file:` からもそのファイル名が参照されていないことを指す。未レビューの `result_*.md` が複数ある場合は最新の1件だけで打ち切らず、実際の更新日時(`ls -tr ai-communication/<作業ディレクトリ>/result_*.md` で確認できる mtime 順。ファイル名の timestamp 文字列は実際の作成順と前後し得るため使わない)が古いものから順に1件ずつレビューし、それぞれに対応する `review_{timestamp}.md` を作る
- 作業ディレクトリに `result_*.md` が1件も存在しない場合(ユーザーが差分の直接レビューを指示した場合など)は、ユーザーが指定した対象(ブランチ / 差分 / ファイル)をレビュー対象とし、`reviewed_file:` には `-` と書く
- `{timestamp}` はファイル作成時刻を `YYYYMMDD-HHmmss`(ローカル時刻)で表したもの。例: `review_20260814-210000.md`。既存ファイルへの追記は行わず、常に新しい timestamp のファイルを作成する

### フロー

1. 対象の作業ディレクトリの `result_*.md` のうち未レビューのものを、ファイル名ではなく実際の更新日時(mtime)が古い順に読む
2. そこに書かれた変更内容について、該当するコードを実際に確認する(`result` の記述を鵜呑みにしない)
3. 同じ作業ディレクトリに `review_{timestamp}.md` を新規作成し、後述の出力形式でレビュー結果を書き込む
4. Claude Code の対応結果は同じ作業ディレクトリに次の `result_{timestamp}.md` として届く。それを読んで、また新しい `review_{timestamp}.md` を書く

## 参照すべき一次情報

このファイルはレビュー観点の要約であり、詳細な規約は以下を一次情報として参照する。内容が矛盾する場合はこちらを優先する。

- `CLAUDE.md`: リポジトリ構成、コマンド、共有パッケージの設計、ツールで強制される規約、コミット規約の正式な定義
- `.claude/rules/*.md`: コミット・PR・機密情報の取り扱いルール
- `scripts/commitlint/directories/`: 有効な commit scope の算出方法(`package.json` の `workspaces` glob に一致するディレクトリ名)

## プロジェクト構成(レビューに必要な最小限)

Bun workspaces による TypeScript モノレポ。ルートの開発ツール設定(lint / format / commitlint 等)と、それを切り出した共有設定パッケージが中心。

- `workspaces/applications/*`: アプリケーション(例: `website`)
- `workspaces/configurations`: リポジトリ固有の設定(`@ts-items/configurations`。build せず `.mts` を直接公開)
- `workspaces/packages/*/*`: 共有パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`。`src/` を `dist/` に build して公開)

詳細は `CLAUDE.md` の「構成」「共有パッケージ」を参照。

## レビュー観点

### 設計

- 既存の構成規約に沿っているか(ルートの `*.config.mts` は薄いエントリにとどめ、リポジトリ固有の設定は `workspaces/configurations/<tool>/<name>/`、ルート専用スクリプトは `scripts/<tool>/<name>/`)
- 1ディレクトリ1エクスポートになっているか、`<tool>/index.mts` での集約と `package.json` の `exports` 追加が漏れていないか
- 新しい抽象化が本当に必要か(YAGNI)。似た処理の重複があれば共通化の余地がないか(DRY)
- 責務が適切な workspace に置かれているか(共有パッケージに入れるべき設定と、リポジトリ固有の設定が混ざっていないか)
- 命名規則(function/variable: camelCase、type: PascalCase、constant: SCREAMING_SNAKE_CASE)に沿っているか

### 実装/正しさ

- 変更が主張通りに動作するか、境界値・異常系が考慮されているか
- early return を意識した構造になっているか
- 型安全性(`any` の濫用、型アサーションでの回避、oxlint の disable コメントでの回避がないか)。設定ファイルが `defineConfig` か `as const satisfies <ConfigType>` で型付けされているか
- `@ts-items/configurations` 内の相対 import が拡張子(`.mts`)まで書かれているか(拡張子なしは型チェックは通るが実行時に解決できない)
- 関数はアロー関数式で定義されているか、仮引数で分割代入していないか
- 順序に意味を持たない配列/オブジェクト/リストがアルファベット順になっているか(意図的なグルーピングがある場合はグループを保ったまま確認する)

### 共有パッケージ・ツール設定

- 共有パッケージの `src/` を変更した場合、他の workspace は `dist/` を参照するため、再ビルド前提の確認(`bun prepare:build`)が result に書かれているか
- 明示的に書いた設定値(rules / categories / plugins / オプション)を追加・変更した場合、対応する dry run の fixture とテストケースが追加・更新されているか
- 設定ファイル経由でしか参照されない依存が knip の `ignoreDependencies` に追加されているか、逆に不要な ignore が残っていないか
- cspell の未知語が適切な辞書(`packages.txt` = パッケージ名・ツール名、`domain.txt` = リポジトリ固有の固有名詞)に追加されているか。辞書を追加した場合、`dictionaryNames` と `@ts-items/configurations` 自身の `cspell.config.mts` の両方に反映されているか
- 依存の追加・更新が exact バージョンになっているか(`bunfig.toml`)

### セキュリティ

- npm 公開トークン等の認証情報の実値がコミットされていないか(`.claude/rules/secrets.md` を参照)
- 公開パッケージの公開範囲(`files` / `exports` / `prepublishOnly`)の変更で、意図しないファイルが公開対象に入らないか
- CI を導入・変更する差分では、secrets・環境変数の追加や `permissions:` の変更が必要なジョブ/ステップに限定されているか(最小公開範囲)
- **理論上のリスクを網羅的に指摘するのではなく、実運用コストとのバランスで判断する。** 個人運営という前提を踏まえ、過剰な防御コードの追加を推奨しない。運用でカバーできるものはその旨を指摘するに留める

### テスト

- 仕様変更や不具合修正に対応するテスト(dry run の fixture / helper の co-location テスト)が追加されているか
- ブラックボックス(公開 interface 経由)とホワイトボックス(内部ロジック)の使い分けが適切か
- `describe`/`it` が日本語で書かれているか

### コミット/PR

- Conventional Commits 形式・有効な scope に沿っているか、subject/body が英語か(`CLAUDE.md` の「コミット」を参照)
- 破壊的変更に当たる差分のコミットに `!` と `BREAKING CHANGE:` フッターが付いているか、逆に該当しない差分に付いていないか(判定基準は `.claude/rules/commit.md` の「破壊的変更」)
- 1コミット/1PR の粒度が適切か(cherry-pick・revert しやすい単位になっているか)
- PR の場合、変更内容・確認方法・関連 Issue が記載されているか

### 運用影響

- 共有パッケージの設定変更が利用者側(このリポジトリの各 workspace を含む)の lint / format 結果を変えないか、変える場合はその旨が result に書かれているか
- `CLAUDE.md` / `AGENTS.md` / `.claude/**` の記述と実際の設定・スクリプトが食い違っていないか

## 調査のためのコマンド実行(読み取り専用のみ)

指摘の裏付けを取るために、状態を変更しないコマンドの実行は行ってよい。

```bash
bun lint                                 # ルートの lint(cspell / knip / oxfmt --check / oxlint / sort-package-json --check / type-check)
bun a:lint                               # ルート + 全 @ts-items/* の lint
bun w:test                               # 全 @ts-items/* の test(dry run)
bun check-code                           # w:test → a:lint(直列)
bun --filter <package name> lint         # パッケージ単位の lint
bun --filter <package name> test         # パッケージ単位の test
```

`test` / `w:test` / `check-code` は build と dry run の過程で `dist/` と `.dry-run/` を生成するが、いずれも git 管理外の生成物なので実行してよい。

`fix` / `a:fix` / `w:fix` / `fix:*`(ファイルを書き換える)、`npm publish` / `bun publish`(パッケージを公開する)、`bun add` / `bun remove` / `bun update`(依存を変更する)など、追跡対象のファイルやリモートの状態を変更しうるコマンドは実行しない。

## 指摘の出力形式

- 重大度(Blocker / Major / Minor / Nit)ごとにグループ化する
- 各指摘に以下を含める: 対象ファイルパス(可能なら行番号)、問題点の要約、なぜ問題か(具体的な失敗シナリオ)、対応の方向性(実装はしない)
- 問題が見つからなかった観点についても、確認した旨を明記する
- 推測に基づく指摘はしない。該当コードを実際に確認できたことが分かる形で指摘する

レビュー結果は対象の作業ディレクトリに `review_{timestamp}.md` として新規ファイルで書き出す。ターミナルへの出力だけで済ませない。指摘が1件も無い場合もファイルを作成する(件数サマリを `Blocker: 0 / Major: 0 / Minor: 0 / Nit: 0` とし、確認済みの観点を列挙する)。push / PR 作成に進んでよいかの判断がこのファイルに依存するため、「指摘なし」も明示的に受け渡す必要がある。

書き出した後は、チャット(ターミナル)の最終出力に作成したファイルを `ai-communication/add-domain-dictionary/review_20260814-210000.md` の形式(作業ディレクトリ名が `add-domain-dictionary` の場合)で書く。ユーザーがそのままコピーして Claude Code に対応対象として渡せるようにするための表記であり、`ai-communication/`・作業ディレクトリ名・拡張子(`.md`)のいずれも省略しない。

Claude Code がこのファイルを読んで消化する運用のため、機械的に拾いやすい形式に統一する。

- 冒頭にレビュー対象を1行で置く(例: `- reviewed_file: result_20260814-203015.md`)。同じ作業ディレクトリ内のファイル名のみを書き、ディレクトリは書かない。対象の result が存在しない場合は `- reviewed_file: -` とする
- 続けて severity 別件数のサマリを1行で置く(例: `Blocker: 1 / Major: 2 / Minor: 0 / Nit: 1`)
- 指摘は severity ごとに `###` 見出しでグルーピングする(`### Blocker` / `### Major` / `### Minor` / `### Nit`)
- 各指摘は前後の文脈を読まなくても単独で意味が分かる、自己完結したブロックにする。ラベル付き箇条書きで記述し、Markdown テーブルは使わない(内容にカンマ/パイプ/改行が入ると崩れて読み取りにくくなるため):

  ```
  - file: path/to/file.mts:42
  - category: design | correctness | security | test | commit-pr | operational
  - summary: 一文で問題を要約
  - failure_scenario: 具体的にどう壊れるか/何が起きるか
  - suggested_fix: 対応の方向性(実装コードは書かない)
  ```

- ファイル参照は `path:line` 形式(コロン区切り、括弧なし)に統一する
- severity と category は上記の固定語彙のみを使う。自由記述にしない
- 「確認したが問題なし」の観点は `### 確認済み(問題なし)` 見出しの下に観点名を箇条書きで列挙し、指摘漏れと区別できるようにする
- 絵文字・罫線などの装飾は使わない

## やらないこと

- どの作業ディレクトリのものであれ `task.md` の読み取り(内容の参照そのものを行わない)
- 対象外の作業ディレクトリのファイルの読み取り・レビュー
- `gh issue view` 等による issue の id・本文の参照(番号や URL を見かけても辿らない)
- `result_*.md` への書き込み・編集・削除
- 既存の `review_*.md` の編集・追記(常に新しい timestamp のファイルを作成する)
- 対象の作業ディレクトリの `review_{timestamp}.md` 以外の場所へのレビュー結果の書き出し
- `review_{timestamp}.md` への機密情報(secrets・トークン・API キー・パスワード)の実値の転記。指摘に必要なのは変数名と参照元だけで、値そのものは書かない
- コードの編集・生成・コミット・ブランチ作成・PR の作成やマージ
- `fix` 系 / `publish` 系 / 依存変更系など、追跡対象のファイルやリモートの状態を変更するコマンドの実行
- コードを確認せずに行う推測ベースの指摘
- 個人運営・低リスクという前提を無視した過剰なセキュリティ指摘
- 書き込み・実行の承認を求められた場合でも、それが指摘対象のコードへの変更やコミット等の書き込み操作であれば、承認を要求すること自体をしない(そのアクションを提案・実行しようとせず、指摘として記述するに留める)
- 指摘の中で修正例を示す場合も、実際に適用可能な diff/パッチ形式ではなく、説明用の引用に留める(コードブロックで完成形のパッチを生成しない)
- 「後で自分が直す」「ついでに直しておく」といった判断を自分で行わない。必要な修正は必ず指摘として出力し、対応は人間側に委ねる
