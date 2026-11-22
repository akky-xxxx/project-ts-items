// oxlint-disable-next-line import/no-unassigned-import -- server-only is a side-effect-only guard that keeps the token out of client bundles
import "server-only"
import { GITHUB_REST_API_VERSION } from "../../constants/GITHUB_REST_API_VERSION/GITHUB_REST_API_VERSION.ts"

const HTTP_STATUS_NO_CONTENT = 204
const HTTP_STATUS_RESET_CONTENT = 205
const HTTP_STATUS_NOT_MODIFIED = 304
/** Body を持たない応答のステータス(orval が生成する既定の fetch client と同じ) */
const NO_BODY_STATUSES = new Set([
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_NOT_MODIFIED,
  HTTP_STATUS_RESET_CONTENT,
])

/** GitHub が推奨するヘッダーと、環境変数 GITHUB_REST_TOKEN があれば認証ヘッダーを付ける。呼び出し側の指定を優先する */
const buildHeaders = (init: HeadersInit | undefined): Headers => {
  const headers = new Headers({
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_REST_API_VERSION,
  })
  const token = process.env.GITHUB_REST_TOKEN
  if (token !== undefined && token !== "") {
    headers.set("Authorization", `Bearer ${token}`)
  }
  for (const [key, value] of new Headers(init)) {
    headers.set(key, value)
  }
  return headers
}

/**
 * @description
 * orval が生成する GitHub REST API の client から呼ばれる fetch(mutator)。
 * ヘッダーを付けるほかは、orval の既定の fetch client と同じ形({ data, status, headers })で応答を返す。
 * 応答の型 TResponse は生成した client が operation ごとに指定するため、ここでは検証せずに TResponse として返す
 */
export const gitHubRestFetch = async <TResponse>(
  url: string,
  options: RequestInit,
): Promise<TResponse> => {
  const response = await fetch(url, { ...options, headers: buildHeaders(options.headers) })
  const body = NO_BODY_STATUSES.has(response.status) ? "" : await response.text()
  const data: unknown = body === "" ? {} : JSON.parse(body)
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- orval's mutator contract lets the generated client choose the response type per operation
  return { data, headers: response.headers, status: response.status } as TResponse
}
