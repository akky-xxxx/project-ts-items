# リリース運用(バージョニング / パブリッシュ)

共有パッケージのバージョン更新と npm への公開の手順をまとめる。

## 概要

- 対象: `workspaces/packages/*/*` の共有パッケージ(現在は `@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)
- [release-please](https://github.com/googleapis/release-please)(manifest モード)がバージョン更新・CHANGELOG・タグ・GitHub Release を担当し、`.github/workflows/release.yml` が npm への publish を行う
- 関係するファイル
  - `release-please-config.json`: release-please の設定(対象パッケージ、prerelease の扱いなど)
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
- 破壊的変更の判定基準は `.claude/rules/commit.md` の「破壊的変更」を参照する

### 現在の設定(alpha)での上がり方

現在は `prerelease: true` / `versioning: "prerelease"` / `prerelease-type: "alpha"` / `bump-minor-pre-major: true` で運用している。1.0.0 未満のため、破壊的変更でも major ではなく minor 相当になる。

| 現在の版        | `fix`           | `feat`          | 破壊的変更      |
| --------------- | --------------- | --------------- | --------------- |
| `0.0.1-alpha.0` | `0.0.1-alpha.1` | `0.1.0-alpha.0` | `0.1.0-alpha.0` |
| `0.1.0-alpha.3` | `0.1.0-alpha.4` | `0.1.0-alpha.4` | `0.1.0-alpha.4` |

- patch が 0 の版(`0.1.0-alpha.N` など)では、`feat` や破壊的変更でも alpha の番号だけが上がる
- 上の表は release-please のソース(`src/versioning-strategies/prerelease.ts`)の分岐から求めたもの。実際の版は Release PR で必ず確認する

### 版を明示する(`Release-As`)

自動で決まる版とは別の版にしたい場合は、対象パッケージ配下のファイルに触れるコミットの body に `Release-As` フッターを付ける。

```text
chore(oxfmt-config): release 0.2.0-alpha.0

Release-As: 0.2.0-alpha.0
```

- `Release-As` は他の判定より優先され、指定した版がそのまま使われる
- `Release-As` を含むブランチは squash merge しない(フッターが履歴から失われる)

### 正式版への移行

1. `release-please-config.json` から `prerelease` / `prerelease-type` / `versioning` を外す
2. 対象パッケージ配下のファイルに触れるコミットに `Release-As: 1.0.0` を付ける

`Release-As` だけでは、設定が prerelease のままなので次のリリースが再び prerelease(例: `1.0.1-alpha`)になる。設定の変更とあわせて行う。

### タグと dist-tag

- タグは `<component>-v<version>`(例: `oxfmt-config-v0.1.0-alpha.0`)
- npm の dist-tag は版の `-` 以降の識別子(例: `0.1.0-alpha.0` → `alpha`)。`-` を含まない正式版は `latest`

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
2. `package.json` の `version` と `.release-please-manifest.json` を初回の版に揃える
3. パッケージのディレクトリで tarball を作り、手動で publish する(npm へのログインは各自で行う)

   ```bash
   bun run build
   bun pm pack --destination <出力先>
   npm publish <出力先>/<tarball>.tgz --access public --tag <dist-tag>
   ```

4. npm の Web サイトのパッケージ設定で Trusted Publisher(このリポジトリ・`release.yml`)を設定する
   - 設定は作成から2日以内に最初の publish が成功しないと失効する。次の Release PR を merge する直前に設定する

## 公開結果の確認

```bash
npm view <package> dist-tags versions
```

あわせて GitHub の Releases とタグを確認する。
