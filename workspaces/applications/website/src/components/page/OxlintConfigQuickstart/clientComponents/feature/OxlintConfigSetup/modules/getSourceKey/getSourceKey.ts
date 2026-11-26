import { SWITCH_NAMES } from "../../constants/SWITCH_NAMES/SWITCH_NAMES.ts"

import type { FormValues } from "../../types/FormValues/FormValues.ts"
import type { SourceKey } from "../../types/SourceKey/SourceKey.ts"

/** ベースとスイッチの状態を表すキーを返す(例: `ts&typeAwareLinting=true&vitest=false&storybook=false`) */
export const getSourceKey = (formValues: FormValues) => {
  const { enabledSwitches, selectedBase } = formValues
  const sourceKey = [
    selectedBase,
    ...SWITCH_NAMES.map((switchName) => `${switchName}=${enabledSwitches[switchName]}`),
  ].join("&")

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- TS cannot infer a template literal type from Array#join; the key format is covered by tests
  return sourceKey as SourceKey
}
