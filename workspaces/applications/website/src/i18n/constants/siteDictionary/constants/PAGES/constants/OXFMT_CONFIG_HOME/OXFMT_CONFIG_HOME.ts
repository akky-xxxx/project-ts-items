import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const OXFMT_CONFIG_HOME = {
  backgroundDescription: {
    en: "It formats not only quote styles, trailing semicolons, and commas, but also groups import statements by type and sorts their order.",
    ja: "クォーテーションの種類や末尾のセミコロン、カンマ等はもちろん、インポート文の種類別にカテゴライズしたり順序まで整形する設定です",
  },
  backgroundTitle: {
    en: "Overview",
    ja: "概要",
  },
  pageDescription: {
    en: "Shareable configuration for oxfmt.",
    ja: "oxfmt の配布用設定です",
  },
  pageTitle: {
    en: "Introduction",
    ja: "はじめに",
  },
} as const satisfies Dictionary
