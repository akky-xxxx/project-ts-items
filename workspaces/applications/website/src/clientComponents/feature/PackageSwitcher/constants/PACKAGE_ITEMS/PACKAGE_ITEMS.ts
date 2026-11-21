import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { SORTED_PACKAGES_AS_DISPLAY_ORDER } from "../../../../../constants/SORTED_PACKAGES_AS_DISPLAY_ORDER/SORTED_PACKAGES_AS_DISPLAY_ORDER.ts"

import type { OptionSwitcher } from "../../../OptionSwitcher/OptionSwitcher.tsx"
import type { ComponentProps } from "react"

export const PACKAGE_ITEMS = SORTED_PACKAGES_AS_DISPLAY_ORDER.map((packageName) => {
  const { name } = packageName

  return {
    labelText: `${PROJECT_NAME}/${name}`,
    value: name,
  } satisfies ComponentProps<typeof OptionSwitcher>["items"][number]
})
