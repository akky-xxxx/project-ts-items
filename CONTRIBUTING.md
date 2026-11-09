# Contributing

## 開発の流れ

1. `develop` から作業ブランチ(`<commit type>/<kebab-case の要約>`)を切る
2. 変更後、ルートで `bun check-code` を実行して通ることを確認する
3. `develop` を base に PR を作成する

## コミット

- [Conventional Commits](https://www.conventionalcommits.org/) 形式で書く。scope は必須(commitlint で検査される)
- 共有パッケージの版はコミットメッセージから自動で決まる。詳細は [リリース運用](docs/release.md) を参照

## リリース

共有パッケージのバージョン更新と npm への公開の手順は [リリース運用(バージョニング / パブリッシュ)](docs/release.md) にまとめている。
