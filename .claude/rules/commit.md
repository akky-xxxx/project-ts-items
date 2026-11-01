# コミットルール

- [Semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) に則る
  - feat: (new feature for the user, not a new feature for build script)
  - fix: (bug fix for the user, not a fix to a build script)
  - docs: (changes to the documentation)
  - style: (formatting, missing semi colons, etc; no production code change)
  - refactor: (refactoring production code, eg. renaming a variable)
  - test: (adding missing tests, refactoring tests; no production code change)
  - chore: (updating grunt tasks etc; no production code change)
  - revert: (reverts a previous commit)
- cherry-pick や drop 等、コミット単位の操作をしやすい粒度
  - 実装における1機能以下
  - ここでいう「操作をしやすい」は、コミットが意図の単位でまとまっていて cherry-pick / drop した結果が変更内容として意味をなすことを指す。各コミット単体で品質ゲート相当のチェック(`bun check-code` 等)が通ることまでは求めない。lint / format / 型チェック / dry run 等の整合性は PR として提出する最終状態で通っていればよい。CI は未導入のため、PR 提出(push)前にルートで `bun check-code` を実行して通ることを確認する
  - 分割の判断軸は「その変更が単独で説明できる1つの意図を持つか」。直前のコミットに対する lint/format 対応であっても、意図が別であれば分けてよい。単体で品質ゲートを通らないことを理由にコミットをまとめて粒度を大きくしない
- commit を実行する前に、staged される内容(diff)と commit message を提示し、ユーザーから明示的な承認を得てから `git commit` を実行する
  - 提示する diff は「自分が `git add` した分」ではなく、`git status --short` と `git diff --cached` の全体で確認する。`git rm` / `git mv` はファイル操作と同時に index を変更するため、意識していないと承認対象外の変更が同じコミットに入る
  - 自分(agent)だけで内容を確認して進めるのは不可。必ずユーザーの承認を待つ
  - 複数コミットに分ける場合は、コミットごとに承認を得る
  - 同一ファイル内の複数の独立した変更を別コミットに分ける場合、先にすべての変更を適用してから `git diff` を手動でハンク単位に切り出して `git apply --cached` で部分 stage するのではなく、変更ごとに Edit して都度 `git diff --cached` を確認・承認・commit する。手動で組んだパッチはコンテキストのずれで意図しない箇所に適用されても検出しづらい
  - lockfile などの生成物(`bun.lock` 等)が複数のスコープの変更にまたがって更新される場合も、手で部分 stage しない。コミットの分け方は変更を適用する前に決め、スコープごとに「変更 → 生成コマンド(`bun install` 等)→ `git diff --cached` の確認・承認・commit」を繰り返す。設計フェーズで用意した確定版をまとめて適用する場合も、適用と適用後の `diff` による突き合わせの単位をこの分け方に合わせる。1つの意図による変更で複数のスコープの生成物が同時に変わり、スコープごとに分けると変更内容として意味をなさない場合(複数の workspace に共通する依存のバージョンを一括で上げる等)は、分けずに複数のスコープを表す scope(`*` / `packages`)の1コミットにする
  - 作業を促す指示(「一通り作業して」「先にコミットして」等)や、承認済みの実装プランにコミット内容が書かれていることは、承認の代替にならない。往復が増えても省略しない
- `develop` / `main` に直接コミットしない。1本目のコミットを作る前に作業ブランチを切る
  - ブランチ名は `<commit type>/<kebab-case の要約>`(例: `docs/ai-communication-flow-followup`)
  - 切るタイミングは実装着手前。コミット直前まで待たない
  - 既に `develop` 上でコミットしてしまった場合は、その commit から作業ブランチを作り、`develop` を作業開始時点の commit(ローカル `develop` が `origin/develop` と一致していたなら `origin/develop`)に戻す
  - 新しいタスク(別 issue 等)に着手する際は、既存の作業ブランチを使い回さず、`develop` の最新から新しく作業ブランチを切る。ブランチを切り替えたら `git branch --show-current` 等で対象タスク用のブランチになっていることを確認してから最初の変更に入る
- 一時的な確認(整形結果のプレビュー等)の目的で `git stash` を使わない。`git stash pop` は直前に自分が stash したとは限らず、リポジトリに残っている無関係な stash(他ブランチ・他セッションのもの)を誤って適用する恐れがある。一時退避が必要な場合は `git diff` の出力確認や、リポジトリ外(スクラッチディレクトリ等)へのファイル書き出しで代替する。

## 破壊的変更

- 破壊的変更を含むコミットは、type/scope の直後に `!` を付ける(例: `feat(oxlint-config)!: enable no-console rule`)。既存の履歴もこの形式で書かれている
- あわせて body に `BREAKING CHANGE: <何が壊れるか・利用者側の移行方法>` のフッターを英語で書く。`!` だけでは影響範囲と移行方法が履歴に残らないため
- 破壊的変更とみなすもの
  - 共有パッケージ(`@ts-items/oxfmt-config` / `@ts-items/oxlint-config`)や `@ts-items/configurations` の公開 API(`exports` のパス、export 名、関数シグネチャ、型)の削除・改名・互換性の無い変更
  - 共有設定の変更で、利用者の既存コードが新たに lint エラーになる、または整形結果が変わるもの(ルールの追加・有効化、severity の引き上げ、閾値を厳しくする変更、整形オプションの変更)
  - 動作要件の引き上げ(Node / TypeScript / `peerDependencies` の必須バージョン等)
- 該当しないもの: 利用者に影響しない内部リファクタ、ルールの無効化や閾値の緩和(新たなエラーを生まない変更)、他の workspace から参照されない workspace(`website` 等)だけで閉じる変更。`@ts-items/configurations` は `private` だが他の workspace から参照されるため、公開 API の変更は破壊的変更に含める
- 判定に迷う場合は破壊的変更として扱い、コミットの承認を求める際にその旨と判断理由をユーザーに明示する
