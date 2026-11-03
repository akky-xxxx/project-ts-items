import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({ fixturesDirectory: "baseConfig/fixtures", target: "base" })

describe("baseConfig の unicornRules", () => {
  it.each([
    ["noArrayCallbackReference/disabled.ts", "unicorn(no-array-callback-reference)", "none"],
    ["noArrayReduce/disabled.ts", "unicorn(no-array-reduce)", "none"],
    ["noImmediateMutation/disabled.ts", "unicorn(no-immediate-mutation)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
