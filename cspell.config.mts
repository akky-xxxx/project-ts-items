import { getDictionarySetting } from "@ts-items/configurations/cspell"

import type { CSpellUserSettings } from "cspell"

export default {
  ...getDictionarySetting(["packages"]),
  ignorePaths: ["./workspaces/**"],
  language: "en",
  version: "0.2",
} as const satisfies CSpellUserSettings
