import type { Base } from "../Base/Base.ts"
import type { SwitchName } from "../SwitchName/SwitchName.ts"

export type FormValues = {
  enabledSwitches: Record<SwitchName, boolean>
  selectedBase: Base
}
