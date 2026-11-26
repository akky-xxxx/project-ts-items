import { describe, expect, it } from "vitest"

import { getSourceKey } from "./getSourceKey.ts"

describe(getSourceKey, () => {
  it.each([
    {
      enabledSwitches: { storybook: false, typeAwareLinting: false, vitest: false },
      expected: "ts&typeAwareLinting=false&vitest=false&storybook=false",
      selectedBase: "ts",
    },
    {
      enabledSwitches: { storybook: true, typeAwareLinting: false, vitest: true },
      expected: "react&typeAwareLinting=false&vitest=true&storybook=true",
      selectedBase: "react",
    },
    {
      enabledSwitches: { storybook: false, typeAwareLinting: true, vitest: false },
      expected: "next&typeAwareLinting=true&vitest=false&storybook=false",
      selectedBase: "next",
    },
  ] as const)("ベースとスイッチの状態を & で連結したキー $expected を返す", (testCase) => {
    const { expected, ...formValues } = testCase

    expect(getSourceKey(formValues)).toBe(expected)
  })
})
