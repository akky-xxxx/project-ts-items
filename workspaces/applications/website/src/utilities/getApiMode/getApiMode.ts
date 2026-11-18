/**
 * @description
 * 外部 API のリクエストを、msw のモックに向けるか(mock)、実際の API に送るか(real)を返す。
 * next dev のときに限り、環境変数 API_MOCKING が enabled ならモックに向ける。
 * next start などでは、環境変数を設定してもモックにしない
 */
export const getApiMode = (): "mock" | "real" => {
  if (process.env.NODE_ENV !== "development" || process.env.API_MOCKING !== "enabled") {
    return "real"
  }
  return "mock"
}
