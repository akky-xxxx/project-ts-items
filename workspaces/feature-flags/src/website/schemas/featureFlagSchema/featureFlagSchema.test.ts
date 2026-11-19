import { featureFlagSchema } from "@ts-items/feature-flags/website"
import { describe, expect, it } from "bun:test"

describe("featureFlagSchema", () => {
  it("enabled を受理する", () => {
    expect(featureFlagSchema.parse({ sampleFeature: "enabled" })).toEqual({
      sampleFeature: "enabled",
    })
  })

  it("disabled を受理する", () => {
    expect(featureFlagSchema.parse({ sampleFeature: "disabled" })).toEqual({
      sampleFeature: "disabled",
    })
  })

  it("enabled / disabled 以外の値を拒否する", () => {
    expect(featureFlagSchema.safeParse({ sampleFeature: "on" }).success).toBe(false)
  })

  it("空オブジェクトを受理する", () => {
    expect(featureFlagSchema.parse({})).toEqual({})
  })

  it("未知のキーを取り除いた値を返す", () => {
    expect(
      featureFlagSchema.parse({ removedFeature: "enabled", sampleFeature: "enabled" }),
    ).toEqual({
      sampleFeature: "enabled",
    })
  })
})
