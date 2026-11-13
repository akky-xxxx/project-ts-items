import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
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
