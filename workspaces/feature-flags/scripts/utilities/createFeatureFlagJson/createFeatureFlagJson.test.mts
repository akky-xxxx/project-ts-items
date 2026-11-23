import { describe, expect, it } from "bun:test"

import { createFeatureFlagJson } from "./createFeatureFlagJson.mts"

describe("createFeatureFlagJson", () => {
  it("スキーマに一致する値を、インデント2の JSON 文字列にする", () => {
    expect(createFeatureFlagJson({ sampleFeature: "enabled" })).toBe(
      '{\n  "sampleFeature": "enabled"\n}',
    )
  })

  it("未知のキーを取り除いた JSON 文字列にする", () => {
    expect(createFeatureFlagJson({ removedFeature: "enabled", sampleFeature: "disabled" })).toBe(
      '{\n  "sampleFeature": "disabled"\n}',
    )
  })

  it("スキーマに一致しない値の場合は、不正なキーを示すメッセージの例外を投げる", () => {
    expect(() => createFeatureFlagJson({ sampleFeature: "on" })).toThrow(
      "✖ Invalid input\n  → at sampleFeature",
    )
  })
})
