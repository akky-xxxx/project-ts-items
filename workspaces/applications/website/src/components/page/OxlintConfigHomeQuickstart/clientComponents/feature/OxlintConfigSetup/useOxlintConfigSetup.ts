import { useTranslations } from "next-intl"

import { getSourceKey } from "./modules/getSourceKey/getSourceKey.ts"
import { getSwitchItems } from "./modules/getSwitchItems/getSwitchItems.tsx"
import { useFormStates } from "./modules/useFormStates/useFormStates.ts"

export const useOxlintConfigSetup = () => {
  const pageTranslate = useTranslations("pages.oxlintConfigQuickstart")
  const { enabledSwitches, handleChangeBase, handleToggleSwitch, selectedBase } = useFormStates()
  const formValues = { enabledSwitches, selectedBase }
  const sourceKey = getSourceKey(formValues)
  const switchItems = getSwitchItems({ enabledSwitches, handleToggleSwitch, pageTranslate })

  return {
    handleChangeBase,
    selectConfiguration: pageTranslate("selectConfiguration"),
    selectedBase,
    sourceKey,
    switchItems,
  }
}
