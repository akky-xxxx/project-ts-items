import { describe, expect, it } from "bun:test"

import { withRulePrefix } from "./withRulePrefix.ts"

describe("withRulePrefix", () => {
  it("各ルール名の先頭に prefix を付ける", () => {
    expect(withRulePrefix("eslint", { "curly": "error", "new-cap": "off" })).toStrictEqual({
      "eslint/curly": "error",
      "eslint/new-cap": "off",
    })
  })

  it("オプション付きのルール値をそのまま引き継ぐ", () => {
    expect(
      withRulePrefix("react", {
        "only-export-components": ["error", { allowExportNames: ["metadata"] }],
      }),
    ).toStrictEqual({
      "react/only-export-components": ["error", { allowExportNames: ["metadata"] }],
    })
  })

  it("ルールが空なら空のオブジェクトを返す", () => {
    expect(withRulePrefix("eslint", {})).toStrictEqual({})
  })
})
