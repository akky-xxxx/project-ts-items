import type { CSpellUserSettings } from "cspell"

export default {
  ignorePaths: ["./packages/**"],
  language: "en",
  version: "0.2",
} as const satisfies CSpellUserSettings
