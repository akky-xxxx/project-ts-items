import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({ fixturesDirectory: "baseConfig/fixtures", target: "base" })

describe("baseConfig の categories / plugins", () => {
  it.each([
    ["categories/correctness.ts", "eslint(no-debugger)", "error"],
    ["categories/nursery.ts", "eslint(no-useless-assignment)", "none"],
    ["categories/pedantic.ts", "eslint(eqeqeq)", "error"],
    ["categories/perf.ts", "eslint(no-await-in-loop)", "error"],
    ["categories/restriction.ts", "eslint(no-console)", "error"],
    ["categories/style.ts", "eslint(prefer-template)", "error"],
    ["categories/suspicious.ts", "eslint(no-extend-native)", "error"],
    ["plugins/import.ts", "import(no-default-export)", "error"],
    ["plugins/oxc.ts", "oxc(no-const-enum)", "error"],
    ["plugins/unicorn.ts", "unicorn(prefer-includes)", "error"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
