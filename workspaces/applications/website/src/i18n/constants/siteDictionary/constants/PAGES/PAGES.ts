import { HOME } from "./constants/HOME/HOME.ts"
import { OXFMT_CONFIG_HOME } from "./constants/OXFMT_CONFIG_HOME/OXFMT_CONFIG_HOME.ts"
import { OXFMT_CONFIG_QUICKSTART } from "./constants/OXFMT_CONFIG_QUICKSTART/OXFMT_CONFIG_QUICKSTART.ts"
import { OXLINT_CONFIG_BASE_CONFIG_RULES } from "./constants/OXLINT_CONFIG_BASE_CONFIG_RULES/OXLINT_CONFIG_BASE_CONFIG_RULES.ts"
import { OXLINT_CONFIG_HOME } from "./constants/OXLINT_CONFIG_HOME/OXLINT_CONFIG_HOME.ts"
import { OXLINT_CONFIG_QUICKSTART } from "./constants/OXLINT_CONFIG_QUICKSTART/OXLINT_CONFIG_QUICKSTART.ts"
import { PACKAGES } from "./constants/PACKAGES/PACKAGES.ts"
import { REACT_TYPES_HOME } from "./constants/REACT_TYPES_HOME/REACT_TYPES_HOME.ts"
import { REACT_TYPES_QUICKSTART } from "./constants/REACT_TYPES_QUICKSTART/REACT_TYPES_QUICKSTART.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  home: HOME,
  oxfmtConfigHome: OXFMT_CONFIG_HOME,
  oxfmtConfigQuickstart: OXFMT_CONFIG_QUICKSTART,
  oxlintConfigBaseConfigRules: OXLINT_CONFIG_BASE_CONFIG_RULES,
  oxlintConfigHome: OXLINT_CONFIG_HOME,
  oxlintConfigQuickstart: OXLINT_CONFIG_QUICKSTART,
  packages: PACKAGES,
  reactTypesHome: REACT_TYPES_HOME,
  reactTypesQuickstart: REACT_TYPES_QUICKSTART,
} as const satisfies Dictionary
