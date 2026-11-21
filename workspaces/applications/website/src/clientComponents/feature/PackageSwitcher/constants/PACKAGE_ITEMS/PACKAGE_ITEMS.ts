import { PACKAGE_MASTER } from "../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { OptionSwitcher } from "../../../OptionSwitcher/OptionSwitcher.tsx"
import type { ComponentProps } from "react"

export const PACKAGE_ITEMS = [
  {
    labelText: `${PROJECT_NAME}/${PACKAGE_MASTER.oxlintConfig.name}`,
    value: PACKAGE_MASTER.oxlintConfig.name,
  },
  {
    labelText: `${PROJECT_NAME}/${PACKAGE_MASTER.oxfmtConfig.name}`,
    value: PACKAGE_MASTER.oxfmtConfig.name,
  },
] satisfies ComponentProps<typeof OptionSwitcher>["items"]
