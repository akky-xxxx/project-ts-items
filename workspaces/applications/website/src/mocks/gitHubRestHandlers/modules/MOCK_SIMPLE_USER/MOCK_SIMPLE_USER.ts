import type { GitHubSimpleUser } from "../../../../generated/gitHubRest/gitHubRest.ts"

const USER_URL = "https://api.github.com/users/user-mock"

/** モックの commit・release の作成者 */
export const MOCK_SIMPLE_USER = {
  avatar_url: "https://avatars.githubusercontent.com/u/1",
  events_url: `${USER_URL}/events{/privacy}`,
  followers_url: `${USER_URL}/followers`,
  following_url: `${USER_URL}/following{/other_user}`,
  gists_url: `${USER_URL}/gists{/gist_id}`,
  gravatar_id: "",
  html_url: "https://github.com/user-mock",
  id: 1,
  login: "user-mock",
  node_id: "node-id-mock",
  organizations_url: `${USER_URL}/orgs`,
  received_events_url: `${USER_URL}/received_events`,
  repos_url: `${USER_URL}/repos`,
  site_admin: false,
  starred_url: `${USER_URL}/starred{/owner}{/repo}`,
  subscriptions_url: `${USER_URL}/subscriptions`,
  type: "User",
  url: USER_URL,
} as const satisfies GitHubSimpleUser
