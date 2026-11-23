import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const OXLINT_CONFIG_HOME = {
  backgroundDescription: {
    en: "It helps keep code maintainable regardless of each team member's skill level, and works well as a guardrail when implementing with generative AI.<br></br>All thresholds are set on the strict side, and each rule is meant to be relaxed as you use it in practice.",
    ja: "開発メンバーのスキルの高低に応じず、コードの保守性を担保しやすくするためや、生成 AI による実装時のガードレール等に最適です。<br></br>しきい値は全て厳し目にしていて、各ルールの設定は運用をしていく中で緩和していく想定です。",
  },
  backgroundTitle: {
    en: "Overview",
    ja: "概要",
  },
  pageDescription: {
    en: "Shareable configuration for oxlint.<br></br>It also enables useful rules that are not included in the recommended set.",
    ja: "oxlint の配布用設定です。<br></br>recommended だけでは設定されない導入するメリットがあるルールも設定されてます。",
  },
  pageTitle: {
    en: "Introduction",
    ja: "はじめに",
  },
} as const satisfies Dictionary
