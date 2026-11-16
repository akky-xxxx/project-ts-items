import { getSourceKey } from "./modules/getSourceKey/getSourceKey.ts"
import { getSwitchItems } from "./modules/getSwitchItems/getSwitchItems.tsx"
import { useFormStates } from "./modules/useFormStates/useFormStates.ts"
import { useThisTranslations } from "./modules/useThisTranslations/useThisTranslations.ts"

export const useOxlintConfigSetup = () => {
  const { pageTranslate, uiTranslate } = useThisTranslations()
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
    uiTranslate,
  }
}
