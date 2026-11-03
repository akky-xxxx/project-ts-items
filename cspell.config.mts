import { getDictionarySetting } from "@ts-items/configurations/cspell"

import type { CSpellUserSettings } from "cspell"

export default {
  ...getDictionarySetting(["commands", "domain", "packages"]),
  enableGlobDot: true,
  ignorePaths: [
    ".claude/settings.local.json",
    ".git/**",
    ".gitignore",
    "ai-communication/**",
    "workspaces/**",
  ],
  language: "en",
  useGitignore: true,
  version: "0.2",
} as const satisfies CSpellUserSettings
