import type { CSpellUserSettings } from "cspell"

export default {
  dictionaries: ["packages"],
  dictionaryDefinitions: [
    {
      name: "packages",
      path: "./configurations/cspell/packages.txt",
    },
  ],
  enableGlobDot: true,
  language: "en",
  useGitignore: true,
  version: "0.2",
} as const satisfies CSpellUserSettings
