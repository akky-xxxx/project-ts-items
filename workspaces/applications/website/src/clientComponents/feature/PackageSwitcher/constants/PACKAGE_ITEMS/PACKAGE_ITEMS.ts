import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { OptionSwitcher } from "../../../OptionSwitcher/OptionSwitcher.tsx"
import type { ComponentProps } from "react"

export const PACKAGE_ITEMS = [
  {
    labelText: `${PROJECT_NAME}/oxlint-config`,
    value: "oxlint-config",
  },
  {
    labelText: `${PROJECT_NAME}/oxfmt-config`,
    value: "oxfmt-config",
  },
] satisfies ComponentProps<typeof OptionSwitcher>["items"]
