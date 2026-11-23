import { getApiMode } from "./utilities/getApiMode/getApiMode.ts"

/**
 * @description
 * Next のサーバーの起動時に呼ばれる。
 * 外部 API をモックに向けるとき(getApiMode を参照)だけ、Node.js のランタイムで msw を起動する。
 * ハンドラの無いリクエストは、そのまま実際の宛先に送る
 */
export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME !== "nodejs" || getApiMode() !== "mock") {
    return
  }
  const [{ setupServer }, { gitHubRestHandlers }, { npmRegistryHandlers }] = await Promise.all([
    import("msw/node"),
    import("./mocks/gitHubRestHandlers/gitHubRestHandlers.ts"),
    import("./mocks/npmRegistryHandlers/npmRegistryHandlers.ts"),
  ])
  setupServer(...gitHubRestHandlers, ...npmRegistryHandlers).listen({
    onUnhandledFrame: "bypass",
  })
}
