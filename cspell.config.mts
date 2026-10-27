import type { CSpellUserSettings } from "cspell"

export default {
  dictionaries: ["packages"],
  dictionaryDefinitions: [
    {
      name: "packages",
      path: "./configurations/cspell/packages.txt",
    },
  ],
  ignorePaths: ["./workspaces/**"],
  language: "en",
  version: "0.2",
} as const satisfies CSpellUserSettings
