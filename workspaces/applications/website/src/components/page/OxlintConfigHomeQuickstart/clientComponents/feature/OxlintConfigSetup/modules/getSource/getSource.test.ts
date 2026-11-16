import { describe, expect, it } from "vitest"

import { EXPECTED_NEXT } from "./constants/EXPECTED_NEXT/EXPECTED_NEXT.ts"
import { EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE } from "./constants/EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE/EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE.ts"
import { EXPECTED_REACT } from "./constants/EXPECTED_REACT/EXPECTED_REACT.ts"
import { EXPECTED_TS } from "./constants/EXPECTED_TS/EXPECTED_TS.ts"
import { EXPECTED_TS_WITH_STORYBOOK } from "./constants/EXPECTED_TS_WITH_STORYBOOK/EXPECTED_TS_WITH_STORYBOOK.ts"
import { EXPECTED_TS_WITH_TYPE_AWARE } from "./constants/EXPECTED_TS_WITH_TYPE_AWARE/EXPECTED_TS_WITH_TYPE_AWARE.ts"
import { getSource } from "./getSource.ts"

const BASE_CASES = [
  { expected: EXPECTED_TS, selectedBase: "ts" },
  { expected: EXPECTED_REACT, selectedBase: "react" },
  { expected: EXPECTED_NEXT, selectedBase: "next" },
] as const

describe("getSource", () => {
  it.each(BASE_CASES)(
    "ベースに $selectedBase を選ぶと対応する設定だけを extends する",
    (testCase) => {
      const { expected, selectedBase } = testCase

      expect(
        getSource({
          enabledSwitches: { storybook: false, typeAwareLinting: false },
          selectedBase,
        }),
      ).toBe(expected)
    },
  )

  it("Storybook を有効にするとベースの設定に続けて storybookConfig を extends する", () => {
    expect(
      getSource({
        enabledSwitches: { storybook: true, typeAwareLinting: false },
        selectedBase: "ts",
      }),
    ).toBe(EXPECTED_TS_WITH_STORYBOOK)
  })

  it("type-aware linting を有効にすると extends の後に typeAware の options を追加する", () => {
    expect(
      getSource({
        enabledSwitches: { storybook: false, typeAwareLinting: true },
        selectedBase: "ts",
      }),
    ).toBe(EXPECTED_TS_WITH_TYPE_AWARE)
  })

  it("Storybook と type-aware linting を両方有効にすると両方の設定を出力する", () => {
    expect(
      getSource({
        enabledSwitches: { storybook: true, typeAwareLinting: true },
        selectedBase: "next",
      }),
    ).toBe(EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE)
  })
})
