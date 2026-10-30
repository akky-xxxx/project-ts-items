import { getDictionarySetting } from "@ts-items/configurations/cspell"
import { DRY_RUN_IGNORE_PATTERNS } from "@ts-items/configurations/dryRun"

import type { CSpellUserSettings } from "cspell"

export default {
  ...getDictionarySetting(["packages"]),
  ignorePaths: [...DRY_RUN_IGNORE_PATTERNS],
  language: "en",
  version: "0.2",
} as const satisfies CSpellUserSettings
