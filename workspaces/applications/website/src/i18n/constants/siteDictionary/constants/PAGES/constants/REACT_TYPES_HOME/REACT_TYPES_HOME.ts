import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const REACT_TYPES_HOME = {
  backgroundDescription: {
    en: "Types that tend to be redefined in every project are added as I notice them during implementation.",
    ja: "実装してる中でプロジェクトごとに毎回定義するような型を気づきベースで追加しています。",
  },
  backgroundTitle: {
    en: "Overview",
    ja: "概要",
  },
  pageDescription: {
    en: "Types for React.<br></br>It provides types that are not included in @types/react but are useful in everyday development.",
    ja: "React 向けの型です。<br></br>@types/react に含まれてないが日常的に使いたい型を公開しています。",
  },
  pageTitle: {
    en: "Introduction",
    ja: "はじめに",
  },
} as const satisfies Dictionary
