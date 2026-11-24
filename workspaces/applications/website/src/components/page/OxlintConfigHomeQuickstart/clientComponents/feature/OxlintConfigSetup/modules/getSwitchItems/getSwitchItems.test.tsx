import { createTranslator } from "next-intl"
import { describe, expect, it, vi } from "vitest"

import { siteDictionary } from "../../../../../../../../i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../../../../../../../../i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { SwitchDescription } from "../../components/SwitchDescription/SwitchDescription.tsx"
import { EXPECTED_LABEL_PROPS } from "./constants/EXPECTED_LABEL_PROPS/EXPECTED_LABEL_PROPS.ts"
import { getSwitchItems } from "./getSwitchItems.tsx"

type Input = Parameters<typeof getSwitchItems>[0]

const pageTranslate = createTranslator({
  locale: "en",
  messages: toLocaleMessages(siteDictionary, "en"),
  namespace: "pages",
})

const ALL_DISABLED = { storybook: false, typeAwareLinting: false, vitest: false }

const createInput = (enabledSwitches: Input["enabledSwitches"]) => {
  const toggleHandlers = {
    storybook: vi.fn<() => void>(),
    typeAwareLinting: vi.fn<() => void>(),
    vitest: vi.fn<() => void>(),
  }

  return {
    input: {
      enabledSwitches,
      handleToggleSwitch: (switchName: keyof typeof toggleHandlers) => toggleHandlers[switchName],
      pageTranslate,
    },
    toggleHandlers,
  }
}

describe(getSwitchItems, () => {
  it("type-aware linting、Vitest、Storybook の順に Toggle の props を返す", () => {
    const { input } = createInput(ALL_DISABLED)
    const items = getSwitchItems(input)

    expect(items.map((item) => ({ name: item.name, value: item.value }))).toStrictEqual([
      { name: "type-aware-linting", value: "type-aware-linting" },
      { name: "vitest", value: "vitest" },
      { name: "storybook", value: "storybook" },
    ])
  })

  it.each([
    { storybook: true, typeAwareLinting: false, vitest: false },
    { storybook: false, typeAwareLinting: true, vitest: false },
    { storybook: false, typeAwareLinting: false, vitest: true },
  ])(
    "checked に typeAwareLinting: $typeAwareLinting / vitest: $vitest / storybook: $storybook を反映する",
    (enabledSwitches) => {
      const { input } = createInput(enabledSwitches)
      const [typeAwareItem, vitestItem, storybookItem] = getSwitchItems(input)

      expect(typeAwareItem?.checked).toBe(enabledSwitches.typeAwareLinting)
      expect(vitestItem?.checked).toBe(enabledSwitches.vitest)
      expect(storybookItem?.checked).toBe(enabledSwitches.storybook)
    },
  )

  it("onChange にそれぞれ対応する handler を渡す", () => {
    const { input, toggleHandlers } = createInput(ALL_DISABLED)
    const [typeAwareItem, vitestItem, storybookItem] = getSwitchItems(input)

    expect(typeAwareItem?.onChange).toBe(toggleHandlers.typeAwareLinting)
    expect(vitestItem?.onChange).toBe(toggleHandlers.vitest)
    expect(storybookItem?.onChange).toBe(toggleHandlers.storybook)
  })

  it("labelNode に SwitchDescription で見出しと説明を渡す", () => {
    const { input } = createInput(ALL_DISABLED)
    const items = getSwitchItems(input)

    expect(items.map((item) => item.labelNode)).toMatchObject(
      EXPECTED_LABEL_PROPS.map((props) => ({ props, type: SwitchDescription })),
    )
  })
})
