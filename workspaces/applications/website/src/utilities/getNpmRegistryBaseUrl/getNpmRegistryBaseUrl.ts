import { NPM_REGISTRY_DEFAULT_BASE_URL } from "../../constants/NPM_REGISTRY_DEFAULT_BASE_URL/NPM_REGISTRY_DEFAULT_BASE_URL.ts"

/**
 * @description
 * npm Registry API のリクエスト先を返す。
 * 環境変数 NPM_REGISTRY_BASE_URL が未設定または空文字のときは、既定値を返す。
 * 生成した client がリクエストのたびに呼ぶため、起動時の環境変数で切り替えられる
 */
export const getNpmRegistryBaseUrl = (): string => {
  const baseUrl = process.env.NPM_REGISTRY_BASE_URL
  if (baseUrl === undefined || baseUrl === "") {
    return NPM_REGISTRY_DEFAULT_BASE_URL
  }
  return baseUrl
}
