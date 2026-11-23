import { MOCK_SIMPLE_USER } from "../MOCK_SIMPLE_USER/MOCK_SIMPLE_USER.ts"

import type { GitHubCommit } from "../../../../generated/gitHubRest/gitHubRest.ts"

const REPOSITORY_URL = "https://api.github.com/repos/owner-mock/repo-mock"

/** Sha と message だけが異なる commit を作る */
const createCommit = (sha: string, message: string): GitHubCommit => ({
  author: MOCK_SIMPLE_USER,
  comments_url: `${REPOSITORY_URL}/commits/${sha}/comments`,
  commit: {
    author: { date: "2026-01-01T00:00:00Z", email: "user-mock@example.com", name: "user-mock" },
    comment_count: 0,
    committer: { date: "2026-01-01T00:00:00Z", email: "user-mock@example.com", name: "user-mock" },
    message,
    tree: { sha: `tree-${sha}`, url: `${REPOSITORY_URL}/git/trees/tree-${sha}` },
    url: `${REPOSITORY_URL}/git/commits/${sha}`,
  },
  committer: MOCK_SIMPLE_USER,
  html_url: `https://github.com/owner-mock/repo-mock/commit/${sha}`,
  node_id: `node-id-${sha}`,
  parents: [],
  sha,
  url: `${REPOSITORY_URL}/commits/${sha}`,
})

/** モックの commit 一覧(新しい順)。実際の結果と見分けるため、message の1行目の末尾に -mock を付ける */
export const MOCK_COMMITS = [
  createCommit("sha-mock-2", "fix(oxlint-config): fix rule-mock\n\nbody-mock"),
  createCommit("sha-mock-1", "feat(oxlint-config): add rule-mock"),
] as const satisfies GitHubCommit[]
