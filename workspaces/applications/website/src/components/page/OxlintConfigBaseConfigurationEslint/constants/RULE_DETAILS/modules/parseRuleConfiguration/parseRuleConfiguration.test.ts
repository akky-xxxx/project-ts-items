import { describe, it, expect } from "vitest"

import { parseRuleConfiguration } from "./parseRuleConfiguration.ts"

describe(parseRuleConfiguration, () => {
  it("eslint/arrow-body-style", () => {
    expect(parseRuleConfiguration("eslint/arrow-body-style")).toStrictEqual({
      option: "as-needed",
      severity: "error",
    })
  })

  it("eslint/no-use-before-define", () => {
    expect(parseRuleConfiguration("eslint/no-use-before-define")).toStrictEqual({
      severity: "error",
    })
  })
})
