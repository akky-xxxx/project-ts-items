import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest"

import { getPackageVersion } from "./getPackageVersion.ts"

import type { HttpResponseResolver } from "msw"

const ORIGINAL_NPM_REGISTRY_BASE_URL = process.env.NPM_REGISTRY_BASE_URL
const LATEST_URL = "https://registry.npmjs.org/@ts-items/oxlint-config/latest"
// 期待する URL 以外への GET は、実際に通信せずにネットワークエラーにする
const server = setupServer(http.get("*", () => HttpResponse.error()))

/** Latest の応答を resolver に差し替えて取得する */
const getVersionWith = async (resolver: HttpResponseResolver): Promise<string> => {
  server.use(http.get(LATEST_URL, resolver))
  return getPackageVersion("oxlint-config")
}

describe(getPackageVersion, () => {
  beforeAll(() => {
    server.listen({ onUnhandledFrame: "error" })
  })

  // リクエスト先を既定の registry に固定し、実行環境の NPM_REGISTRY_BASE_URL に依存させない
  beforeEach(() => {
    vi.stubEnv("NPM_REGISTRY_BASE_URL", "")
  })

  afterEach(() => {
    server.resetHandlers()
    vi.stubEnv("NPM_REGISTRY_BASE_URL", ORIGINAL_NPM_REGISTRY_BASE_URL)
  })

  afterAll(() => {
    server.close()
  })

  it("@ts-items/<パッケージ名>/latest を取得する", async () => {
    expect.hasAssertions()
    const requestUrls: string[] = []
    await getVersionWith(({ request }) => {
      requestUrls.push(request.url)
      return HttpResponse.json({ version: "1.2.3" })
    })
    expect(requestUrls).toStrictEqual([LATEST_URL])
  })

  it("200 が返るとき、レスポンスの version を返す", async () => {
    expect.hasAssertions()
    await expect(
      getVersionWith(() =>
        HttpResponse.json({
          dist: {
            shasum: "dummy-shasum",
            tarball: "https://registry.npmjs.org/@ts-items/oxlint-config/-/oxlint-config-1.2.3.tgz",
          },
          name: "@ts-items/oxlint-config",
          version: "1.2.3",
        }),
      ),
    ).resolves.toBe("1.2.3")
  })

  it.each([
    ["404 が返る", () => HttpResponse.json("Not Found", { status: 404 })],
    ["通信エラーになる", () => HttpResponse.error()],
    ["JSON でない応答が返る", () => HttpResponse.text("not json")],
  ])("%s とき、--- を返す", async (_, resolver) => {
    expect.hasAssertions()
    await expect(getVersionWith(resolver)).resolves.toBe("---")
  })
})
