# 開発環境のセットアップ

ローカルで開発を始めるまでの手順をまとめる。環境変数の実値は [Infisical](https://infisical.com) で管理し、Infisical CLI で `.env.local` に書き出すか、コマンドの実行時に注入する。

## 前提

- [Bun](https://bun.com) と Node.js(版は `.node-version` で固定)
- Infisical のプロジェクト(`.infisical.yaml` の `project-id`)へのアクセス権。無い場合はリポジトリのオーナーに招待を依頼する

## 手順

### 1. 依存のインストール

```bash
bun install
```

- `prepare` で husky のセットアップと共有パッケージの build も行われる
- `bun install` は Infisical にアクセスしないため、Infisical のアクセス権が無くても実行できる

### 2. Infisical CLI のインストールとログイン

```bash
brew install infisical/get-cli/infisical
infisical login
```

- macOS 以外のインストール方法は [Infisical のドキュメント](https://infisical.com/docs/cli/install) を参照する
- ログインの状態は `infisical login status` で確認できる

### 3. 環境変数ファイルの生成

```bash
bun setup:env
```

Infisical の環境 `local` のフォルダ `/workspaces/applications/website` から、`workspaces/applications/website/.env.local` を生成する。

- 既存の `.env.local` は上書きされる。手で書き換えた値も消えるため、残したい値は Infisical 側に登録する
- 自分だけ異なる値を使う場合は、Infisical に personal secret として登録する。同名の shared secret より優先される
- Infisical 側の値が更新されたら、もう一度 `bun setup:env` を実行する
- `.env.local` は gitignore 済みのため、コミットされない

### 4. テスト用ブラウザの準備

`bun check-code` は `website` の Storybook のテストを Playwright の Chromium で実行する。初回の実行前に、[README](../README.md#development) の手順でブラウザをインストールする。

## feature flag の json のアップロード

`@ts-items/feature-flags` の `bun upload:website` は、Vercel Blob の Read/Write トークン(`BLOB_READ_WRITE_TOKEN_PRD` / `BLOB_READ_WRITE_TOKEN_STG`)を使う。トークンは `infisical run` で Infisical の環境 `local` のフォルダ `/workspaces/feature-flags` から実行時に注入するため、`.env.local` には書き出さない。

```bash
cd workspaces/feature-flags
bun gen:website-stg # Production にアップロードする場合は bun gen:website-prd
bun upload:website
```

- アップロードするのは `dist/website/<環境>/featureFlag.json`(gitignore 済み)。アップロードの直前に、`bun gen:website-stg` または `bun gen:website-prd` で対象の環境の json を生成し、`bun upload:website` では生成したのと同じ環境(Staging は stg、Production は prd)を選ぶ。生成していない環境を選ぶとファイルが見つからずに失敗し、以前に生成したファイルが残っている場合はその古い内容がアップロードされる
- アップロード先の環境の選択と確認を対話形式で行うため、`workspaces/feature-flags` で直接実行する
- 実行には、手順 2 のログインと、Infisical の `/workspaces/feature-flags` を読む権限が必要
- `bun setup:env` はこのトークンを取得しない。アップロードしない場合は不要

## 環境変数を追加・変更する場合

- Infisical の環境 `local` の、対象の workspace のフォルダに追加する
- あわせて、その workspace の `.env.example` に変数名と、用途・必須か任意か・取得方法のコメントを書く。実値は書かない(`.claude/rules/secrets.md` を参照)
- 書き込み権限を持つトークンなど、ローカルでの開発に不要な値は `.env.local` に書き出さず、使うコマンドを `infisical run` 経由で実行する(上記「feature flag の json のアップロード」を参照)
- `.env.local` に書き出す値を持つ workspace を新しく追加する場合は、ルートの `package.json` に `setup:env:<workspace 名>` を追加する。`setup:env` は `setup:env:*` をまとめて実行する
