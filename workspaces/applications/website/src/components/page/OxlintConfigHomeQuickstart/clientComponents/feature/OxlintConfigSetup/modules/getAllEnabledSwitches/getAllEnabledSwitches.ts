import { SWITCH_NAMES } from "../../constants/SWITCH_NAMES/SWITCH_NAMES.ts"

import type { FormValues } from "../../types/FormValues/FormValues.ts"

type EnabledSwitches = FormValues["enabledSwitches"]

// oxlint-disable-next-line typescript/no-unsafe-type-assertion -- TS cannot infer a keyed record from Object.fromEntries; every key comes from SWITCH_NAMES and the shape is covered by tests
const ALL_DISABLED = Object.fromEntries(
  SWITCH_NAMES.map((switchName) => [switchName, false]),
) as EnabledSwitches

/** スイッチの有効/無効の全組み合わせを返す */
export const getAllEnabledSwitches = () =>
  SWITCH_NAMES.reduce<EnabledSwitches[]>(
    (combinations, switchName) =>
      combinations.flatMap((combination) => [combination, { ...combination, [switchName]: true }]),
    [ALL_DISABLED],
  )
