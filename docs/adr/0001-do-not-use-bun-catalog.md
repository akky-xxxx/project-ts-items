# 0001: bun catalog を使わない

- 状態: 採用(2026-11-25)

## 背景

複数の workspace が同じ依存を宣言しており、版がずれると誤作動しうるものがある。

- workspace の間で値・型を受け渡す依存: `zod`(feature-flags のスキーマを website が使う)、`@types/react`(react-types の型宣言を website が読む)
- 共有設定を読むツール: `oxfmt`、`oxlint`、`oxlint-tsgolint`、`typescript`

これらの版をルートの `package.json` の `catalog` でまとめて管理し、各 workspace では `catalog:` を指定する案を検討した。

## 決定

bun catalog(`catalog` / `catalog:`)は使わない。依存は各 workspace の `package.json` に直接宣言する。版の指定方法は既存の規約に従い、この ADR では変えない。

- レジストリから取得する依存のうち、`devDependencies` と、公開しない workspace の `dependencies`: exact の版(`bunfig.toml`)
- レジストリから取得する依存のうち、公開パッケージの `dependencies`: `^` 付きの範囲(`.claude/rules/publish-packages.md`)
- `peerDependencies`: 利用者に許容する互換範囲(例: feature-flags の `zod` は `^4.6.7`)
- workspace の間の依存(`@ts-items/*`): `workspace:*`

版を揃える必要がある依存の exact の版を上げる場合は、その依存を宣言しているすべての workspace を同じコミットで更新する(`.claude/rules/commit.md` の、複数の workspace に共通する依存の版を一括で上げる場合の扱いに従う)。このとき、公開パッケージの `dependencies` と `peerDependencies` の範囲は、exact の版に置き換えない。

## 理由

検討の中で、次の問題が分かった(bun 1.4.4・knip 6.43.0 で確認)。

- website の tag と GitHub Release が作られない。catalog の版を上げても、変わるのはルートの `package.json` と `bun.lock` だけになる。`.github/workflows/release-website.yml` は `workspaces/applications/website/**` の変更でしか動かず、リリースノートも同じパスに触れたコミットから作る。そのため、website が実行時に使う依存(`zod` 等)の更新が記録されない
- 公開パッケージの規約と両立しない。検討した案では、catalog を各 workspace の `dependencies` / `devDependencies` に一律に適用する。catalog の版は exact で、`bun pm pack` でもその版に置き換わるため、公開パッケージの `dependencies` も exact の版で公開される。一方、公開パッケージの `dependencies` は `^` 付きの範囲にする規約がある(`.claude/rules/publish-packages.md`)。そのため一律に適用するなら、公開パッケージの `dependencies` を例外にする必要がある。catalog の対象を `devDependencies` と、公開しない workspace の `dependencies` に限れば、この衝突は避けられる
- knip の設定を全 workspace で変える必要がある。workspace 単位で実行する knip は、実行ディレクトリの `package.json` からしか catalog を読まず、ルートの `catalog` への参照を未解決と報告する。そのため、ルート以外のすべての workspace で `catalogReferences` を off にしなければならない
- 版の更新手順が変わる。workspace で `bun add <name>@<version>` を実行すると `catalog:` が exact の版で上書きされ、`bun update` は catalog の版を更新しない

## 再検討の条件

次のいずれかに当たる場合は再検討してよい。再検討する場合は、この ADR を更新するか、新しい ADR で置き換える。

- website のリリース(tag・リリースノート)が、ルートの `package.json` / `bun.lock` で変わった website の依存を拾えるようになった
- workspace 単位で実行する knip が、ルートの `catalog` を読めるようになった
