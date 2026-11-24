import { useTranslations } from "next-intl"

import { getSourceKey } from "./modules/getSourceKey/getSourceKey.ts"
import { getSwitchItems } from "./modules/getSwitchItems/getSwitchItems.tsx"
import { useFormStates } from "./modules/useFormStates/useFormStates.ts"

export const useOxlintConfigSetup = () => {
  const pagesTranslate = useTranslations("pages")
  const { enabledSwitches, handleChangeBase, handleToggleSwitch, selectedBase } = useFormStates()
  const formValues = { enabledSwitches, selectedBase }
  const sourceKey = getSourceKey(formValues)
  const switchItems = getSwitchItems({ enabledSwitches, handleToggleSwitch, pageTranslate: pagesTranslate })

  return {
    handleChangeBase,
    selectConfiguration: pagesTranslate("oxlintConfigQuickstart.selectConfiguration"),
    selectedBase,
    sourceKey,
    switchItems,
  }
}
