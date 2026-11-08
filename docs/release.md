# リリース運用(バージョニング / パブリッシュ)

共有パッケージのバージョン更新と npm への公開の手順、および `website` の tag と GitHub Release の作成をまとめる。

## 概要

- 対象: `workspaces/packages/*/*` の共有パッケージ(現在は `@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)。`website` は対象外で、別の workflow で tag と GitHub Release だけを作る(「website のリリース」を参照)
- [release-please](https://github.com/googleapis/release-please)(manifest モード)がバージョン更新・CHANGELOG・タグ・GitHub Release を担当し、`.github/workflows/release.yml` が npm への publish を行う
- 関係するファイル
  - `release-please-config.json`: release-please の設定(対象パッケージ、版の上がり方など)
  - `.release-please-manifest.json`: 各パッケージの現在のバージョン
  - `.github/workflows/release.yml`: main への push で動く workflow

## バージョニング

### コミットから版が決まる

版はコミットメッセージ(Conventional Commits)から自動で決まる。手で `package.json` の `version` を書き換えない。

| コミット                                    | 上がり方       |
| ------------------------------------------- | -------------- |
| `fix`                                       | patch 相当     |
| `feat`                                      | minor 相当     |
| type/scope の直後の `!`、`BREAKING CHANGE:` | major 相当     |
| `docs` / `chore` / `refactor` など          | 版は上がらない |

- パッケージの path(例: `workspaces/packages/configurations/oxfmt-config/`)配下のファイルに触れたコミットだけが、そのパッケージの対象になる
  - ただし、ファイルに触れない空コミット(`git commit --allow-empty`)は全パッケージの対象になる
- 破壊的変更の判定基準は `.claude/rules/commit.md` の「破壊的変更」を参照する

### 現在の設定での上がり方

正式版で運用しており、`versioning` は既定(`default`)、`bump-minor-pre-major: true` とし、`prerelease` / `prerelease-type` は使わない。1.0.0 未満のため、破壊的変更でも major ではなく minor 相当になる。

| 現在の版 | `fix`   | `feat`  | 破壊的変更 |
| -------- | ------- | ------- | ---------- |
| `0.0.1`  | `0.0.2` | `0.1.0` | `0.1.0`    |
| `1.2.3`  | `1.2.4` | `1.3.0` | `2.0.0`    |

- 上の表は release-please のソース(`src/versioning-strategies/default.ts`)の分岐から求めたもの。実際の版は Release PR で必ず確認する

### 版を明示する(`Release-As`)

自動で決まる版とは別の版にしたい場合は、対象パッケージ配下のファイルに触れるコミットの body に `Release-As` フッターを付ける。全パッケージの版を揃えて明示する場合は、空コミット(`git commit --allow-empty`)に付ける。

```text
chore(oxfmt-config): release 0.2.0

Release-As: 0.2.0
```

- `Release-As` は他の判定より優先され、指定した版がそのまま使われる
- `Release-As` に prerelease の版(例: `0.2.0-alpha.0`)を指定しない。既定の versioning は版を上げても prerelease の識別子を引き継ぐため、以降の版にも識別子が残る
- `Release-As` を含むブランチは squash merge しない(フッターが履歴から失われる)

### タグと dist-tag

- タグは `<component>-v<version>`(例: `oxfmt-config-v0.1.0`)
- npm の dist-tag は `latest`。版に `-` を含む場合(prerelease)は、`-` 以降の識別子(例: `0.1.0-alpha.0` → `alpha`)になる

## パブリッシュ

### 通常のフロー

1. 作業ブランチから develop へ PR を出して merge する
2. develop を main へ **merge commit** で取り込む
   - squash しない。squash すると個々のコミットと `bootstrap-sha` が main の履歴から失われ、版の判定と CHANGELOG が崩れる
3. main への push で `release` workflow が動き、リリース対象のパッケージの更新をまとめた1件の Release PR が作成・更新される
4. Release PR に含まれる各パッケージの版と CHANGELOG を確認して merge する
5. main にタグと GitHub Release が作られ、`bun pm pack` した tarball が `npm publish` される
   - 認証は npm の Trusted Publishing(OIDC)で、トークンは使わない。provenance も付与される

注意点:

- publish 時には test を実行しない。PR の check workflow で検証済みである前提
- Release PR は `GITHUB_TOKEN` で作られるため、Release PR に対しては check workflow が走らない
- Release PR で生成・更新される各パッケージの `CHANGELOG.md` は、パッケージの lint(oxfmt / cspell)の対象外にしている。release-please の出力形式が oxfmt の整形結果と一致しないため。生成物なので手で整形しない

### 新しいパッケージの初回 publish

npm の Trusted Publisher は、npm 上に既に存在するパッケージにしか設定できない。そのため初回だけローカルから手動で publish する。

1. `release-please-config.json` の `packages` と `.release-please-manifest.json` にパッケージを追加する
   - あわせて、生成される `CHANGELOG.md` を lint 対象から外すため、そのパッケージの `oxfmt.config.mts` / `cspell.config.mts` に `@ts-items/configurations/release` の `GENERATED_RELEASE_PATTERNS` を spread する
2. `package.json` の `version` と `.release-please-manifest.json` を初回の版に揃える
3. パッケージのディレクトリで tarball を作り、手動で publish する(npm へのログインは各自で行う)

   ```bash
   bun run build
   bun pm pack --destination <出力先>
   npm publish <出力先>/<tarball>.tgz --access public --tag <dist-tag>
   ```

4. npm の Web サイトのパッケージ設定で Trusted Publisher(このリポジトリ・`release.yml`)を設定する
   - 設定は作成から2日以内に最初の publish が成功しないと失効する。次の Release PR を merge する直前に設定する

## website のリリース

- `website` は release-please の対象外で、npm にも publish しない。`workspaces/applications/website/**` に触れるコミットが main に push されると、`.github/workflows/release-website.yml` が tag と GitHub Release を作る
- tag は `website-vYYYYMMDD`(日付は JST)。同じ日付の tag が既にあれば `website-vYYYYMMDD.1`、`.2` と連番を付ける
- リリースノートは、直前の `website-v*` tag 以降に website の path に触れたコミット(merge commit を除く)の subject の一覧。GitHub Release の Latest にはしない(`--latest=false`。Latest はパッケージの Release に残す)
- 連続した push の実行は `concurrency` の `queue: max` で最大100件まで待機させて1つずつ処理し、取りこぼさない(既定の `queue: single` では待機中の実行が新しい実行に置き換えられる)。処理順は GitHub 上で保証されないため、古いコミットの実行が後に動くと、その Release のノートが空になることがある
- release-please は tag を `<component>-v<major>.<minor>.<patch>` の形でしかパースできず、`website-v*` の Release は読み飛ばすため、パッケージのバージョン判定には影響しない
- Vercel へのデプロイは Vercel の Git 連携(Production Branch を `main` にする)で行い、このリポジトリの workflow では扱わない

## 公開結果の確認

```bash
npm view <package> dist-tags versions
```

あわせて GitHub の Releases とタグを確認する。
