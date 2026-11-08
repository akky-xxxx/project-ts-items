---
paths:
  - ".github/**"
---

# GitHub Actions

- action はタグで参照し、SHA の固定は `gh actions-lock` で `.github/workflows/actions.lock` に記録する(workflow を変更したら `gh actions-lock` を実行。`verify-lockfile` で検証される)
- 共通手順は `.github/actions/*` の composite action にし、`$/.github/actions/<name>` で参照する
- workflow の最上位は `permissions: {}` にして job ごとに必要な権限だけ付与し、checkout は `persist-credentials: false` にする
- check workflow の `paths` には、その workspace 自身に加え、lint / test で参照する他 workspace のファイル(共有パッケージは `dist/` の生成元である `src/**`・`package.json`・`tsconfig.build.json`・`tsconfig.json`、`@ts-items/configurations` は参照するディレクトリと `exports` を定義する `package.json`)を含める
