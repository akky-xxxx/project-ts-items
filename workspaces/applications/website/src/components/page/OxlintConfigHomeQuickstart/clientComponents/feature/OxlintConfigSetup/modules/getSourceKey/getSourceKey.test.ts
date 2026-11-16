import { describe, expect, it } from "vitest"

import { getSourceKey } from "./getSourceKey.ts"

describe("getSourceKey", () => {
  it.each([
    {
      enabledSwitches: { storybook: false, typeAwareLinting: false },
      expected: "ts&typeAwareLinting=false&storybook=false",
      selectedBase: "ts",
    },
    {
      enabledSwitches: { storybook: true, typeAwareLinting: false },
      expected: "react&typeAwareLinting=false&storybook=true",
      selectedBase: "react",
    },
    {
      enabledSwitches: { storybook: false, typeAwareLinting: true },
      expected: "next&typeAwareLinting=true&storybook=false",
      selectedBase: "next",
    },
  ] as const)("ベースとスイッチの状態を & で連結したキー $expected を返す", (testCase) => {
    const { expected, ...formValues } = testCase

    expect(getSourceKey(formValues)).toBe(expected)
  })
})
