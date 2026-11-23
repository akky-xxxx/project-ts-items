import { getDictionarySetting } from "@ts-items/configurations/cspell"
import { GENERATED_RELEASE_PATTERNS } from "@ts-items/configurations/release"

import type { CSpellUserSettings } from "cspell"

export default {
  ...getDictionarySetting(["domain", "packages"]),
  ignorePaths: [...GENERATED_RELEASE_PATTERNS],
  language: "en",
  // 生成物(dist など。.gitignore 済み)を対象外にする
  useGitignore: true,
  version: "0.2",
} as const satisfies CSpellUserSettings
