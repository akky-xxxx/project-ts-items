/**
 * @description
 * Vercel Blob ストアの base URL の直下にある featureFlag.json を取得し、パース前の値を返す。
 * レスポンスが 2xx 以外のときは reject する
 */
export const fetchJson = async (baseUrl: string): Promise<unknown> => {
  const response = await fetch(`${baseUrl}/featureFlag.json`)

  if (!response.ok) {
    throw new Error(`failed to fetch featureFlag.json: ${String(response.status)}`)
  }

  return response.json()
}
