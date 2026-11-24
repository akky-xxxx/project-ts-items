import { describe, expect, it } from "vitest"

import { PACKAGE_MASTER } from "../PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { SORTED_PACKAGES_AS_DISPLAY_ORDER } from "./SORTED_PACKAGES_AS_DISPLAY_ORDER.ts"

import type { PackageName } from "../../types/PackageName/PackageName.ts"

describe("package master を配列にした上でユニーク性・同一性を担保", () => {
  it("配列数が PACKAGE_MASTER の keys と一致すること", () => {
    expect(SORTED_PACKAGES_AS_DISPLAY_ORDER).toHaveLength(Object.keys(PACKAGE_MASTER).length)
  })

  it("配列内に重複がないこと", () => {
    const names = SORTED_PACKAGES_AS_DISPLAY_ORDER.map(({ name }) => name)
    const setNames = new Set(names)
    expect(names).toHaveLength(setNames.size)
  })

  it("順序が意図したとおりになっていること", () => {
    const names = SORTED_PACKAGES_AS_DISPLAY_ORDER.map(({ name }) => name)
    const expected = ["oxlint-config", "oxfmt-config", "react-types"] as const satisfies PackageName[]
    expect(names).toStrictEqual(expected)
  })
})
