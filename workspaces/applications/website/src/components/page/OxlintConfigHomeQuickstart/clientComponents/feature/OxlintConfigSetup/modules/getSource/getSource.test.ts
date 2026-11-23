import { describe, expect, it } from "vitest"

import { EXPECTED_NEXT } from "./constants/EXPECTED_NEXT/EXPECTED_NEXT.ts"
import { EXPECTED_NEXT_WITH_ALL_SWITCHES } from "./constants/EXPECTED_NEXT_WITH_ALL_SWITCHES/EXPECTED_NEXT_WITH_ALL_SWITCHES.ts"
import { EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE } from "./constants/EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE/EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE.ts"
import { EXPECTED_REACT } from "./constants/EXPECTED_REACT/EXPECTED_REACT.ts"
import { EXPECTED_TS } from "./constants/EXPECTED_TS/EXPECTED_TS.ts"
import { EXPECTED_TS_WITH_STORYBOOK } from "./constants/EXPECTED_TS_WITH_STORYBOOK/EXPECTED_TS_WITH_STORYBOOK.ts"
import { EXPECTED_TS_WITH_TYPE_AWARE } from "./constants/EXPECTED_TS_WITH_TYPE_AWARE/EXPECTED_TS_WITH_TYPE_AWARE.ts"
import { EXPECTED_TS_WITH_VITEST } from "./constants/EXPECTED_TS_WITH_VITEST/EXPECTED_TS_WITH_VITEST.ts"
import { getSource } from "./getSource.ts"

const BASE_CASES = [
  { expected: EXPECTED_TS, selectedBase: "ts" },
  { expected: EXPECTED_REACT, selectedBase: "react" },
  { expected: EXPECTED_NEXT, selectedBase: "next" },
] as const

const SWITCH_CASES = [
  {
    enabledSwitches: { storybook: true, typeAwareLinting: false, vitest: false },
    expected: EXPECTED_TS_WITH_STORYBOOK,
    selectedBase: "ts",
    title: "storybook を有効にするとベースの設定に続けて storybookConfig を extends する",
  },
  {
    enabledSwitches: { storybook: false, typeAwareLinting: false, vitest: true },
    expected: EXPECTED_TS_WITH_VITEST,
    selectedBase: "ts",
    title: "vitest を有効にするとベースの設定に続けて vitestConfig を extends する",
  },
  {
    enabledSwitches: { storybook: false, typeAwareLinting: true, vitest: false },
    expected: EXPECTED_TS_WITH_TYPE_AWARE,
    selectedBase: "ts",
    title: "typeAwareLinting を有効にすると extends の後に typeAware の options を追加する",
  },
  {
    enabledSwitches: { storybook: true, typeAwareLinting: true, vitest: false },
    expected: EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE,
    selectedBase: "next",
    title: "storybook と typeAwareLinting を両方有効にすると両方の設定を出力する",
  },
  {
    enabledSwitches: { storybook: true, typeAwareLinting: true, vitest: true },
    expected: EXPECTED_NEXT_WITH_ALL_SWITCHES,
    selectedBase: "next",
    title:
      "全て有効にすると vitestConfig、storybookConfig の順に extends し typeAware の options を追加する",
  },
] as const

describe(getSource, () => {
  it.each(BASE_CASES)(
    "ベースに $selectedBase を選ぶと対応する設定だけを extends する",
    (testCase) => {
      const { expected, selectedBase } = testCase

      expect(
        getSource({
          enabledSwitches: { storybook: false, typeAwareLinting: false, vitest: false },
          selectedBase,
        }),
      ).toBe(expected)
    },
  )

  it.each(SWITCH_CASES)("enabledSwitches の $title", (testCase) => {
    const { enabledSwitches, expected, selectedBase } = testCase

    expect(getSource({ enabledSwitches, selectedBase })).toBe(expected)
  })
})
