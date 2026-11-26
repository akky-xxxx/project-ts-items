import { describe, expect, it } from "vitest"

import { getAllEnabledSwitches } from "./getAllEnabledSwitches.ts"

describe(getAllEnabledSwitches, () => {
  it("スイッチの有効/無効の全組み合わせを返す", () => {
    expect(getAllEnabledSwitches()).toStrictEqual([
      { storybook: false, typeAwareLinting: false, vitest: false },
      { storybook: true, typeAwareLinting: false, vitest: false },
      { storybook: false, typeAwareLinting: false, vitest: true },
      { storybook: true, typeAwareLinting: false, vitest: true },
      { storybook: false, typeAwareLinting: true, vitest: false },
      { storybook: true, typeAwareLinting: true, vitest: false },
      { storybook: false, typeAwareLinting: true, vitest: true },
      { storybook: true, typeAwareLinting: true, vitest: true },
    ])
  })
})
