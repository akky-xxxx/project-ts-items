import { renderLineBreak } from "../../../../../../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { SwitchDescription } from "../../components/SwitchDescription/SwitchDescription.tsx"
import { SWITCH_NAMES } from "../../constants/SWITCH_NAMES/SWITCH_NAMES.ts"

import type { Toggle } from "../../../../../../../ui/Toggle/Toggle.tsx"
import type { FormValues } from "../../types/FormValues/FormValues.ts"
import type { SwitchName } from "../../types/SwitchName/SwitchName.ts"
import type { createTranslator, Messages } from "next-intl"
import type { ComponentProps, ReactNode } from "react"

type PageTranslate = ReturnType<typeof createTranslator<Messages, "pages.oxlintConfigQuickstart">>

type Input = {
  enabledSwitches: FormValues["enabledSwitches"]
  handleToggleSwitch: (switchName: SwitchName) => () => void
  pageTranslate: PageTranslate
}

type SwitchItemSetting = {
  getLabelNode: (pageTranslate: PageTranslate) => ReactNode
  /** Toggle の name / value */
  value: string
}

/** スイッチごとの表示内容 */
const SWITCH_ITEM_SETTINGS = {
  storybook: {
    getLabelNode: (pageTranslate) => (
      <SwitchDescription
        titleText="Storybook"
        descriptionText={pageTranslate.rich("switching.storybookDescription", {
          br: renderLineBreak,
        })}
      />
    ),
    value: "storybook",
  },
  typeAwareLinting: {
    getLabelNode: (pageTranslate) => (
      <SwitchDescription
        titleText={pageTranslate("switching.typeAwareLintingTitle")}
        descriptionText={pageTranslate.rich("switching.typeAwareLintingDescription", {
          br: renderLineBreak,
        })}
      />
    ),
    value: "type-aware-linting",
  },
  vitest: {
    getLabelNode: (pageTranslate) => (
      <SwitchDescription
        titleText="Vitest"
        descriptionText={pageTranslate.rich("switching.vitestDescription", {
          br: renderLineBreak,
        })}
      />
    ),
    value: "vitest",
  },
} as const satisfies Record<SwitchName, SwitchItemSetting>

export const getSwitchItems = (input: Input) => {
  const { enabledSwitches, handleToggleSwitch, pageTranslate } = input

  return SWITCH_NAMES.map((switchName) => {
    const { getLabelNode, value } = SWITCH_ITEM_SETTINGS[switchName]

    return {
      checked: enabledSwitches[switchName],
      labelNode: getLabelNode(pageTranslate),
      name: value,
      onChange: handleToggleSwitch(switchName),
      value,
    }
  }) satisfies ComponentProps<typeof Toggle>[]
}
