# AI の作業ツリー(worktree)

ユーザーが IDE で開いているのはメインの作業ツリー(非 worktree)のため、AI がそこでブランチの切り替えや編集を行うと、ユーザーの操作とぶつかる。新規実装や別タスクに着手する場合は、AI は git worktree を作成し、その中で作業する。

## 作業場所の判定

作業に着手する前(最初の変更・ブランチ操作の前)に、`git fetch origin` を実行したうえで、次の順に判定し、最初に当たったものに従う。

1. 再開: 指定された作業ディレクトリ(`ai-communication/<作業ディレクトリ>/`)に自分の result がある場合は、直近の result の `- worktree:` が示す場所(パス。`-` ならメインの作業ツリー)を再開先、`- branch:` を対象ブランチとする
   - 再開先が存在し(worktree なら `git worktree list` に含まれ)、`git -C <再開先> branch --show-current` の結果が対象ブランチと一致する場合は、再開先で作業を続ける(既にそこにいればそのまま続ける)
   - 再開先が無い、チェックアウト中のブランチが対象ブランチと異なる、または直近の result に `- worktree:` / `- branch:` が無い(本ルール導入前の result)場合は、自分でブランチを切り替えず、worktree も作成しない。`git worktree list`(各 worktree でチェックアウト中のブランチを含む)で対象ブランチの所在を確認し、その結果を添えて、どこで作業するかユーザーに確認する(IDE 側でユーザーがブランチを切り替えた可能性があるため)
2. 新規実装: `git status --short` の出力が空で、かつ次のいずれかに当たる場合は、下記「worktree の作成」に従う
   - `develop` にいる
   - `develop` / `main` 以外の作業ブランチにいて、`git rev-list --count origin/develop..HEAD` が `0`(`origin/develop` に無いコミットが無い)
3. 上記に当たらない(メインの作業ツリーにコミット・未コミットの差分がある)場合
   - 同じタスクの継続である(ユーザーが継続と明示した、またはメインの作業ツリーのブランチ・作業ディレクトリがそのタスクのものである)場合は、メインの作業ツリーで続ける
   - 別タスクであることが依頼から明らかな場合(別の作業ディレクトリ・別 issue 等)は、メインの作業ツリーの差分・ブランチには触れずに、下記「worktree の作成」に従う
   - どちらか判断できない場合は、着手前にユーザーに確認する

## worktree の作成

- 配置先はリポジトリ外の兄弟ディレクトリ `../project-ts-items-worktrees/<ブランチ名の / を - に置き換えた名前>` とする(例: `docs/ai-worktree-rule` なら `../project-ts-items-worktrees/docs-ai-worktree-rule`)。リポジトリ内(`.claude/worktrees/` 等)に置くと、ルートの cspell / knip / oxfmt / oxlint / 型チェックの検査対象に入る
- 作業ブランチは worktree の作成と同時に `origin/develop` から切る: `git worktree add -b <branch> --no-track <配置先> origin/develop`。ブランチ名と `--no-track` の理由は `.claude/rules/commit.md` に従う
  - 作業ブランチにいる場合も、そのブランチは使わずに新しいブランチを切る。メインの作業ツリーでチェックアウト中のブランチは、別の worktree でチェックアウトできない(`is already used by worktree` で失敗する)
  - 同名のブランチや配置先が既にあって失敗した場合は、別名で作り直さない。`git worktree list` で既存の worktree を確認し、どれで作業するかユーザーに確認する(同じタスクの作業場所が2つに分かれるため)
- Claude Code の `EnterWorktree` は、作成した worktree を `path` で指定して入る。`name` 指定では `.claude/worktrees/` 配下に作られ、起点も `develop` にならないため使わない
- worktree に入ったら、最初の変更の前に次を行う
  - `bun install` を実行する。`node_modules/`・共有パッケージの `dist/`・husky の `.husky/_` は git 管理外のため worktree には無く、`bun install`(`prepare` で husky のセットアップと `prepare:build` も走る)を実行するまで lint・テスト・`commit-msg` フックが動かない
  - `git branch --show-current` で、対象タスク用のブランチになっていることを確認する
- website の `.env.local` など、gitignore 済みのローカルファイルも worktree には無い。必要な場合は worktree 内で `bun setup:env` を実行して生成する(手順は `docs/development-setup.md`)

## worktree での作業

- `ai-communication/` は git 管理外のため worktree には無い。`task.md` の読み取りと `result_*.md` の作成、`review_*.md` の読み取りは、メインの作業ツリーの `ai-communication/<作業ディレクトリ>/` に対して絶対パスで行う。worktree 内に `ai-communication/` を作らない
- `result_*.md` の `- worktree:` には、worktree の絶対パスを書く(`.claude/rules/ai-communication.md` を参照)。codex がメインの作業ツリーで起動された場合でも、このパスを手掛かりに worktree 側の実コードを確認できるようにするため。`- branch:` には作業ブランチ名を書く。どちらも上記「作業場所の判定」の再開の判定に使う
- `retrospective` agent を呼び出す場合は、作業ディレクトリをメインの作業ツリー側の絶対パスで、git の確認先として worktree の絶対パスを渡す
- push はユーザーが worktree から実行する
- worktree の削除(`git worktree remove`)とブランチの削除は、ユーザーの明示的な承認を得ずに行わない。`ExitWorktree` で抜ける場合は `action: "keep"` とする
