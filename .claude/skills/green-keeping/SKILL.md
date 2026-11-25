---
name: green-keeping
description:
  依存関係(npm パッケージ・GitHub Actions・Node)を棚卸しして最新化し、カテゴリごとに品質ゲートを通しながらコミットして、develop への PR 作成まで進めるためのスキル。
  更新を適用する前に、棚卸しの結果と更新方針をまとめて提示し、ユーザーの承認を得る。
  `/green-keeping` で明示的に起動するほか、依存関係の一括更新を依頼されたときにも使う。
---

# green-keeping

本リポジトリの依存関係を、品質ゲートが通る(グリーンな)状態を保ちながら最新化する手順。
棚卸し → 承認 → カテゴリごとの「更新 → 検証 → コミット」→ PR の順に進める。
承認を得る前に依存関係を変更しない。

## 更新の方針

| 対象                                                   | 更新する範囲                       |
| ------------------------------------------------------ | ---------------------------------- |
| npm パッケージ(ルートと各 workspace の `package.json`) | major を含む最新(0系の版も対象)    |
| GitHub Actions(`.github/**` の `uses:`)                | major を含む最新(0系の版も対象)    |
| Node(`.node-version`)                                  | 同じ major 内の最新(minor / patch) |

- 互換性の検証のために特定の版へ固定している依存は対象外にする。`npm:` alias で宣言しているもの(`@types/react-18`・`typescript-5.0` 等)が当たる。`bun outdated` には最新の major が表示されるが、上げない
- `peerDependencies` の範囲は変えない(利用者に許容する互換範囲であり、版の更新とは別の判断になる)
- 依存同士の互換範囲を外れる場合は、範囲内で上げられる最新の版に留める(例: `typescript` を最新にすると、`typescript` を peer に持つ別の依存の対応範囲を外れる場合)。留めた依存と理由は棚卸しの提示に含める
- `bunfig.toml` の `minimumReleaseAge`(7日)により、公開から7日未満の版はインストールされない。そうした版は今回の対象外とする

## 手順

### 1. 作業場所を決める

1. 作業ディレクトリ(`ai-communication/<作業ディレクトリ>/`)の名前を確認する。指定が無ければ、`.claude/rules/ai-communication.md` に従ってユーザーに確認する(作業場所の判定で、再開かどうかをその作業ディレクトリの result から判断するため)
2. `.claude/rules/worktree.md` の「作業場所の判定」に従う。新しく作業ブランチを切る場合の名前は `chore/green-keeping` とする

### 2. 棚卸しする

- npm パッケージ: ルートで `bun outdated -r` を実行する(ルートと全 workspace を対象にする)。`Update` / `Latest` 列の `*` は、`minimumReleaseAge` により真の最新ではない版であることを示す
- GitHub Actions: `.github/**` の `uses:` に書かれている action ごとに、`tags="$(gh api --paginate repos/<owner>/<repo>/tags --jq '.[].name')" && printf '%s\n' "$tags" | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1` で、安定版の完全な版タグ(`vX.Y.Z`)のうち最新のものを確認する。終了コードが 0 以外ならタグの取得エラー、終了コードが 0 で出力が空なら該当するタグなし、として区別して棚卸しに記録する。更新後の `uses:` も完全な版タグで参照する(`$/.github/actions/*` はリポジトリ内の composite action のため対象外)
- Node: `curl -fsSL https://nodejs.org/dist/index.json | jq -r '.[].version' | grep '^v<major>\.' | head -1` で、`.node-version` と同じ major の最新版を確認する

### 3. 更新方針を提示して承認を得る

棚卸しの結果を、次のカテゴリに分けてまとめて提示し、承認を得てから更新に入る。カテゴリはコミットの単位にもなる。

- 版を揃える必要がある依存(複数の workspace が宣言し、版がずれると誤作動しうるもの。`docs/adr/0001-do-not-use-bun-catalog.md` の「背景」を参照): 依存ごとに1カテゴリとし、その依存を宣言しているすべての workspace を含める。互換性のため同時に上げる必要がある依存(例: `oxlint` と `oxlint-tsgolint`)は同じカテゴリにする
- 上記以外の npm パッケージ: ルート・workspace ごと(commit の scope に対応する)。major の更新は、同じルート・workspace の minor / patch とは別のカテゴリにする
- GitHub Actions
- Node

カテゴリごとに、依存名・現在の版・更新後の版、更新しない依存とその理由、破壊的変更(`.claude/rules/commit.md` の「破壊的変更」)に当たるかを示す。

### 4. カテゴリごとに更新・検証・コミットする

承認されたカテゴリを1つずつ、次の順で進める。複数のカテゴリの変更をまとめて適用しない(`bun.lock` を手で部分 stage することになるため)。

1. 更新する
   - npm パッケージ: `package.json` の版を書き換え、ルートで `bun install` を実行して `bun.lock` に反映する。版を揃える依存は、宣言しているすべての workspace を同じコミットで更新する(ADR 0001)。公開パッケージの `dependencies` は `^` 付きの範囲を保つ(`.claude/rules/publish-packages.md`)
   - GitHub Actions: `uses:` のタグを書き換え、`gh actions-lock` で `.github/workflows/actions.lock` を更新する(`.claude/rules/github-actions.md`)
   - Node: `.node-version` を書き換え、使っているバージョンマネージャ(fnm 等)でその版を有効にする
2. 検証する(下記「検証」)。失敗した場合は、原因と対応方針(コードの修正・版を留める等)を提示し、承認を得てから対応する。更新に伴うコードの修正は、意図が別であれば別のコミットにしてよい(`.claude/rules/commit.md`)
3. `.claude/rules/commit.md` に従って、staged の内容とコミットメッセージを提示し、承認を得てからコミットする
4. そのカテゴリのコミットがすべて済み、品質ゲートが通る状態になってから、次のカテゴリに進む

### 5. PR を作成する

1. 全カテゴリのコミットが済んだら、ルートで `bun check-code` が通ることを確認する
2. `.claude/rules/ai-communication.md` のフローに従い、result の作成・レビュー指摘の解消・retrospective を済ませる
3. 2 で変更が入った場合は、最終状態で `bun check-code` を再実行する。GitHub Actions の変更が入った場合は `gh actions-lock --verify` も再実行する
4. ユーザーに push を依頼する(push はユーザーが行う)
5. push の後、`.claude/rules/pr.md` に従って develop を base に PR を作成する

## 検証

- ルートで `bun check-code` を実行する。exit code だけで判断せず、テスト件数と lint の出力で実際に実行されたことも確認する
- Node を更新したカテゴリでは、`node --version` が `.node-version` と一致することを確認したシェルで `bun check-code` を実行する(一致しないと、更新前の Node で品質ゲートが通ってしまう)
- GitHub Actions を更新したカテゴリでは、CI(`.github/workflows/verify-lockfile.yml`)と同じ `gh actions-lock --verify` が成功することも確認する
- `website` のサーバー側で動く依存(`next` 等)を更新した場合は、`CLAUDE.md` に従って `bunx next build` の警告とルートごとの描画方式も確認する
- 品質ゲートやテストで担保できない画面の表示・操作は、`website` を起動して Claude in Chrome で確認する

## やらないこと

- 承認を得る前に `package.json`・`bun.lock`・`.github/**`・`.node-version` を変更すること
- 検証用の alias(`npm:` alias)の版、`peerDependencies` の範囲、Node の major を変えること
- 品質ゲートが失敗したまま次のカテゴリに進むこと
