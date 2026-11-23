import { getDictionarySetting } from "@ts-items/configurations/cspell"

import type { CSpellUserSettings } from "cspell"

const dictionarySetting = getDictionarySetting(["domain", "web"])

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
  // 取得元から無加工で置く OpenAPI 定義(手書きの定義は対象にする)
  ignorePaths: ["openapi/npmRegistry/**"],
  language: "en",
  useGitignore: true,
  version: "0.2",
} as const satisfies CSpellUserSettings
