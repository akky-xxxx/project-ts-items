import { describe, expect, it } from "vitest"

import { createBaseConfigRuleDetails } from "./createBaseConfigRuleDetails.ts"

type Entry = [string, ReturnType<typeof createBaseConfigRuleDetails>["eslint"]]

const toCategoryRuleNamePairs = (entry: Entry) => {
  const [category, categoryDetails] = entry
  return categoryDetails.map((detail) => ({ category, ruleName: detail.ruleName }))
}

describe(createBaseConfigRuleDetails, () => {
  it("プレフィックスごとのカテゴリをキーに持つ", () => {
    expect(Object.keys(createBaseConfigRuleDetails()).toSorted()).toStrictEqual([
      "eslint",
      "import",
      "oxc",
      "typescript",
      "unicorn",
    ])
  })

  it.each([
    ["eslint", "eslint/arrow-body-style"],
    ["import", "import/consistent-type-specifier-style"],
    ["oxc", "oxc/no-async-await"],
    ["typescript", "typescript/consistent-type-definitions"],
    ["unicorn", "unicorn/no-null"],
  ] as const)("%s には %s が含まれる", (category, ruleName) => {
    const ruleNames = createBaseConfigRuleDetails()[category].map((detail) => detail.ruleName)
    expect(ruleNames).toContain(ruleName)
  })

  it("各カテゴリには同じプレフィックスのルールだけが含まれる", () => {
    const pairs = Object.entries(createBaseConfigRuleDetails()).flatMap(toCategoryRuleNamePairs)
    const mismatchedPairs = pairs.filter((pair) => !pair.ruleName.startsWith(`${pair.category}/`))
    expect(pairs.length).toBeGreaterThan(0)
    expect(mismatchedPairs).toStrictEqual([])
  })

  it("複数回呼び出してもルールが重複しない", () => {
    const first = createBaseConfigRuleDetails()
    const second = createBaseConfigRuleDetails()
    expect(second).toStrictEqual(first)
    expect(second).not.toBe(first)
  })
})
