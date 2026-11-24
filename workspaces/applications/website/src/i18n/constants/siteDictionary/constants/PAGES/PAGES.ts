import { HOME } from "./constants/HOME/HOME.ts"
import { OXFMT_CONFIG_HOME } from "./constants/OXFMT_CONFIG_HOME/OXFMT_CONFIG_HOME.ts"
import { OXFMT_CONFIG_QUICK } from "./constants/OXFMT_CONFIG_QUICK/OXFMT_CONFIG_QUICK.ts"
import { OXLINT_CONFIG_HOME } from "./constants/OXLINT_CONFIG_HOME/OXLINT_CONFIG_HOME.ts"
import { OXLINT_CONFIG_QUICK } from "./constants/OXLINT_CONFIG_QUICK/OXLINT_CONFIG_QUICK.ts"
import { PACKAGES } from "./constants/PACKAGES/PACKAGES.ts"
import { REACT_TYPES_HOME } from "./constants/REACT_TYPES_HOME/REACT_TYPES_HOME.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  home: HOME,
  oxfmtConfigHome: OXFMT_CONFIG_HOME,
  oxfmtConfigQuickstart: OXFMT_CONFIG_QUICK,
  oxlintConfigHome: OXLINT_CONFIG_HOME,
  oxlintConfigQuickstart: OXLINT_CONFIG_QUICK,
  packages: PACKAGES,
  reactTypesHome: REACT_TYPES_HOME,
} as const satisfies Dictionary
