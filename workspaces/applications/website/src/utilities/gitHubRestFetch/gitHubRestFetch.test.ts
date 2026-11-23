import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest"

import { gitHubRestFetch } from "./gitHubRestFetch.ts"

import type { HttpResponseResolver } from "msw"

type EchoResponse = { data: Record<string, string>; status: number }

vi.mock(import("server-only"), () => ({}))

const TEST_URL = "https://api.github.com/test"
const ORIGINAL_GITHUB_REST_TOKEN = process.env.GITHUB_REST_TOKEN
// 受け取ったリクエストのヘッダーを、そのまま応答の body として返す
const server = setupServer(
  http.get(TEST_URL, (info) => HttpResponse.json(Object.fromEntries(info.request.headers))),
)

/** 送ったリクエストのヘッダーを取得する */
const fetchSentHeaders = async (options: RequestInit = {}): Promise<Record<string, string>> => {
  const result = await gitHubRestFetch<EchoResponse>(TEST_URL, options)
  return result.data
}

const jsonResolver = (): Response => HttpResponse.json({ name: "release" }, { status: 201 })
const noContentResolver = (): Response => new HttpResponse(null, { status: 204 })

/** 応答を resolver に差し替えて取得する */
const fetchWith = async (resolver: HttpResponseResolver): Promise<EchoResponse> => {
  server.use(http.get(TEST_URL, resolver))
  return gitHubRestFetch<EchoResponse>(TEST_URL, {})
}

describe(gitHubRestFetch, () => {
  beforeAll(() => {
    server.listen({ onUnhandledFrame: "error" })
  })

  afterEach(() => {
    server.resetHandlers()
    vi.stubEnv("GITHUB_REST_TOKEN", ORIGINAL_GITHUB_REST_TOKEN)
  })

  afterAll(() => {
    server.close()
  })

  it("推奨ヘッダーとして Accept と X-GitHub-Api-Version を付ける", async () => {
    expect.hasAssertions()
    await expect(fetchSentHeaders()).resolves.toMatchObject({
      "accept": "application/vnd.github+json",
      "x-github-api-version": "2026-03-10",
    })
  })

  it.each([
    ["未設定", undefined],
    ["空文字", ""],
  ])("環境変数 GITHUB_REST_TOKEN が%sのとき、Authorization を付けない", async (_, value) => {
    expect.hasAssertions()
    vi.stubEnv("GITHUB_REST_TOKEN", value)
    await expect(fetchSentHeaders()).resolves.not.toHaveProperty("authorization")
  })

  it("環境変数 GITHUB_REST_TOKEN が設定されているとき、Bearer で Authorization を付ける", async () => {
    expect.hasAssertions()
    vi.stubEnv("GITHUB_REST_TOKEN", "test-token")
    await expect(fetchSentHeaders()).resolves.toHaveProperty("authorization", "Bearer test-token")
  })

  it("呼び出し側が同じヘッダーを指定したとき、呼び出し側の値を送る", async () => {
    expect.hasAssertions()
    const headers = { "X-GitHub-Api-Version": "2022-11-28" }
    await expect(fetchSentHeaders({ headers })).resolves.toHaveProperty(
      "x-github-api-version",
      "2022-11-28",
    )
  })

  it.each([
    ["JSON", jsonResolver, { data: { name: "release" }, status: 201 }],
    ["204(body 無し)", noContentResolver, { data: {}, status: 204 }],
  ])(
    "応答が %s のとき、body を data、ステータスを status として返す",
    async (_, resolver, expected) => {
      expect.hasAssertions()
      await expect(fetchWith(resolver)).resolves.toMatchObject(expected)
    },
  )
})
