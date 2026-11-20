import { afterEach, describe, expect, it, vi } from "vitest"

import { loadData } from "./loadData.ts"
import { fetchJson } from "./modules/fetchJson/fetchJson.ts"
import { readJson } from "./modules/readJson/readJson.ts"

vi.mock(import("./modules/fetchJson/fetchJson.ts"), () => ({
  fetchJson: vi.fn<typeof fetchJson>(),
}))
vi.mock(import("./modules/readJson/readJson.ts"), () => ({
  readJson: vi.fn<typeof readJson>(),
}))

const ORIGINAL_FEATURE_FLAG_URL = process.env.FEATURE_FLAG_URL

describe(loadData, () => {
  afterEach(() => {
    vi.stubEnv("FEATURE_FLAG_URL", ORIGINAL_FEATURE_FLAG_URL)
    vi.clearAllMocks()
  })

  it.each([
    ["未設定", undefined],
    ["空文字", ""],
  ])("環境変数 FEATURE_FLAG_URL が%sのとき、reject する", async (_, value) => {
    expect.hasAssertions()
    vi.stubEnv("FEATURE_FLAG_URL", value)
    await expect(loadData()).rejects.toThrow("FEATURE_FLAG_URL is not defined")
  })

  it("https の URL のとき、その URL から取得してパースした値を返す", async () => {
    expect.hasAssertions()
    vi.stubEnv("FEATURE_FLAG_URL", "https://example.com")
    vi.mocked(fetchJson).mockResolvedValueOnce({ sampleFeature: "enabled", unknownFeature: "on" })
    await expect(loadData()).resolves.toStrictEqual({ sampleFeature: "enabled" })
    expect(fetchJson).toHaveBeenCalledWith("https://example.com")
    expect(readJson).not.toHaveBeenCalled()
  })

  it("https 以外のとき、ファイルのパスとして読み込んでパースした値を返す", async () => {
    expect.hasAssertions()
    vi.stubEnv("FEATURE_FLAG_URL", "../../feature-flags/featureFlag.json")
    vi.mocked(readJson).mockResolvedValueOnce({ sampleFeature: "disabled" })
    await expect(loadData()).resolves.toStrictEqual({ sampleFeature: "disabled" })
    expect(readJson).toHaveBeenCalledWith("../../feature-flags/featureFlag.json")
    expect(fetchJson).not.toHaveBeenCalled()
  })

  it("読み込んだ値がスキーマに合わないとき、reject する", async () => {
    expect.hasAssertions()
    vi.stubEnv("FEATURE_FLAG_URL", "../../feature-flags/featureFlag.json")
    vi.mocked(readJson).mockResolvedValueOnce({ sampleFeature: "on" })
    await expect(loadData()).rejects.toThrow("invalid_value")
  })
})
