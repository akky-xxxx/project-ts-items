import { PROJECT_NAME } from "../../../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { Dictionary } from "../../../../../../types/Dictionary/Dictionary.ts"

export const HOME = {
  packageTitleText: {
    en: "Packages",
    ja: "パッケージ",
  },
  pageDescription: {
    en: `${PROJECT_NAME} is a collection of small packages for everyday development.<br></br>It mainly provides packages for TypeScript projects, React, and Next.js.`,
    ja: `${PROJECT_NAME} は日々の開発に使える、小さなパッケージ群です。<br></br>TypeScript を使ったプロジェクトや React、Next.js 向けのパッケージを提供しています。`,
  },
  pageTitle: {
    en: "Tool for TypeScript projects",
    ja: "TypeScript プロジェクトのためのツール",
  },
} as const satisfies Dictionary
