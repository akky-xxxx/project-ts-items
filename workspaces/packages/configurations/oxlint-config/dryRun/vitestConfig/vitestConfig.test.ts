import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({
  fixturesDirectory: "vitestConfig/fixtures",
  target: "vitest",
})

describe("vitestConfig", () => {
  it.each([
    ["noHooks/disabled.ts", "vitest(no-hooks)", "none"],
    ["noImportingVitestGlobals/disabled.ts", "vitest(no-importing-vitest-globals)", "none"],
    ["noMagicNumbers/invalid.ts", "eslint(no-magic-numbers)", "warning"],
    ["noMagicNumbers/spec/disabled.ts", "eslint(no-magic-numbers)", "none"],
    ["plugins/vitest.ts", "vitest(no-identical-title)", "error"],
    [
      "preferExpectAssertions/asyncFunction/invalid.ts",
      "vitest(prefer-expect-assertions)",
      "error",
    ],
    ["preferExpectAssertions/asyncFunction/valid.ts", "vitest(prefer-expect-assertions)", "none"],
    [
      "preferExpectAssertions/expectInCallback/invalid.ts",
      "vitest(prefer-expect-assertions)",
      "error",
    ],
    [
      "preferExpectAssertions/expectInCallback/valid.ts",
      "vitest(prefer-expect-assertions)",
      "none",
    ],
    ["preferExpectAssertions/expectInLoop/invalid.ts", "vitest(prefer-expect-assertions)", "error"],
    ["preferExpectAssertions/expectInLoop/valid.ts", "vitest(prefer-expect-assertions)", "none"],
    ["preferExpectAssertions/syncFunction/valid.ts", "vitest(prefer-expect-assertions)", "none"],
    ["preferImportingVitestGlobals/disabled.ts", "vitest(prefer-importing-vitest-globals)", "none"],
    [
      "preferImportingVitestGlobals/spec/invalid.ts",
      "vitest(prefer-importing-vitest-globals)",
      "error",
    ],
    ["requireTestTimeout/disabled.ts", "vitest(require-test-timeout)", "none"],
    ["validTitle/invalid.ts", "vitest(valid-title)", "error"],
    ["validTitle/valid.ts", "vitest(valid-title)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
