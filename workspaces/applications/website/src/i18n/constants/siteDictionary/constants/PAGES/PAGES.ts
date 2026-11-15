import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  home: {
    packageTitleText: {
      en: "Packages",
      ja: "パッケージ",
    },
    pageDescription: {
      en: `${PROJECT_NAME} is a collection of small packages for everyday development.<br></br>It mainly provides packages for TypeScript projects, React, and Next.js.`,
      ja: `${PROJECT_NAME} は日々の開発に使える、小さなパッケージ群です<br></br>TypeScript を使ったプロジェクトや React, Next.js 向けのパッケージを提供しています`,
    },
    pageTitle: {
      en: "Tool for TypeScript projects",
      ja: "TypeScript プロジェクトのためのツール",
    },
  },
  oxlintConfig: {
    backgroundDescription: {
      en: "It helps keep code maintainable regardless of each team member's skill level,<br></br>and works well as a guardrail when implementing with generative AI.<br></br>All thresholds are set on the strict side, and each rule is meant to be relaxed as you use it in practice.",
      ja: "開発メンバーのスキルの高低に応じず、コードの保守性を担保しやすくするためや<br></br>生成 AI による実装時のガードレール等に最適です<br></br>しきい値は全て厳し目にしていて各ルールの設定は運用をしていく中で緩和していく想定です",
    },
    backgroundTitle: {
      en: "Overview",
      ja: "概要",
    },
    pageDescription: {
      en: "Shareable configuration for oxlint.<br></br>It also enables useful rules that are not included in the recommended set.",
      ja: "oxlint の配布用設定です<br></br>recommended だけでは設定されない導入するメリットがあるルールも設定されてます",
    },
    pageTitle: {
      en: "Introduction",
      ja: "はじめに",
    },
  },
  packages: {
    pageDescription: {
      en: `Packages managed by ${PROJECT_NAME}.`,
      ja: `${PROJECT_NAME} で管理しているパッケージの一覧です`,
    },
    pageTitle: {
      en: "Packages",
      ja: "パッケージ",
    },
  },
} as const satisfies Dictionary
