import { PACKAGE_NAMES } from "../../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { OptionSwitcher } from "../../../OptionSwitcher/OptionSwitcher.tsx"
import type { ComponentProps } from "react"

export const PACKAGE_ITEMS = [
  {
    labelText: `${PROJECT_NAME}/${PACKAGE_NAMES.oxlintConfig}`,
    value: PACKAGE_NAMES.oxlintConfig,
  },
  {
    labelText: `${PROJECT_NAME}/${PACKAGE_NAMES.oxfmtConfig}`,
    value: PACKAGE_NAMES.oxfmtConfig,
  },
] satisfies ComponentProps<typeof OptionSwitcher>["items"]
