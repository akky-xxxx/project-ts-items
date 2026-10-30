import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({ fixturesDirectory: "baseConfig/fixtures", target: "base" })

describe("baseConfig の eslintRules", () => {
  it.each([
    ["arrowBodyStyle/invalid.ts", "eslint(arrow-body-style)", "error"],
    ["arrowBodyStyle/valid.ts", "eslint(arrow-body-style)", "none"],
    ["complexity/invalid.ts", "eslint(complexity)", "error"],
    ["complexity/valid.ts", "eslint(complexity)", "none"],
    ["curly/invalid.ts", "eslint(curly)", "warning"],
    ["maxDepth/invalid.ts", "eslint(max-depth)", "error"],
    ["maxDepth/valid.ts", "eslint(max-depth)", "none"],
    ["maxLines/invalid.ts", "eslint(max-lines)", "error"],
    ["maxLines/valid.ts", "eslint(max-lines)", "none"],
    ["maxLinesPerFunction/iife.ts", "eslint(max-lines-per-function)", "error"],
    ["maxLinesPerFunction/invalid.ts", "eslint(max-lines-per-function)", "error"],
    ["maxLinesPerFunction/skipBlankLinesAndComments.ts", "eslint(max-lines-per-function)", "none"],
    ["maxLinesPerFunction/valid.ts", "eslint(max-lines-per-function)", "none"],
    ["maxNestedCallbacks/invalid.ts", "eslint(max-nested-callbacks)", "error"],
    ["maxNestedCallbacks/valid.ts", "eslint(max-nested-callbacks)", "none"],
    ["maxParams/invalid.ts", "eslint(max-params)", "warning"],
    ["maxParams/valid.ts", "eslint(max-params)", "none"],
    ["maxStatements/invalid.ts", "eslint(max-statements)", "error"],
    ["maxStatements/valid.ts", "eslint(max-statements)", "none"],
    ["noImplicitCoercion/boolean.ts", "eslint(no-implicit-coercion)", "warning"],
    ["noImplicitCoercion/number.ts", "eslint(no-implicit-coercion)", "warning"],
    ["noImplicitCoercion/string.ts", "eslint(no-implicit-coercion)", "warning"],
    ["noMagicNumbers/invalid.ts", "eslint(no-magic-numbers)", "warning"],
    ["noParamReassign/invalid.ts", "eslint(no-param-reassign)", "error"],
    ["noParamReassign/props.ts", "eslint(no-param-reassign)", "error"],
    ["noUseBeforeDefine/invalid.ts", "eslint(no-use-before-define)", "error"],
    ["preferNamedCaptureGroup/invalid.ts", "eslint(prefer-named-capture-group)", "warning"],
    ["preferNamedCaptureGroup/valid.ts", "eslint(prefer-named-capture-group)", "none"],
    ["requireAwait/invalid.ts", "eslint(require-await)", "none"],
    ["sortKeys/invalid.ts", "eslint(sort-keys)", "warning"],
    ["sortKeys/valid.ts", "eslint(sort-keys)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
