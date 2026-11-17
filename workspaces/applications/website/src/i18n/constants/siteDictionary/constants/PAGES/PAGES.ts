import { HOME } from "./constants/HOME/HOME.ts"
import { OXLINT_CONFIG } from "./constants/OXLINT_CONFIG/OXLINT_CONFIG.ts"
import { OXLINT_CONFIG_QUICK } from "./constants/OXLINT_CONFIG_QUICK/OXLINT_CONFIG_QUICK.ts"
import { PACKAGES } from "./constants/PACKAGES/PACKAGES.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  home: HOME,
  oxlintConfig: OXLINT_CONFIG,
  oxlintConfigQuickstart: OXLINT_CONFIG_QUICK,
  packages: PACKAGES,
} as const satisfies Dictionary
