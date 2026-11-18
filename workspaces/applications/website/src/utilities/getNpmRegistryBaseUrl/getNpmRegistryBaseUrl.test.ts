import { afterEach, describe, expect, it, vi } from "vitest"

import { getNpmRegistryBaseUrl } from "./getNpmRegistryBaseUrl.ts"

const ORIGINAL_NPM_REGISTRY_BASE_URL = process.env.NPM_REGISTRY_BASE_URL

describe(getNpmRegistryBaseUrl, () => {
  afterEach(() => {
    vi.stubEnv("NPM_REGISTRY_BASE_URL", ORIGINAL_NPM_REGISTRY_BASE_URL)
  })

  it.each([
    ["未設定", undefined],
    ["空文字", ""],
  ])("環境変数 NPM_REGISTRY_BASE_URL が%sのとき、npm の registry を返す", (_, value) => {
    vi.stubEnv("NPM_REGISTRY_BASE_URL", value)
    expect(getNpmRegistryBaseUrl()).toBe("https://registry.npmjs.org")
  })

  it("環境変数 NPM_REGISTRY_BASE_URL が設定されているとき、その値を返す", () => {
    vi.stubEnv("NPM_REGISTRY_BASE_URL", "http://localhost:4873")
    expect(getNpmRegistryBaseUrl()).toBe("http://localhost:4873")
  })
})
