import type { CSpellUserSettings } from "cspell"

export default {
  ignorePaths: ["./workspaces/**"],
  language: "en",
  version: "0.2",
} as const satisfies CSpellUserSettings
