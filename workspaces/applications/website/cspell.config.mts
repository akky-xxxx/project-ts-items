import { getDictionarySetting } from "@ts-items/configurations/cspell"

import type { CSpellUserSettings } from "cspell"

const dictionarySetting = getDictionarySetting(["web"])

export default {
  dictionaries: ["packages", ...(dictionarySetting.dictionaries ?? [])],
  dictionaryDefinitions: [
    ...(dictionarySetting.dictionaryDefinitions ?? []),
    {
      name: "packages",
      path: "./configurations/cspell/packages.txt",
    },
  ],
  enableGlobDot: true,
  // OpenAPI 定義は取得元から無加工で置く
  ignorePaths: ["openapi/**"],
  language: "en",
  useGitignore: true,
  version: "0.2",
} as const satisfies CSpellUserSettings
