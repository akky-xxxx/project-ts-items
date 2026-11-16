import { describe, expect, it } from "vitest"

import { getAllEnabledSwitches } from "./getAllEnabledSwitches.ts"

describe("getAllEnabledSwitches", () => {
  it("スイッチの有効/無効の全組み合わせを返す", () => {
    expect(getAllEnabledSwitches()).toStrictEqual([
      { storybook: false, typeAwareLinting: false },
      { storybook: true, typeAwareLinting: false },
      { storybook: false, typeAwareLinting: true },
      { storybook: true, typeAwareLinting: true },
    ])
  })
})
