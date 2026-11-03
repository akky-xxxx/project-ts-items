# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Bun workspaces による TypeScript モノレポ。ルートの開発ツール設定(lint / format / commitlint 等)と、それを切り出した共有設定パッケージ(`oxfmt-config` / `oxlint-config`)が中心。

- ランタイム / パッケージマネージャ: Bun(Node のバージョンは `.node-version` で固定。oxfmt / oxlint / cspell は `.mts` 設定を Node で読むため Node 22.18 以上が必要)
- TypeScript は `devDependencies` で指定。ルートの `tsconfig.json` は `@tsconfig/strictest` を継承し、`noEmit` + `moduleResolution: bundler` + `allowImportingTsExtensions`
- テストランナーは `bun test`。共有パッケージの dry run と、dry run の helper 自体のテストがある(いずれも後述)

## コマンド

ルートで実行する。

```bash
bun install          # 依存インストール(prepare で husky のセットアップと各パッケージの build も走る)
bun lint             # lint:* を並列実行(cspell / knip / oxfmt --check / oxlint / sort-package-json --check / type-check)
bun fix              # fix:* を並列実行(oxfmt / oxlint --fix / sort-package-json)
bun a:lint           # ルート + 全 workspace の lint(a:fix も同様)
bun prepare:build    # 全パッケージの build(bun --filter "@ts-items/*" build)
bun w:test           # 全 `@ts-items/*` の test(共有パッケージは build してから dry run を実行)
bun check-code       # w:test → a:lint の順に直列実行(push 前に通す品質ゲート)

bun lint:oxlint      # 個別実行も可能(lint:<name> / fix:<name>)
```

- oxlint は `--deny-warnings --report-unused-disable-directives` 付きで実行されるため、warning や不要な disable コメントも失敗扱いになる
- `@ts-items/*` パッケージにはルートと同じ `lint` / `fix` 系スクリプトがある(`bun --filter <name> <script>` で実行)。`a:lint` / `w:lint` / `prepare:build` の対象も `@ts-items/*` のみで、`website` は含まれない
- ルートの `prepare` はスクリプト名の羅列のみにし(`run-s prepare:husky prepare:build`)、実処理は `prepare:<name>` に定義する
- `check-code` は `w:test` → `a:lint` の順に直列で実行する。共有パッケージの `test` は `dist/` を再ビルドし、lint は設定ファイル経由でその `dist/` を読み込むため、並列にすると書き換え中の `dist/` を読んで失敗しうる。test を先にすることで、lint は最新の `src/` から build した `dist/` を読む。共有パッケージ単位の `check-code` も同じ理由で `test` → `lint` の順に直列で実行する(`lint:type-check` の対象に自パッケージの `dist/` が含まれるため)
- workspace 内で build を個別実行する場合は `bun run build`(`bun build` は Bun 組み込みのバンドラーが起動する)

## 構成

```
scripts/<tool>/<name>/      # ルートの設定からのみ使うスクリプト(例: commitlint の directories)
workspaces/applications/*   # アプリケーション(例: website)
workspaces/configurations   # リポジトリ固有の設定(1ディレクトリ1エクスポート)。@ts-items/configurations として workspace 化
workspaces/packages/*/*     # 共有パッケージ。カテゴリ/パッケージ名 の2階層(例: configurations/oxfmt-config)
```

- ルートの `*.config.mts` は薄いエントリにとどめる。oxfmt / oxlint の共通設定は `@ts-items/oxfmt-config` / `@ts-items/oxlint-config` から import し、このリポジトリ固有の設定(cspell の `packages.txt`、oxlint の `forConfigurationFiles` など)は `workspaces/configurations/<tool>/<name>/` に置く。ルートの設定からのみ使うスクリプトは `scripts/<tool>/<name>/` に置く
- `workspaces/configurations/` の設定を workspace から使う場合は `"@ts-items/configurations": "workspace:*"` に依存し、`@ts-items/configurations/<tool>` で import する(`<tool>/index.mts` で集約し、公開対象は `workspaces/configurations/package.json` の `exports` に追加)
- `@ts-items/configurations` は build せず `.mts` を直接 `exports` で公開する。自身の lint 設定を持つ
  - cspell などが設定ファイル経由で Node から直接読み込むため、相対 import は拡張子(`.mts`)まで書く(拡張子なしは型チェックは通るが実行時に解決できない)
- cspell の辞書は、ルート / workspace の `cspell.config.mts` で `@ts-items/configurations/cspell` の `getDictionarySetting(["domain", "packages"])` のように、必要な辞書名を指定して spread して使う。辞書を追加する場合は `workspaces/configurations/cspell/<name>.txt` を置き、`dictionaryDefinitions.mts` の `dictionaryNames` に名前を足す。辞書の path は `import.meta.resolve` で絶対 URL にしているため、参照する側の位置に依存しない
  - `@ts-items/configurations` 自身の `cspell.config.mts` は `getDictionarySetting` を使わず辞書を直接定義している。辞書ファイル自体も自身の cspell の検査対象になるため、辞書を追加したらここにも足す
- 設定ファイルは `defineConfig` か `as const satisfies <ConfigType>` で型付けする
- cspell / knip / oxfmt / oxlint / 型チェック(`tsconfig.json` の `exclude`)は、ルートでは `workspaces/**` を対象外にしている(各 workspace は自身の設定で lint する)。パターンは `./` や `**/` を付けず `workspaces/**` の形で書く(oxfmt は `./workspaces/**` を解釈せず、何も除外されない)
- ルートの cspell は `cspell.config.mts` の `enableGlobDot` / `useGitignore` で、dot ディレクトリ・ファイル(`.claude/**`・`.github/**`・`.husky/**` 等)も検査する(cspell の glob は既定で dot ディレクトリを辿らない)。`.gitignore` 済みのものは対象外になるが、次は `ignorePaths` で明示的に除外している
  - `.git/**`: `.gitignore` に書かれていないため、`useGitignore` では除外されない
  - `.claude/settings.local.json`: global gitignore で無視されるローカル専用ファイル。cspell は global gitignore を読まず、CI には存在しないため、検査するとローカルと CI で結果がずれる
  - `.gitignore`: 外部テンプレート由来のファイル名パターンが中心で、文章ではないため

### 共有パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)

- 設定の実体を `src/configurations/<name>/` に置き、`src/configurations/index.ts` で集約して `exports` の `"."` から公開する(例: `import { baseConfig } from "@ts-items/oxfmt-config"`、`import { baseConfig, reactConfig } from "@ts-items/oxlint-config"`)
- `src/` を `tsc -p tsconfig.build.json` で `dist/` にトランスパイルする(`build` スクリプト。`prepublishOnly` でも実行)
  - `exports` は `dist/` の `.js` / `.d.ts` を指し、`files` は `dist` のみ。他の workspace からも `dist/` を参照するため、`src/` を変更したら `bun prepare:build` で再ビルドしないと反映されない
  - `exports` が `dist/` を指すため knip が `src/` のエントリを辿れない。各パッケージの `knip.config.mts` の `entry` に `src/configurations/index.ts` を指定している
- パッケージ自身の設定ファイルは、自パッケージが提供する設定なら `./src/...` を相対参照し、もう一方のパッケージの設定は `@ts-items/*-config`(= `dist/`)経由で参照する(例: `oxlint-config/oxlint.config.mts` → `./src/configurations/index.ts`、`oxlint-config/oxfmt.config.mts` → `@ts-items/oxfmt-config`)
- `oxlint-config` 自身の lint は `typeAware: true`(`oxlint-tsgolint`)で実行される
- cspell が未知語として報告する語は、種類に応じて `workspaces/configurations/cspell/` の辞書に1行1語で追加する
  - `packages.txt`: パッケージ名・ツール名
  - `domain.txt`: GitHub のオーナー名など、このリポジトリ固有の固有名詞
  - `commands.txt`: ツールのコマンド・オプション・組み込み関数名(例: `bunx`、git の `--oneline`、jq の `ltrimstr`)
- 公開資材の dry run(`dryRun/`、`test` スクリプト): `bun pm pack` した tarball を `<package>/.dry-run/node_modules/` に展開し、利用者と同じ経路(`files` / `exports`)で設定を読み込んで fixture に oxlint / oxfmt を実行する。共通処理は `@ts-items/configurations/dryRun`
  - fixture は `dryRun/<config>/fixtures/` に置く。oxlint-config は `<rule>/{invalid,valid,disabled}.ts` で診断の有無と severity を、oxfmt-config は `<option>/{input,output}/<file>` で整形結果を検証する
  - 明示的に書いた設定値(rules / categories / plugins / オプション)を追加・変更したら、対応する fixture とテストケースも追加・更新する
  - dry run の helper(`runCommand` / `preparePackedPackage` / `lintFixtures` / `formatFixtures`)自体にも co-location でテストがある。`@ts-items/configurations` のテストは `test` スクリプト(build 不要)で実行する
  - fixture は意図的に違反・未整形なので、各ツールの設定で `DRY_RUN_IGNORE_PATTERNS` を対象外にしている(`tsconfig.json` は `exclude` に直書き)。knip は `.gitignore` 済みの `.dry-run/` を自動で対象外にするため、fixture のパターンだけを持つ `DRY_RUN_FIXTURE_PATTERNS` を使う
- release-please が生成する各パッケージの `CHANGELOG.md` は、`@ts-items/configurations/release` の `GENERATED_RELEASE_PATTERNS` で oxfmt(`ignorePatterns`)/ cspell(`ignorePaths`)の対象外にしている。release-please の出力(見出し後の連続した空行、`*` のリストマーカー)は oxfmt の整形結果と一致せず、cspell もコミットの subject 由来の未知語で失敗しうる。いずれも生成物なので手で直さない
- knip は `tsconfig.json` の `extends` で参照する依存(例: `@tsconfig/strictest`)を使用中と判定するため、`ignoreDependencies` には追加しない。設定ファイル経由でしか参照されず knip が未使用と判定する依存が出た場合に限り、`knip.config.mts` の `ignoreDependencies` に追加する

## コーディング規約(ツールで強制されるもの)

- フォーマット(oxfmt): セミコロンなし、ダブルクォート、printWidth 100、trailing comma all
- import 順(oxfmt sortImports): builtin/external → internal/subpath → parent/sibling/index → type import の順にグループ化し、グループ間は空行
- 型 import は `import type { ... }` を別文で書く(`typescript/consistent-type-imports` の separate-type-imports)
- oxlint は全カテゴリ(correctness / pedantic / perf / restriction / style / suspicious)を error で有効化している。default export はルートの `*.mts` のみ許可、Node 組み込みモジュールは `scripts/**` とルートの `*.mts` のみ許可
- 識別子は2文字以上(`id-length`。`v` や `_` も不可)、ネストした三項演算子は禁止
- 主な閾値(`oxlint-config/src/configurations/baseConfig/rules/eslintRules/eslintRules.ts`): `max-lines` 100 / `max-statements` 10 / `complexity` 5 / `max-depth` 3 / `max-params` 3。他に `no-magic-numbers`、`sort-keys`(asc。空行でグループ分け可)、`curly`(all)も有効
- `bunfig.toml` により依存は exact バージョンで追加され、公開から7日未満のバージョンはインストールされない

## リリース

- release-please(manifest モード)で `workspaces/packages/*/*` のバージョン更新・CHANGELOG・タグ(`<component>-v<version>`)・GitHub Release を行う。設定は `release-please-config.json` / `.release-please-manifest.json`、workflow は `.github/workflows/release.yml`
- main への push で Release PR が作成・更新され、マージすると main にタグと GitHub Release が作られ、`bun pm pack` した tarball を `npm publish`(Trusted Publishing。provenance も付与される)する。prerelease は `-` 以降の識別子(例: `alpha`)を dist-tag にする
- develop → main は merge commit で取り込む(squash すると個々のコミットと `bootstrap-sha` が main の履歴から失われ、バージョン判定と CHANGELOG が崩れる)。同じ理由で、`Release-As` フッター付きのコミットを含むブランチも squash しない
- パッケージの path に触れたコミットだけがそのパッケージの対象になる。ただし、ファイルに触れない空コミット(`git commit --allow-empty`)は全パッケージの対象になる。バージョンを明示する場合は、対象パッケージ配下のファイルに触れるコミット(全パッケージの版を揃える場合は空コミット)に `Release-As: <version>` フッターを付ける
- 正式版で運用している(`versioning` は既定で、`prerelease` / `prerelease-type` は使わない)。既定の versioning は版を上げても prerelease の識別子(`-alpha.0` など)を引き継ぐため、`Release-As` に prerelease の版を指定しない
- パッケージを追加したら `release-please-config.json` の `packages` と `.release-please-manifest.json` に追加する。あわせて、生成される `CHANGELOG.md` を lint 対象から外すため、そのパッケージの `oxfmt.config.mts` / `cspell.config.mts` に `GENERATED_RELEASE_PATTERNS` を spread する
- publish 時は test しない(PR の check workflow で検証済みの前提)。Release PR は `GITHUB_TOKEN` で作られるため、PR の check workflow は走らない
- npm の Trusted Publisher は、npm 上に既に存在するパッケージにしか設定できない。新しいパッケージは次の手順で初回 publish する
  - `package.json` の version と `.release-please-manifest.json` を初回の版に揃えた状態で、ローカルから `bun pm pack` した tarball を `npm publish <tarball> --access public --tag <dist-tag>` で手動 publish する(npm の認証はユーザーが行う)
  - npm の Web サイトのパッケージ設定で Trusted Publisher(このリポジトリ・`release.yml`)を設定する。設定は作成から2日以内に最初の publish が成功しないと失効するため、次の Release PR をマージする直前に設定する

## GitHub Actions

- action はタグで参照し、SHA の固定は `gh actions-lock` で `.github/workflows/actions.lock` に記録する(workflow を変更したら `gh actions-lock` を実行。`verify-lockfile` で検証される)
- 共通手順は `.github/actions/*` の composite action にし、`$/.github/actions/<name>` で参照する
- workflow の最上位は `permissions: {}` にして job ごとに必要な権限だけ付与し、checkout は `persist-credentials: false` にする
- check workflow の `paths` には、その workspace 自身に加え、lint / test で参照する他 workspace のファイル(共有パッケージは `dist/` の生成元である `src/**`・`package.json`・`tsconfig.build.json`・`tsconfig.json`、`@ts-items/configurations` は参照するディレクトリと `exports` を定義する `package.json`)を含める

## コミット

- husky の `commit-msg` フックで commitlint が走る
- type は `chore` / `feat` / `fix` / `docs` / `style` / `refactor` / `test` / `revert` のみ
- **scope は必須**。許可される値は `root` / `*` / `packages` と、`package.json` の `workspaces` glob に一致するディレクトリ名(例: `configurations`, `website`, `oxfmt-config`, `oxlint-config`)。workspace を追加すると自動で scope に加わる(`scripts/commitlint/directories/directories.mts`)
- type/scope 以外の説明文(subject/body)は英語で書く(チャットでの応答等における日本語既定の例外。commitlint による機械的な強制は無いが、コミット履歴は英語で統一している)

## AI 間のファイルベース連携(ai-communication)

このリポジトリでは Claude Code が**設計・実装**、codex CLI が**レビュー**を担当する。両者は直接会話せず、リポジトリルートの `./ai-communication/<作業ディレクトリ>/` 配下のファイルだけで受け渡しを行う。`ai-communication` は git 管理外(`.gitignore` 済み。oxfmt の `ignorePatterns`、cspell の `ignorePaths` でも明示的に対象外にしている)で、存在しなければ作成してよい。

### 作業ディレクトリ

複数の作業を並行できるよう、`ai-communication` 直下に作業ごとのディレクトリを切り、その中に `task.md` / `result_*.md` / `review_*.md` を置く(`ai-communication/*/*` の2階層。作業ディレクトリの中にさらにディレクトリは作らない)。

- 1作業 = 1ディレクトリ。名前は作業開始時にユーザーが指定する。指定が無ければ result を作成する前にユーザーに確認し、自分で決めない
- 名前に issue 番号・URL を含めない。codex にはディレクトリ名が見えるため、下記「issue をタスク入力とする場合」の秘匿の前提が崩れる。ユーザーが指定した名前に含まれている場合は、その旨を伝えて別名を確認する
- 読み書きはその作業の作業ディレクトリ内に限る。`task.md` の参照、未対応 review の判定もそのディレクトリ内で行い、他の作業ディレクトリのファイルは参照・対応の対象にしない
- 作業ディレクトリが存在しなければ作成してよい

### ファイルと権限

Claude Code 視点の権限は以下の通り。**読み取り専用のファイルには、書き込み・編集・削除・リネームのいずれも行わない。**

| ファイル                                                    | Claude Code                                | codex CLI                                  |
| ----------------------------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| `ai-communication/<作業ディレクトリ>/task.md`               | 読み取りのみ                               | 読み取り禁止・書き込み禁止                 |
| `ai-communication/<作業ディレクトリ>/result_{timestamp}.md` | 新規作成して書く(既存ファイルは編集しない) | 読み取りのみ                               |
| `ai-communication/<作業ディレクトリ>/review_{timestamp}.md` | 読み取りのみ                               | 新規作成して書く(既存ファイルは編集しない) |

`{timestamp}` はファイル作成時刻を `YYYYMMDD-HHmmss`(ローカル時刻)で表したもの。例: `result_20260814-203015.md`。既存ファイルへの追記は行わず、常に新しい timestamp のファイルを作成する。

### フロー

1. タスクの入力を把握する。優先順位は「ユーザーからの直接指示 > 指定された issue > `ai-communication/<作業ディレクトリ>/task.md` の本文」。issue が指定された場合の扱いは下記「issue をタスク入力とする場合」を参照する。issue も `task.md` も無ければ従来通りユーザーの指示のみで進める
2. 設計・実装を行う。実装前確認ルール(Plan Mode でのユーザー承認)・コミットルール(`.claude/rules/commit.md`)はこれまで通り適用する。設計フェーズに入るかどうかの判定条件は下記「設計フェーズに入る条件」を参照する
3. **タスクが完了した時点で** `ai-communication/<作業ディレクトリ>/result_{timestamp}.md` を**新規作成**し、結果と申し送り事項を書く。作業途中の状態では作成しない(未レビューの result が複数並び、codex 側がレビュー対象を選べなくなるため)。途中経過の共有はチャットで行う。codex CLI の起動はユーザーが行う
4. ユーザーからレビュー到着を知らされたら、未対応の `ai-communication/<作業ディレクトリ>/review_*.md` を読む。未対応かどうかはファイル名の timestamp 順ではなく、各 review の `- reviewed_file:` が自分の直近の result を指しているかで判断する(timestamp は実際の作成順と前後することがある)
5. 各指摘の妥当性を自分で確認し、対応要否を判断する。修正が必要なものは実装前確認ルールに従って承認を得てから実装する。対応方法が別の既存規約(生成物を手で編集しない等)からの逸脱を伴う場合は、逸脱する旨・理由・代替案を明示してユーザーの承認を得る。技術的な妥当性を自分で検証できたこと(実環境での動作確認など)は、逸脱してよいという承認を得たことの代替にならない
6. 対応後に新しい `ai-communication/<作業ディレクトリ>/result_{timestamp}.md` を作成し、対応した指摘・見送った指摘とその理由・元になった review のファイル名を書く。以降 4〜6 を必要な回数だけ繰り返す
7. レビューの指摘が無くなったら `retrospective` agent(`.claude/agents/retrospective.md`)を実行し、今回の作業プロセスを振り返る。agent は会話履歴を持たないため、承認フローの逸脱・手戻り・ユーザーからの指摘といった経緯メモと、対象の作業ディレクトリのパスを呼び出し時に渡す。ドキュメント反映が必要な項目が出た場合、起票の前に `gh issue list --repo akky-xxxx/project-ts-items --state open --limit 1000 --json number,title,body,comments` で OPEN issue 全件の番号・タイトル・本文・コメントを取得し、類似issueの有無を確認する(既定の `--limit` は30件までしか取得できず、本文・コメントもタイトルのみの出力には含まれないため、いずれも明示する)。類似の判定は、反映先ファイル(`CLAUDE.md`/`AGENTS.md`/`.claude/rules/*` など)が一致し、かつ指摘している問題または提案する文言の趣旨が、本文だけでなく既存のコメント(過去にこの手順で追記統合された反映案を含む)とも重なるかで行う。類似issueが無ければ**別タスク(別ブランチ)として起票**し、類似issueがあれば新規issueは作らず、`gh issue comment <issue番号> --repo akky-xxxx/project-ts-items` でその issue に今回の反映案(対象ファイル・追記文言案・理由・元タスクの1行要約)を追記コメントする。**起票・コメント追記は、実行前に起票先(新規起票か、コメントを追記する issue の番号か)と文面(新規起票ならタイトル・本文、コメント追記ならコメント本文)をチャットで提示し、ユーザーの明示的な承認を得てから行う。本手順に「起票する」「コメント追記する」と書かれていることや、承認済みのプランにそれが含まれていることは承認の代替にならない。承認を得ずに `gh issue create` / `gh issue comment` を実行してはならない**。いずれの場合も現タスクの push はブロックしない。あわせて、これまでの result の `## 申し送り・レビュー観点` に「別 issue 候補」として書いた項目が起票・コメント追記のどちらも済んでいないまま残っていないか確認し、残っていれば同様に類似issue検索のうえ起票またはコメント追記する。ここでの「レビューの指摘が無くなったら」は、設計フェーズのサブループ(判断軸を変える変更の result/review)の解消ではなく、実装(Edit/Write)とその実装内容に対する result/review ループまで完了した、タスク全体としての解消を指す。設計フェーズを踏むタスクでは、設計サブループが指摘0件になった時点ではまだ実行しない。retrospective の実行契機は「レビューの指摘が無くなったら」に加えて「push の前には必ず」であり、再実行・事後実行が必要になる条件は下記「### retrospective の実行タイミング」を参照する。
8. push / PR 作成に進む(`.claude/rules/pr.md` を参照)。push はユーザーが実行する

### retrospective の実行タイミング

- retrospective 実行後、同じブランチへ新しいスコープが追加された場合: push 前に retrospective を再実行する。再実行は追加分のスコープに絞ってよく、既に起票済み・コメント追記済み・判断済みの項目を再掲しない
- retrospective の実行がユーザー操作待ちで中断した場合、またはユーザーの直接指示で push / PR 作成 / merge が先行した場合: 実行を省略せず事後に行う。呼び出し時の経緯メモに「push 等が先行した」ことを明記し、本来 push 前に行うはずだった「申し送りの別 issue 候補が起票・コメント追記のどちらも済んでいないかの確認」もあわせて行う

### 作成した result のチャットでの提示

`ai-communication/<作業ディレクトリ>/result_{timestamp}.md` を作成したターンでは、チャットの最終出力に作成したファイルを `ai-communication/add-domain-dictionary/result_20260814-203015.md` の形式(作業ディレクトリ名が `add-domain-dictionary` の場合)で書く。ユーザーがそのままコピーして codex CLI にレビュー対象として渡せるようにするための表記であり、`ai-communication/`・作業ディレクトリ名・拡張子(`.md`)のいずれも省略しない。手順3・手順6 のどちらで作成した場合も、設計フェーズで設計だけを書いた result の場合も同様に扱う。

### issue をタスク入力とする場合

タスクは GitHub issue で管理することを基本とする。`task.md` はローカルの git 管理外ファイルで作業デバイスに縛られるが、issue ならどのデバイスからでも起票・追記でき、着手前に内容を詰めておける。

- issue の指定は、ユーザーがチャットで issue 番号 / URL を渡す形と、`task.md` に issue の URL / 番号だけが書かれている形のどちらでもよい。後者の場合、`task.md` 本文は issue への参照とみなし、要件は issue 側を読む
- issue 番号のみ渡された場合は `gh issue view <issue 番号> --repo akky-xxxx/project-ts-items` で参照する。issue の URL を渡された場合は URL 自体がリポジトリを一意に定めるため `gh issue view <URL>` をそのまま使う
- issue 本文が曖昧で複数の解釈が成り立つ場合は、自分で解釈を確定せず実装前確認ルールに従ってユーザーに確認する
- `ai-communication/<作業ディレクトリ>/result_{timestamp}.md` には issue 番号・URL を一切書かない。`- task:` 行に限らず、経緯説明やレビュー対応の記述であっても同様(過去の result に番号が残っていた、といった言及自体は許すが、その番号自体は書かない)。issue 本文の丸写しも行わない。codex に渡すのはレビューに必要な範囲の背景だけで、これは従来通り
- result を新規作成する前に、`- task:` 行だけでなく本文全体(`## 概要`・`## 申し送り・レビュー観点` 等の経緯説明を含む)に issue 番号・URL が紛れていないか見直す

codex には issue の id・本文のどちらも渡さない(`AGENTS.md` を参照)。背景情報を持たせないことで追認的なレビューになるのを避ける意図的な制約であり、issue で管理するようになってもこの前提は変えない。`result_{timestamp}.md` に issue 番号や URL を書くと、この前提が result 経由で崩れる。

### 設計フェーズに入る条件

手順2で、次のいずれかに当たる場合は、実装(Edit / Write)に着手する前に**設計だけ**を `ai-communication/<作業ディレクトリ>/result_{timestamp}.md` に出力し、codex の設計レビューが解消するまでコード・設定・ドキュメントに一切触らない。

- 以後の実装・レビューの判断軸になるもの(`CLAUDE.md` / `AGENTS.md` / `.claude/**` / ルートの `*.config.mts` / `workspaces/configurations/**` / CI 定義(`.github/**`) / リリース設定(`release-please-config.json` / `.release-please-manifest.json`))を変更する。パスではなく検査基準・分類・実行条件・権限のいずれかを変えるかで判定し、既存基準に従うデータの更新(cspell 辞書への単語追加など)は含まない。「権限」には、CI のジョブ/ステップへの secrets・環境変数の追加・変更と、ワークフローの `permissions:` の変更を含む
- 共有パッケージ(`workspaces/packages/**`)が提供する設定値(rules / categories / plugins / オプション)を追加・変更する。利用者側の lint / format 結果を変えるため、判断軸の変更とみなす
- 複数 workspace にまたがる、または既存の公開インターフェース(共有パッケージの `exports` 等)・データ構造を変える
- 判断軸や分類基準を新しく決める(どこまでを対象とするか、何を基準に分けるか)

変更行数・ファイル数・コード変更の有無は判定に使わない。ドキュメント1ファイルの追記でも上記に当たれば設計フェーズを踏む。

Plan Mode(ExitPlanMode)の承認は「着手してよい」の承認であり、設計内容が妥当であることの検証ではない。設計フェーズの対象となるタスクでは、ExitPlanMode で承認を得た後も実装に着手しない。そのターンの作業は「設計のみの result を作成する」ことであり、その旨をプランに明記してから ExitPlanMode する。承認済みの実装プランが前提とする設計 result を改訂した場合(確定文言のみの変更を含む)、そのプランの承認は改訂後の設計には引き継がれない。改訂後の設計 result を前提に、改めて Plan Mode で実装プランの承認を得てから実装に着手する。

設計だけを書いた result は手順3 が禁じる「作業途中の result」には当たらない。`## 変更ファイル` には変更予定のファイルと適用後の文言を書く。Plan Mode のプランには、そのターンで実行する範囲(設計 result の作成までか、実装まで進むか)を明記する。

設計 result に対象ファイルの確定文言(markdown に限らず、設定ファイル・コードを含む)を含める場合、リポジトリのファイルには触れずに、対象ファイルに実際に適用される整形・検査ツールを ignore 設定(`oxfmt.config.mts` の `ignorePatterns`、`cspell.config.mts` の `ignorePaths` 等)から先に判定する。適用されると判定したツールについてのみ、確定文言をスクラッチファイルへ書き出し、対象ファイルに適用されるのと同じ設定(`oxfmt.config.mts`、`.editorconfig` 等)が有効になる状態で実行し、意図した構造(見出し階層、リストのネストなど)で解釈されることを確認する。設定ファイル・コードのように、import の解決や型情報を必要とするツール(oxlint・型チェック・knip 等)が適用されるファイルは、スクラッチファイル単体では同じ設定を再現できない。その場合は対象の workspace をディレクトリ構成ごとスクラッチへ複製し、その workspace の `lint` スクリプトを変更前・変更後の両方の複製で実行する。依存のうち、同じタスクで変更しないものはシンボリックリンクで実体を参照してよいが、同時に変更する workspace への依存は、変更前・変更後それぞれ同じ版の複製を参照させる。参照先の workspace が `dist/` などのビルド成果物を `exports` で公開している場合は、その版の複製内でビルドした成果物を参照させる。変更前の複製が実体と一致することは `diff` で確認する。あわせて、その設定自体が正しく再現できているかは確定文言側の結果だけでは裏取りできないため、変更前の対象ファイル本文も同じスクラッチファイル・同じ設定・同じツールで実行し、通ることを確認してから result を提出する。設計レビューが解消し確定文言をリポジトリのファイルへ適用した後は、適用に使ったコマンドの終了コード(exit code)だけを適用済みの根拠にせず、スクラッチファイルの確定文言と、適用後のファイルのうち対応する変更範囲(該当段落・該当行など)を `diff` で突き合わせ、差分が無いことを確認する。`## 確認済みのこと` には、スクラッチファイルの配置場所・適用した設定・実行したツールとコマンド(確定文言・変更前本文それぞれの結果、および適用後の突き合わせ結果)を書く。

設計対象が `result_{timestamp}.md` / `review_{timestamp}.md` の記述内容そのものを制約するルール(本節や次節の書式を変更する場合など)であるときは、そのうち起草中の設計 result 自身にも適用できる制約(禁止情報の不記載、記録すべき粒度など)は自己適用する。review 専用の書式(severity 見出し・固定ラベル・`reviewed_file`・件数サマリ等)のように result の形式に直接あてはめられない制約については、result をその形式に合わせるのではなく、提案内容が既存の制約や設計意図と整合しているかを点検する。直前の段落が定める整形・構造確認に加えて、ドラフト中の文言、`## 設計判断`、`## 確認済みのこと` の書き方がこれらの点検を満たしているかを提出前に確認する。確認は、該当する記録があるかではなく、ドラフト中の文言(定義・列挙など)を字句どおり当てはめたときに自分の記録がその範囲に含まれるかで行い、修正可能な不整合は提出前に解消する。設計上解消できない、または適用可否が未確定な点だけを、禁止情報自体は転記せず理由とともに `## 申し送り・レビュー観点` に記録する。

設計 result にたたき台や過去の指示に含まれる文言(コマンド例、手順、事実主張)を採用する場合、内容の技術的な正しさの検証を省略しない。特にコマンドの既定挙動など、自分が同じセッション内で既に確認済みの知識と矛盾しないか照合し、矛盾があれば採用前に修正する。たたき台に書かれていることは、その内容が正しいことの根拠にならない。

### `result_{timestamp}.md` の書式

codex が機械的に読み取れるよう、以下の形式に統一する。ファイル参照は `path:line` 形式(コロン区切り、括弧なし)、絵文字・罫線などの装飾は使わない(`AGENTS.md` の指摘出力形式と揃えている)。

```markdown
- task: 対象タスクの1行要約
- reviewed_file: review_20260814-210000.md

## 概要

## 変更ファイル

## 設計判断

## 確認済みのこと

## 前回レビューへの対応

## 申し送り・レビュー観点
```

- `- task:`: 対象タスクの1行要約。issue が入力元であっても issue 番号 / URL は書かない(上記「issue をタスク入力とする場合」を参照)
- `- reviewed_file:`: 対応した review のファイル名(同じ作業ディレクトリ内のファイル名のみ。ディレクトリは書かない)。初回やレビュー起因でない場合は `-` とする
- `## 変更ファイル`: 変更した各ファイルのパスと変更内容を1行ずつ
- `## 設計判断`: 選んだ方針と、その理由・採らなかった選択肢
  - 理由や前提として外部ツール(release-please・lint ツール等)の挙動を書く場合は、一般論や記憶で断定せず、確認した根拠を `## 確認済みのこと` に書く。根拠は、参照した実装・ドキュメントか、対象の版・設定で実行したコマンドとその結果とし、いずれの場合も確認した版を添える。版は CI など実際に使われる経路で解決されるものを確認し、ローカルの `node_modules` に同名パッケージがあっても、それが同じ版であるとは限らない。確認できなかった挙動は推測である旨を明記する
- `## 確認済みのこと`: 実行したコマンド(`bun check-code` 等)とその結果
  - 自分がその場で実行できる検証は、result を提出する前に実行する。「未確認」と書いてよいのは、権限・環境・技術的制約により実行できないものに限り、その理由もあわせて書く
  - テストの失敗原因が自分の変更ではなくローカル環境設定(ユーザー固有かつ git 管理外のもの)にあると判断した場合、その設定ファイル自体は書き換えない。コマンド実行時のプロセス単位の環境変数指定など、設定を変更せずに検証を継続できる手段を先に検討し、それでも検証できない場合に限り、未確認のままとなったテスト範囲・原因・試した代替手段を `## 申し送り・レビュー観点` に記録する
  - 検査結果は実行した後に書く。結果を先に書いてから実行してはならない。該当有無は出力の有無ではなく終了コード(exit code)で判定し、マッチ0件(該当なし、`grep`/`rg` は通常 exit 1)と実行エラー(パス解決失敗等、exit 2 等)を区別する。実行エラーの場合は「該当なし」ではなく「実行エラー」として記録し、原因を解消してから再実行する
  - result を提出する直前に、対象ファイル・検索オプションを含む実行コマンドの形で、禁止対象の情報(issue 番号の実値、`#` 付き表記、issue URL 等)が本文全体(特定のフィールドに限らない、この記録行自体を含む)に含まれていないことを `grep`/`rg` 等で機械的に検査し、実行したコマンドと結果(該当有無)をここに書く。issue 番号の実値は、`#` 付き表記や URL に含まれる形だけでなく、前後に修飾語を伴わない単独の数字列としても出現しうるため、`#` 付き表記や URL の検索だけで代替せず、単語境界(`\b` 等)を使った実値単体の検索を必ず含める。単語境界は、前後が英数字で連続する数字列(タイムスタンプ等)への誤検知を減らす目的も兼ねる。ただし `\b` は `.`・`-`・`/`・`:` を境界として扱うため、版文字列(例: `1.2.3`)・ハイフン区切りの ID・パスや `path:line` の行番号に含まれる数字にもヒットしうる。ヒットした場合は該当なしと扱わず、`rg -n` でヒットした行全体を出力し、各ヒットが issue 番号ではなく別の語の一部であることを1件ずつ確認して、ヒット箇所と何の一部かを記録する。前後の文字を除外する lookaround 等の再検索で代替しない(文末の `.` など、issue 番号の直後に続きうる文字も除外されて見逃すため)。誤検知を避ける目的で本文の版表記・行番号を書き換えない。issue をタスク入力としていない(`task.md` 本文やチャットの指示だけで進めた)場合は、検索する実値が存在しないため実値単体の検索は行わない。その旨と理由を記録し、`#` 付き表記・issue URL の検索は省略せずに行う。過去の作業や他のタスクの issue 番号が紛れ込むことは、入力元が issue かどうかに関わらず起こりうるため
  - 検索パターンに禁止対象の実値(issue 番号そのもの等)や、`<secret 変数名>=` のような変数名を含むパターンを使う場合、記録するコマンドはパターン部分をプレースホルダ(例: `<issue番号>`、`<secret 変数名>`)に置き換え、結果(該当有無)のみを書く。理由は2つあり、実値をそのまま転記すると禁止対象自体を書き込んでしまうこと、および検査対象はこの記録行を含む result 全文であるため、パターンをそのまま書くと記録行自身がヒットしてしまうこと(変数名を含むパターンでも起きる)による。実値を含まない汎用パターン(`[0-9]`、`/issues/` 等)も、記録行自身が別の検索(実値単体の検索、issue URL の検索)にヒットすることがあるため、他の検索に一致しない表記(`\d`、`/issue[s]/` 等)で書いて実行し、そのまま記録する。記録行のコマンド欄をプレースホルダで先に下書きすること自体は構わないが、結果欄(該当有無)は記録行を含む result 全文を書き終えたうえで検査を実行してから確定させる。ここでいう「確定」は、`ai-communication/<作業ディレクトリ>/` に result を作成する前に行う。result の全文はスクラッチディレクトリで下書きし、その下書きに対して検査を実行して結果欄まで埋める。結果欄を埋めると検査対象の本文も変わるため、埋めた後の下書きに対して検査を再実行して結果が変わらないことを確かめてから、下書きと同じ内容で result を新規作成し、作成したファイルと下書きに差分が無いことを `diff` で確認する。result を作成してから結果を追記する手順は、既存 result の編集禁止(「やらないこと」)とぶつかり、追記し忘れたまま codex に渡るため取らない
- `## 前回レビューへの対応`: 2回目以降のみ。指摘ごとに「対応した / 見送った」と理由。見送りは必ず理由を書く
- `## 申し送り・レビュー観点`: 特に見てほしい箇所、既知の懸念、次のタスクへの引き継ぎ。技術的制約等を理由にテスト範囲や実装範囲を当初想定より絞った場合は、その判断と理由も含める

### やらないこと

- `ai-communication/<作業ディレクトリ>/task.md` および `ai-communication/<作業ディレクトリ>/review_*.md` への書き込み・編集・削除
- 既存の `ai-communication/<作業ディレクトリ>/result_*.md` の編集・追記(常に新規ファイルを作成する)
- 作業途中の状態で `ai-communication/<作業ディレクトリ>/result_*.md` を作成すること(手順2 の設計フェーズで作成する、設計だけを書いた result は該当しない)
- レビュー指摘を検証せずそのまま実装に反映すること(妥当性を自分で確認してから対応する)
- レビューの指摘が解消しないまま push / PR 作成に進むこと
- ユーザーの明示的な承認を得ずに GitHub issue を起票する、または既存 issue にコメントを追記すること(手順7 を含め、フローに起票・コメント追記と書かれていることは承認の代替にならない)
