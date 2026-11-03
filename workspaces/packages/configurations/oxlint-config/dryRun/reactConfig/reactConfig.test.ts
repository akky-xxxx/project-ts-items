import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({
  fixturesDirectory: "reactConfig/fixtures",
  target: "react",
})

describe("reactConfig", () => {
  it.each([
    ["extends/baseConfig.tsx", "eslint(no-nested-ternary)", "error"],
    ["forbidComponentProps/invalid.tsx", "react(forbid-component-props)", "error"],
    ["forbidComponentProps/valid.tsx", "react(forbid-component-props)", "none"],
    ["functionComponentDefinition/invalid.tsx", "react(function-component-definition)", "error"],
    ["functionComponentDefinition/valid.tsx", "react(function-component-definition)", "none"],
    ["jsxFilenameExtension/invalid.jsx", "react(jsx-filename-extension)", "error"],
    ["jsxFilenameExtension/valid.tsx", "react(jsx-filename-extension)", "none"],
    ["jsxMaxDepth/invalid.tsx", "react(jsx-max-depth)", "error"],
    ["jsxMaxDepth/valid.tsx", "react(jsx-max-depth)", "none"],
    ["jsxNoLiterals/disabled.tsx", "react(jsx-no-literals)", "none"],
    ["jsxPropsNoSpreading/disabled.tsx", "react(jsx-props-no-spreading)", "none"],
    ["plugins/reactPerf.tsx", "react-perf(jsx-no-new-object-as-prop)", "error"],
    ["reactInJsxScope/disabled.tsx", "react(react-in-jsx-scope)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
