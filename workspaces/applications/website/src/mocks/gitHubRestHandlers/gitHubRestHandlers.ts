import { http, HttpResponse } from "msw"

import { getGitHubRestBaseUrl } from "../../utilities/getGitHubRestBaseUrl/getGitHubRestBaseUrl.ts"
import { MOCK_COMMITS } from "./modules/MOCK_COMMITS/MOCK_COMMITS.ts"
import { MOCK_RELEASES } from "./modules/MOCK_RELEASES/MOCK_RELEASES.ts"

/**
 * @description
 * GitHub REST API のモック。owner・repo を問わず、末尾に -mock を付けた commit・release を返す(実際の結果と見分けるため)。
 * リクエスト先は、生成した client と同じく環境変数 GITHUB_REST_BASE_URL に合わせる
 */
export const gitHubRestHandlers = [
  http.get(`${getGitHubRestBaseUrl()}/repos/:owner/:repo/commits`, () =>
    HttpResponse.json(MOCK_COMMITS),
  ),
  http.get(`${getGitHubRestBaseUrl()}/repos/:owner/:repo/releases`, () =>
    HttpResponse.json(MOCK_RELEASES),
  ),
]
