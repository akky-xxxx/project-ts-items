import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const OXLINT_CONFIG_BASE_CONFIG_RULES = {
  categoryHeading: {
    en: "Origins of {category}",
    ja: "{category} 由来のルール",
  },
  pageTitle: {
    en: "Overall base config",
    ja: "基本構成全体",
  },
  rules: {
    en: "Configuration of each rules",
    ja: "各ルールの設定",
  },
} as const satisfies Dictionary
