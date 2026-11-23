import { afterEach, describe, expect, it, vi } from "vitest"

import { getGitHubRestBaseUrl } from "./getGitHubRestBaseUrl.ts"

const ORIGINAL_GITHUB_REST_BASE_URL = process.env.GITHUB_REST_BASE_URL

describe(getGitHubRestBaseUrl, () => {
  afterEach(() => {
    vi.stubEnv("GITHUB_REST_BASE_URL", ORIGINAL_GITHUB_REST_BASE_URL)
  })

  it.each([
    ["未設定", undefined],
    ["空文字", ""],
  ])(
    "環境変数 GITHUB_REST_BASE_URL が%sのとき、GitHub REST API の既定のリクエスト先を返す",
    (_, value) => {
      vi.stubEnv("GITHUB_REST_BASE_URL", value)
      expect(getGitHubRestBaseUrl()).toBe("https://api.github.com")
    },
  )

  it("環境変数 GITHUB_REST_BASE_URL が設定されているとき、その値を返す", () => {
    vi.stubEnv("GITHUB_REST_BASE_URL", "http://localhost:4873")
    expect(getGitHubRestBaseUrl()).toBe("http://localhost:4873")
  })
})
