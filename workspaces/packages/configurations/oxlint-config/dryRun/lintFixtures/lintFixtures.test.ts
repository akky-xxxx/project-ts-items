import { describe, expect, it } from "bun:test"

import { lintFixtures } from "./lintFixtures.ts"

const getSeverity = await lintFixtures({ fixturesDirectory: "baseConfig/fixtures", target: "base" })

describe("lintFixtures", () => {
  it("fixture にルールの診断があれば severity(error)を返す", () => {
    expect(getSeverity("eslint(max-lines)", "maxLines/invalid.ts")).toBe("error")
  })

  it("fixture にルールの診断があれば severity(warning)を返す", () => {
    expect(getSeverity("eslint(curly)", "curly/invalid.ts")).toBe("warning")
  })

  it("同じ fixture でも別ルールの code なら none を返す", () => {
    expect(getSeverity("eslint(max-depth)", "maxLines/invalid.ts")).toBe("none")
  })

  it("同じルールでも別の fixture なら none を返す", () => {
    expect(getSeverity("eslint(max-lines)", "maxLinesPerFunction/invalid.ts")).toBe("none")
  })

  it("fixture のパスは完全一致で比較する", () => {
    expect(getSeverity("eslint(max-lines)", "Lines/invalid.ts")).toBe("none")
  })

  it("存在しない fixture なら none を返す", () => {
    expect(getSeverity("eslint(max-lines)", "notExist/invalid.ts")).toBe("none")
  })
})
