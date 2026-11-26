# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Bun workspaces による TypeScript モノレポ。ルートの開発ツール設定(lint / format / commitlint 等)と、それを切り出した共有設定パッケージ(`oxfmt-config` / `oxlint-config`)が中心。React 向けの汎用的な型を公開する共有型パッケージ(`react-types`)もある。

- ランタイム / パッケージマネージャ: Bun(Node のバージョンは `.node-version` で固定。oxfmt / oxlint / cspell は `.mts` 設定を Node で読むため Node 22.18 以上が必要)
- TypeScript は `devDependencies` で指定。ルートの `tsconfig.json` は `@tsconfig/strictest` を継承し、`noEmit` + `moduleResolution: bundler` + `allowImportingTsExtensions`
- テストランナーは `bun test`。共有設定パッケージの dry run と、dry run の helper 自体のテスト、共有型パッケージの型テストがある(いずれも `.claude/rules/publish-packages.md` を参照)。`@ts-items/feature-flags` には、公開しているスキーマのテストがある

## コマンド

ルートで実行する。

```bash
bun install          # 依存インストール(prepare で husky のセットアップと各パッケージの build も走る)
bun lint             # lint:* を並列実行(cspell / knip / oxfmt --check / oxlint / sort-package-json --check / type-check)
bun fix              # fix:* を並列実行(oxfmt / oxlint --fix / sort-package-json)
bun a:lint           # ルート + 全 workspace の lint(a:fix も同様)
bun prepare:build    # 全パッケージの build(bun --filter "@ts-items/*" build)
bun setup:env        # Infisical から website の .env.local を生成(要 infisical login。手順は docs/development-setup.md)
bun w:test           # 全 `@ts-items/*` と `website` のうち `test` スクリプトを持つものの test(共有設定パッケージは build してから dry run、react-types は build してから `@types/react` の版ごとの型チェックと TS 5.0 での読み込み確認、feature-flags はスキーマのテスト、website は Storybook の vitest を実行)
bun check-code       # w:test → a:lint の順に直列実行(push 前に通す品質ゲート)

bun lint:oxlint      # 個別実行も可能(lint:<name> / fix:<name>)
```

- oxlint は `--deny-warnings --report-unused-disable-directives` 付きで実行されるため、warning や不要な disable コメントも失敗扱いになる
- `@ts-items/*` パッケージと `website` にはルートと同じ `lint` / `fix` 系スクリプトがある(`bun --filter <name> <script>` で実行)。`a:lint` / `w:*` の対象は `@ts-items/*` と `website`、`prepare:build` の対象は `@ts-items/*` のみ(`website` には `build` スクリプトが無い)。`bun --filter` は、フィルターに一致した workspace のうち、そのスクリプトを持つものだけで実行し、持たないものは出力なしで飛ばす。現時点の `@ts-items/feature-flags` は `build` を持たないため、`prepare:build` では build されない。なお、そのスクリプトを持たない workspace だけを `--filter` で指定すると `Script "<script>" not found` で失敗(exit 1)する(例: feature-flags は `build` を持たないため、`bun --filter @ts-items/feature-flags build` は失敗する)
- workspace 単位のスクリプトをルートから実行する場合は `bun --filter <name> <script>` を使う。`bun --cwd <dir> run <script>` の語順では `bun run` のヘルプを表示して exit 0 で終わり、スクリプトは実行されない(bun 1.4.4 で確認。`bun run --cwd <dir> <script>` の語順なら実行される)。check-code などの検証結果は exit code だけで判断せず、テスト件数や lint の出力で実際に実行されたことも確認する
- 共有パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)の `dist/` は git 管理外で、`src/` が変わっても自動では再ビルドされない。ルート・各 workspace の `oxfmt.config.mts` / `oxlint.config.mts` はこの `dist/` を読み込むため、ルートの `bun check-code` 以外で lint / fix を実行する場合(ルートの `bun lint` / `bun fix` / `bun a:lint`、`bun --filter <name> lint`、workspace 単位の `check-code` 等)は、develop の取り込みやブランチの切り替えで共有パッケージの `src/` が変わった後に、先に `bun prepare:build` を実行する。実行しないと古い `dist/` の設定で lint され、変更していないファイルにエラーが出る。ルートの `bun check-code` は `w:test` で全共有パッケージを再ビルドしてから lint し、`bun install` も `prepare:build` を実行するため、いずれの直後も不要
- ルートの `prepare` はスクリプト名の羅列のみにし(`run-s prepare:husky prepare:build`)、実処理は `prepare:<name>` に定義する
- `check-code` は `w:test` → `a:lint` の順に直列で実行する。共有パッケージの `test` は `dist/` を再ビルドし、lint は設定ファイル経由でその `dist/` を読み込むため、並列にすると書き換え中の `dist/` を読んで失敗しうる。test を先にすることで、lint は最新の `src/` から build した `dist/` を読む。共有パッケージ単位の `check-code` も同じ理由で `test` → `lint` の順に直列で実行する(`lint:type-check` の対象に自パッケージの `dist/` が含まれるため)
- `website` の `test` は Storybook のテストを vitest のブラウザモード(Playwright の Chromium、headless)で実行するため、ルートの `w:test` / `check-code` の実行前にブラウザを用意しておく。初回や `playwright` の更新後は `workspaces/applications/website` で `bunx playwright install chromium` を実行する
- `website` の `check-code`・ルートの `check-code`・CI(`check-website.yml`)は、いずれも `next build` を実行しない(`website` には `build` スクリプトが無い)。サーバー側で動くコード(Node 組み込みモジュールによるファイル読み込み、実行時に決まるパス、環境変数の参照、ページの描画方式に依存する処理)を変更した場合は、`workspaces/applications/website` で `bunx next build` を実行し、exit code だけでなく、警告の有無とルートごとの描画方式(Static / Dynamic)も確認する。警告が出てもビルドは exit 0 で終わるため、出力を読まないと気付けない
- workspace 内で build を個別実行する場合は `bun run build`(`bun build` は Bun 組み込みのバンドラーが起動する)

## 構成

```
docs/adr/                   # ADR(過去に決めた判断とその理由)。NNNN-<kebab-case の要約>.md の連番
scripts/<tool>/<name>/      # ルートの設定からのみ使うスクリプト(例: commitlint の directories)
workspaces/applications/*   # アプリケーション(例: website)
workspaces/configurations   # リポジトリ固有の設定(1ディレクトリ1エクスポート)。@ts-items/configurations として workspace 化
workspaces/feature-flags    # feature flag の定義(website から利用する前提)。@ts-items/feature-flags として workspace 化
workspaces/packages/*/*     # 共有パッケージ。カテゴリ/パッケージ名 の2階層(例: configurations/oxfmt-config)
```

- 依存の管理方法・ツール構成などの方針を変える前に、`docs/adr/` に同じ対象を扱う ADR が無いか確認する。ADR で見送った方針を採る場合は、ADR の「再検討の条件」に当たるかを確かめ、当たらなければ着手しない
- ルートの `*.config.mts` は薄いエントリにとどめる。oxfmt / oxlint の共通設定は `@ts-items/oxfmt-config` / `@ts-items/oxlint-config` から import し、このリポジトリ固有の設定(cspell の `packages.txt`、oxlint の `forConfigurationFiles` など)は `workspaces/configurations/<tool>/<name>/` に置く。ルートの設定からのみ使うスクリプトは `scripts/<tool>/<name>/` に置く
- `workspaces/configurations/` の設定を workspace から使う場合は `"@ts-items/configurations": "workspace:*"` に依存し、`@ts-items/configurations/<tool>` で import する(`<tool>/index.mts` で集約し、公開対象は `workspaces/configurations/package.json` の `exports` に追加)
- `@ts-items/configurations` は build せず `.mts` を直接 `exports` で公開する。自身の lint 設定を持つ
  - cspell などが設定ファイル経由で Node から直接読み込むため、相対 import は拡張子(`.mts`)まで書く(拡張子なしは型チェックは通るが実行時に解決できない)
- cspell の辞書は、ルート / workspace の `cspell.config.mts` で `@ts-items/configurations/cspell` の `getDictionarySetting(["domain", "packages"])` のように、必要な辞書名を指定して spread して使う。辞書を追加する場合は `workspaces/configurations/cspell/<name>.txt` を置き、`dictionaryDefinitions.mts` の `dictionaryNames` に名前を足す。辞書の path は `import.meta.resolve` で絶対 URL にしているため、参照する側の位置に依存しない
  - `@ts-items/configurations` 自身の `cspell.config.mts` は `getDictionarySetting` を使わず辞書を直接定義している。辞書ファイル自体も自身の cspell の検査対象になるため、辞書を追加したらここにも足す
- 設定ファイルは `defineConfig` か `as const satisfies <ConfigType>` で型付けする
- cspell / knip / oxfmt / oxlint / 型チェック(`tsconfig.json` の `exclude`)は、ルートでは `workspaces/**` を対象外にしている(各 workspace は自身の設定で lint する)。パターンは `./` や `**/` を付けず `workspaces/**` の形で書く(oxfmt は `./workspaces/**` を解釈せず、何も除外されない)
- oxlint の `overrides[].files` に、Next.js の動的セグメント(`[locale]` 等)を含むパスを書く場合、`[` と `]` は文字クラスとして解釈されるため、そのままでは一致しない。`[[]locale[]]` のように、角括弧そのものを1文字だけの文字クラスで表す(oxlint 1.90.0 で確認。バックスラッシュによるエスケープも一致しなかった)
- ルートの cspell は `cspell.config.mts` の `enableGlobDot` / `useGitignore` で、dot ディレクトリ・ファイル(`.claude/**`・`.github/**`・`.husky/**` 等)も検査する(cspell の glob は既定で dot ディレクトリを辿らない)。`.gitignore` 済みのものは対象外になるが、次は `ignorePaths` で明示的に除外している
  - `.git/**`: `.gitignore` に書かれていないため、`useGitignore` では除外されない
  - `.claude/settings.local.json`: global gitignore で無視されるローカル専用ファイル。cspell は global gitignore を読まず、CI には存在しないため、検査するとローカルと CI で結果がずれる
  - `.gitignore`: 外部テンプレート由来のファイル名パターンが中心で、文章ではないため
- cspell が未知語として報告する語は、種類に応じて `workspaces/configurations/cspell/` の辞書に1行1語で追加する
  - `packages.txt`: パッケージ名・ツール名
  - `domain.txt`: GitHub のオーナー名など、このリポジトリ固有の固有名詞
  - `commands.txt`: ツールのコマンド・オプション・組み込み関数名(例: `bunx`、git の `--oneline`、jq の `ltrimstr`)
- knip は `tsconfig.json` の `extends` で参照する依存(例: `@tsconfig/strictest`)を使用中と判定するため、`ignoreDependencies` には追加しない。設定ファイル経由でしか参照されず knip が未使用と判定する依存が出た場合に限り、`knip.config.mts` の `ignoreDependencies` に追加する
- 同じディレクトリ階層に、大文字小文字だけが異なるディレクトリ名・ファイル名を作らない(例: 型の `Dictionary/Dictionary.ts` と値の `dictionary/dictionary.ts`)。1ディレクトリ1エクスポートと、型は UpperCamelCase・値は camelCase という命名規約を組み合わせると、型と値に同じ語を使ったときに起きる。macOS の既定のファイルシステム(大文字小文字を区別しない)では同じパスとして上書きされ、CI(Linux)では別のファイルになる。設計時に変更予定のパスを並べた段階で確認し、値の側を別名にする

## リリース

共有パッケージ(release-please による版の更新と npm への publish)と `website`(tag と GitHub Release の作成)のリリース運用は `docs/release.md` にまとめている。リリース設定(`release-please-config.json` / `.release-please-manifest.json` / `.github/workflows/release*.yml`)の変更、パッケージの追加、`Release-As` フッター付きのコミットの作成、develop → main の PR 作成・マージ、Release PR の確認・マージ、npm への手動 publish を行う前に読む。共有パッケージの配下を変更するコミットの type を決める場合(type によって版が上がるかが決まる)と、共有パッケージ・`website` の依存や設定の宣言をそれらの path の外(ルートの `package.json` 等)へ移す設計をする場合(release-please がどのパッケージを対象にするかと、`website` の tag の作成・リリースノートの抽出は path で決まる)も、事前に読む。

## 切り出したルール

規約の詳細は `.claude/rules/` に分けている。`paths` を持つルールは、該当するファイルを Read / Write / Edit したときに読み込まれる(括弧内が対象の path)。それ以外は起動時に読み込まれる。

- `.claude/rules/ai-communication.md`: codex との AI 間のファイルベース連携
- `.claude/rules/coding-guideline.md`: コーディング規約(ツールで強制されるもの)
- `.claude/rules/commit.md`: コミットの形式・粒度・承認・破壊的変更
- `.claude/rules/github-actions.md`(`.github/**`): GitHub Actions の書き方
- `.claude/rules/pr.md`: PR 作成ルール
- `.claude/rules/publish-packages.md`(`workspaces/packages/**`): 共有パッケージの構成・build・dry run
- `.claude/rules/secrets.md`: 機密情報の取り扱い
- `.claude/rules/test.md`(`**/*.stories.{mts,ts,tsx}`・`**/*.test.{mts,ts,tsx}`): テストの書き方(期待値の固定、修正前のコードでの失敗の確認など)。テストファイルを開かずに、追跡対象のファイルを一時的に書き戻してテストを実行する場合も、書き戻す前に読む
- `.claude/rules/worktree.md`: 新規実装・別タスクに着手する際の git worktree での作業(作業場所の判定・作成・連携ファイルの扱い)
