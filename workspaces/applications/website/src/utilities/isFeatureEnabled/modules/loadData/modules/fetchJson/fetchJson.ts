/**
 * @description
 * Vercel Blob ストアのルート直下にある featureFlag.json を取得し、パース前の値を返す。
 * base URL の末尾スラッシュの有無は問わない。レスポンスが 2xx 以外のときは reject する
 */
export const fetchJson = async (baseUrl: string): Promise<unknown> => {
  const response = await fetch(new URL("/featureFlag.json", baseUrl))

  if (!response.ok) {
    throw new Error(`failed to fetch featureFlag.json: ${String(response.status)}`)
  }

  return response.json()
}
