import { GITHUB_REST_DEFAULT_BASE_URL } from "../../constants/GITHUB_REST_DEFAULT_BASE_URL/GITHUB_REST_DEFAULT_BASE_URL.ts"

/**
 * @description
 * GitHub REST API のリクエスト先を返す。
 * 環境変数 GITHUB_REST_BASE_URL が未設定または空文字のときは、既定値を返す。
 * 生成した client がリクエストのたびに呼ぶため、起動時の環境変数で切り替えられる
 */
export const getGitHubRestBaseUrl = (): string => {
  const baseUrl = process.env.GITHUB_REST_BASE_URL
  if (baseUrl === undefined || baseUrl === "") {
    return GITHUB_REST_DEFAULT_BASE_URL
  }
  return baseUrl
}
