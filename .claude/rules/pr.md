# PR 作成ルール

- PR を作成する場合、base branch は原則 `develop` とする
- 変更差分を確認する際は、比較の直前に `git fetch origin` でリモート追跡ブランチを更新し、基準には `origin/develop`(例: `git diff origin/develop...HEAD`)を使う。`git fetch` は `origin/develop` などのリモート追跡ブランチを更新するだけでローカル `develop` 自体は進まないため、ローカル `develop` は基準にしない。`origin/develop` も直前に fetch していなければ古いままなので、比較のたびに fetch してから使う
- issue 対応の作業では、PR merge で issue を close できるように PR description に `closes #<issue番号>` の形式で記載する
