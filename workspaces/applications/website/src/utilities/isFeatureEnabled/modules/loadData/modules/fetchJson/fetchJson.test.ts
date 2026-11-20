import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"

import { fetchJson } from "./fetchJson.ts"

const JSON_URL = "https://example.com/featureFlag.json"
const server = setupServer()

describe(fetchJson, () => {
  beforeAll(() => {
    server.listen({ onUnhandledFrame: "error" })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it("base URL の直下の featureFlag.json を取得し、パース前の値を返す", async () => {
    expect.hasAssertions()
    server.use(http.get(JSON_URL, () => HttpResponse.json({ unknownFeature: "on" })))
    await expect(fetchJson("https://example.com")).resolves.toStrictEqual({
      unknownFeature: "on",
    })
  })

  it("レスポンスが 2xx 以外のとき、reject する", async () => {
    expect.hasAssertions()
    server.use(http.get(JSON_URL, () => new HttpResponse(null, { status: 404 })))
    await expect(fetchJson("https://example.com")).rejects.toThrow(
      "failed to fetch featureFlag.json: 404",
    )
  })
})
