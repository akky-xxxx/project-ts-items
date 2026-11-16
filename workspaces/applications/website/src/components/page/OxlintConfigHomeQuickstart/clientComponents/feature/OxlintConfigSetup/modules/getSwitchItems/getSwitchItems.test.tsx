import { createTranslator } from "next-intl"
import { describe, expect, it, vi } from "vitest"

import { siteDictionary } from "../../../../../../../../i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../../../../../../../../i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { SwitchDescription } from "../../components/SwitchDescription/SwitchDescription.tsx"
import { getSwitchItems } from "./getSwitchItems.tsx"

type Input = Parameters<typeof getSwitchItems>[0]

const pageTranslate = createTranslator({
  locale: "en",
  messages: toLocaleMessages(siteDictionary, "en"),
  namespace: "pages.oxlintConfigQuickstart",
})

const createInput = (enabledSwitches: Input["enabledSwitches"]) => {
  const toggleHandlers = { storybook: vi.fn(), typeAwareLinting: vi.fn() }

  return {
    input: {
      enabledSwitches,
      handleToggleSwitch: (switchName: keyof typeof toggleHandlers) => toggleHandlers[switchName],
      pageTranslate,
    },
    toggleHandlers,
  }
}

/** T.rich は `<br></br>` を renderLineBreak の要素に置き換え、前後の文字列と配列で返す */
const expectedTypeAwareDescription = [
  "Enables linting that uses type information (disabled by default in oxlint).",
  { type: "br" },
  "We recommend enabling it.",
  { type: "br" },
  'If you enable it, you need to install "oxlint-tsgolint".',
]

describe(getSwitchItems, () => {
  it("type-aware linting、Storybook の順に Toggle の props を返す", () => {
    const { input } = createInput({ storybook: false, typeAwareLinting: false })
    const items = getSwitchItems(input)

    expect(items.map((item) => ({ name: item.name, value: item.value }))).toStrictEqual([
      { name: "type-aware-linting", value: "type-aware-linting" },
      { name: "storybook", value: "storybook" },
    ])
  })

  it.each([
    { storybook: true, typeAwareLinting: false },
    { storybook: false, typeAwareLinting: true },
  ])(
    "checked に typeAwareLinting: $typeAwareLinting / storybook: $storybook を反映する",
    (enabledSwitches) => {
      const { input } = createInput(enabledSwitches)
      const [typeAwareItem, storybookItem] = getSwitchItems(input)

      expect(typeAwareItem?.checked).toBe(enabledSwitches.typeAwareLinting)
      expect(storybookItem?.checked).toBe(enabledSwitches.storybook)
    },
  )

  it("onChange にそれぞれ対応する handler を渡す", () => {
    const { input, toggleHandlers } = createInput({ storybook: false, typeAwareLinting: false })
    const [typeAwareItem, storybookItem] = getSwitchItems(input)

    expect(typeAwareItem?.onChange).toBe(toggleHandlers.typeAwareLinting)
    expect(storybookItem?.onChange).toBe(toggleHandlers.storybook)
  })

  it("labelNode に SwitchDescription で見出しと説明を渡す", () => {
    const { input } = createInput({ storybook: false, typeAwareLinting: false })
    const items = getSwitchItems(input)

    expect(items.map((item) => item.labelNode)).toMatchObject([
      {
        props: {
          descriptionText: expectedTypeAwareDescription,
          titleText: "Type-aware linting",
        },
        type: SwitchDescription,
      },
      {
        props: {
          descriptionText: "Relaxes some rules for Storybook.",
          titleText: "Storybook",
        },
        type: SwitchDescription,
      },
    ])
  })
})
