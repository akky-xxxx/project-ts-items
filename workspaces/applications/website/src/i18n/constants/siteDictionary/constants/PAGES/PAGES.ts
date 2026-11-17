import { HOME } from "./constants/HOME/HOME.ts"
import { OXFMT_CONFIG_HOME } from "./constants/OXFMT_CONFIG_HOME/OXFMT_CONFIG_HOME.ts"
import { OXLINT_CONFIG_HOME } from "./constants/OXLINT_CONFIG_HOME/OXLINT_CONFIG_HOME.ts"
import { OXLINT_CONFIG_QUICK } from "./constants/OXLINT_CONFIG_QUICK/OXLINT_CONFIG_QUICK.ts"
import { PACKAGES } from "./constants/PACKAGES/PACKAGES.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  home: HOME,
  oxfmtConfigHome: OXFMT_CONFIG_HOME,
  oxlintConfigHome: OXLINT_CONFIG_HOME,
  oxlintConfigQuickstart: OXLINT_CONFIG_QUICK,
  packages: PACKAGES,
} as const satisfies Dictionary
