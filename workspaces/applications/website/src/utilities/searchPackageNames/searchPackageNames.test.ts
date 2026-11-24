import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"

import { npmRegistryHandlers } from "../../mocks/npmRegistryHandlers/npmRegistryHandlers.ts"
import { searchPackageNames } from "./searchPackageNames.ts"

import type { HttpResponseResolver } from "msw"

const SEARCH_URL = "https://registry.npmjs.org/-/v1/search"
const server = setupServer(...npmRegistryHandlers)

// 名前のあるもの・名前の無いもの・package 自体が無いものを混ぜた検索結果
const SEARCH_OBJECTS = [
  { package: { name: "@ts-items/oxlint-config", version: "1.2.3" } },
  { package: { version: "7.8.9" } },
  {},
  { package: { name: "@ts-items/oxfmt-config" } },
]

/** Search の応答を resolver に差し替えて取得する */
const searchWith = async (resolver: HttpResponseResolver): Promise<string[]> => {
  server.use(http.get(SEARCH_URL, resolver))
  return searchPackageNames()
}

describe(searchPackageNames, () => {
  beforeAll(() => {
    server.listen({ onUnhandledFrame: "error" })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it("@ts-items で search する", async () => {
    expect.hasAssertions()
    const searchTexts: (string | null)[] = []
    await searchWith((info) => {
      searchTexts.push(new URL(info.request.url).searchParams.get("text"))
      return HttpResponse.json({ objects: [] })
    })
    expect(searchTexts).toStrictEqual(["@ts-items"])
  })

  it("名前のある検索結果だけを、パッケージ名の配列にして返す", async () => {
    expect.hasAssertions()
    await expect(
      searchWith(() => HttpResponse.json({ objects: SEARCH_OBJECTS })),
    ).resolves.toStrictEqual(["@ts-items/oxlint-config", "@ts-items/oxfmt-config"])
  })

  it.each([
    ["400 が返る", () => HttpResponse.json({ message: "bad request" }, { status: 400 })],
    ["通信エラーになる", () => HttpResponse.error()],
    ["JSON でない応答が返る", () => HttpResponse.text("not json")],
  ])("%s とき、空の配列を返す", async (_, resolver) => {
    expect.hasAssertions()
    await expect(searchWith(resolver)).resolves.toStrictEqual([])
  })

  it("モックのハンドラでは、このリポジトリのパッケージ名に -mock を付けて返す", async () => {
    expect.hasAssertions()
    await expect(searchPackageNames()).resolves.toStrictEqual([
      "@ts-items/oxfmt-config-mock",
      "@ts-items/oxlint-config-mock",
      "@ts-items/react-types-mock",
    ])
  })
})
