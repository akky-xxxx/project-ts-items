import { DRY_RUN_IGNORE_PATTERNS } from "./dryRun/index.mts"

import type { CSpellUserSettings } from "cspell"

export default {
  dictionaries: ["commands", "domain", "packages", "web"],
  dictionaryDefinitions: [
    {
      name: "commands",
      path: "./cspell/commands.txt",
    },
    {
      name: "domain",
      path: "./cspell/domain.txt",
    },
    {
      name: "packages",
      path: "./cspell/packages.txt",
    },
    {
      name: "web",
      path: "./cspell/web.txt",
    },
  ],
  ignorePaths: [...DRY_RUN_IGNORE_PATTERNS],
  language: "en",
  version: "0.2",
} as const satisfies CSpellUserSettings
