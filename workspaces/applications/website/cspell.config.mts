import { getDictionarySetting } from "@ts-items/configurations/cspell"

import type { CSpellUserSettings } from "cspell"

const dictionarySetting = getDictionarySetting(["web"])

export default {
  dictionaries: ["openapi", "packages", ...(dictionarySetting.dictionaries ?? [])],
  dictionaryDefinitions: [
    ...(dictionarySetting.dictionaryDefinitions ?? []),
    {
      // OpenAPI 定義(取得元から無加工)に由来し、生成した client から import する識別子(operationId 等)
      name: "openapi",
      path: "./configurations/cspell/openapi.txt",
    },
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
