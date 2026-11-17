import { isCommonAssetRequest } from "msw"
import { setupWorker } from "msw/browser"
import { HttpNetworkFrame } from "msw/experimental"

/**
 * @description
 * storybook の preview で msw-storybook-addon の createPreviewAnnotations に渡す setup。
 * ハンドラの無い外部オリジンへのリクエストは、実際には通信させず、console にエラーを出して 500 を返す。
 * Storybook / Vite 自身のリクエスト(同一オリジン)と静的アセットはそのまま通す
 */
export const setupMswWorkerForStorybook = async () => {
  const worker = setupWorker()
  await worker.start({
    onUnhandledFrame: (unhandled) => {
      const { defaults, frame } = unhandled
      if (!(frame instanceof HttpNetworkFrame)) {
        return
      }
      const { request } = frame.data
      if (new URL(request.url).origin === location.origin || isCommonAssetRequest(request)) {
        return
      }
      defaults.error()
      throw new Error(`[MSW] Unhandled external request: ${request.method} ${request.url}`)
    },
    quiet: true,
  })
  return worker
}
