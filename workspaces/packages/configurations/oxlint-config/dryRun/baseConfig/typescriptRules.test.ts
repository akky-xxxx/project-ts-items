import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({ fixturesDirectory: "baseConfig/fixtures", target: "base" })

describe("baseConfig の typescriptRules", () => {
  it.each([
    [
      "preferReadonlyParameterTypes/disabled.ts",
      "typescript(prefer-readonly-parameter-types)",
      "none",
    ],
    ["promiseFunctionAsync/invalid.ts", "typescript(promise-function-async)", "error"],
    ["requireAwait/invalid.ts", "typescript(require-await)", "error"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
