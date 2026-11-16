import { startTransition, useState } from "react"

import type { Base } from "../../types/Base/Base.ts"
import type { FormValues } from "../../types/FormValues/FormValues.ts"
import type { SwitchName } from "../../types/SwitchName/SwitchName.ts"

const INITIAL_ENABLED_SWITCHES: FormValues["enabledSwitches"] = {
  storybook: false,
  typeAwareLinting: true,
}

export const useFormStates = () => {
  const [selectedBase, setSelectedBase] = useState<Base>("ts")
  const handleChangeBase = (nextBase: Base) => () => {
    startTransition(() => {
      setSelectedBase(nextBase)
    })
  }
  const [enabledSwitches, setEnabledSwitches] = useState(INITIAL_ENABLED_SWITCHES)
  const handleToggleSwitch = (switchName: SwitchName) => () => {
    startTransition(() => {
      setEnabledSwitches((current) => ({ ...current, [switchName]: !current[switchName] }))
    })
  }

  return {
    enabledSwitches,
    handleChangeBase,
    handleToggleSwitch,
    selectedBase,
  }
}
