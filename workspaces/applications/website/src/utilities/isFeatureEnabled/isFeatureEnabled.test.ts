import { describe, expect, it, vi } from "vitest"

import { isFeatureEnabled } from "./isFeatureEnabled.ts"
import { loadData } from "./modules/loadData/loadData.ts"

vi.mock(import("./modules/loadData/loadData.ts"), () => ({ loadData: vi.fn<typeof loadData>() }))

describe(isFeatureEnabled, () => {
  it.each([
    ["enabled のとき", true, { sampleFeature: "enabled" }],
    ["disabled のとき", false, { sampleFeature: "disabled" }],
    ["無いとき", false, {}],
  ] as const)("対象の feature flag が%s、%s を返す", async (_, expected, featureFlag) => {
    expect.hasAssertions()
    vi.mocked(loadData).mockResolvedValueOnce(featureFlag)
    await expect(isFeatureEnabled("sampleFeature")).resolves.toBe(expected)
  })

  it.each([[false]] as const)("読み込みに失敗したとき、%s を返す", async (expected) => {
    expect.hasAssertions()
    vi.mocked(loadData).mockRejectedValueOnce(new Error("failed"))
    await expect(isFeatureEnabled("sampleFeature")).resolves.toBe(expected)
  })
})
