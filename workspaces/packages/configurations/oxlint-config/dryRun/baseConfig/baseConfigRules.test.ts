import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({ fixturesDirectory: "baseConfig/fixtures", target: "base" })

describe("baseConfig の rules", () => {
  it.each([
    ["consistentTypeSpecifierStyle/invalid.ts", "import(consistent-type-specifier-style)", "error"],
    ["consistentTypeSpecifierStyle/valid.ts", "import(consistent-type-specifier-style)", "none"],
    ["explicitFunctionReturnType/disabled.ts", "typescript(explicit-function-return-type)", "none"],
    [
      "explicitModuleBoundaryTypes/disabled.ts",
      "typescript(explicit-module-boundary-types)",
      "none",
    ],
    ["exportsLast/disabled.ts", "import(exports-last)", "none"],
    ["filenameCase/PascalCaseName.ts", "unicorn(filename-case)", "none"],
    ["groupExports/disabled.ts", "import(group-exports)", "none"],
    ["noAsyncAwait/disabled.ts", "oxc(no-async-await)", "none"],
    ["noDuplicateImports/invalid.ts", "eslint(no-duplicate-imports)", "error"],
    ["noDuplicateImports/valid.ts", "eslint(no-duplicate-imports)", "none"],
    ["noInlineComments/disabled.ts", "eslint(no-inline-comments)", "none"],
    ["noNamedExport/disabled.ts", "import(no-named-export)", "none"],
    ["noNestedTernary/invalid.ts", "eslint(no-nested-ternary)", "error"],
    ["noNull/disabled.ts", "unicorn(no-null)", "none"],
    ["noOptionalChaining/disabled.ts", "oxc(no-optional-chaining)", "none"],
    ["noRelativeParentImports/disabled.ts", "import(no-relative-parent-imports)", "none"],
    ["noRestSpreadProperties/disabled.ts", "oxc(no-rest-spread-properties)", "none"],
    ["noTernary/disabled.ts", "eslint(no-ternary)", "none"],
    ["noUndefined/disabled.ts", "eslint(no-undefined)", "none"],
    ["noUnneededTernary/invalid.ts", "eslint(no-unneeded-ternary)", "error"],
    ["noWarningComments/disabled.ts", "eslint(no-warning-comments)", "none"],
    ["oneVar/disabled.ts", "eslint(one-var)", "none"],
    ["preferDefaultExport/disabled.ts", "import(prefer-default-export)", "none"],
    ["sortImports/disabled.ts", "eslint(sort-imports)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
