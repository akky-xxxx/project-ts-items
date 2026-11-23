import { afterEach, describe, expect, it, vi } from "vitest"

import { getApiMode } from "./getApiMode.ts"

const ORIGINAL_API_MOCKING = process.env.API_MOCKING
const ORIGINAL_NODE_ENV = process.env.NODE_ENV

describe(getApiMode, () => {
  afterEach(() => {
    vi.stubEnv("API_MOCKING", ORIGINAL_API_MOCKING)
    vi.stubEnv("NODE_ENV", ORIGINAL_NODE_ENV)
  })

  it("development で API_MOCKING が enabled のとき、mock を返す", () => {
    vi.stubEnv("NODE_ENV", "development")
    vi.stubEnv("API_MOCKING", "enabled")
    expect(getApiMode()).toBe("mock")
  })

  it.each([
    ["production", "enabled"],
    ["test", "enabled"],
    ["development", undefined],
    ["development", "disabled"],
  ] as const)(
    "環境変数 NODE_ENV が %s で API_MOCKING が %s のとき、real を返す",
    (nodeEnv, apiMocking) => {
      vi.stubEnv("NODE_ENV", nodeEnv)
      vi.stubEnv("API_MOCKING", apiMocking)
      expect(getApiMode()).toBe("real")
    },
  )
})
