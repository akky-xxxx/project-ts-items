import { PROJECT_NAME } from "../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PAGES = {
  packages: {
    pageDescription: {
      en: `The package list that managed by ${PROJECT_NAME}.`,
      ja: `${PROJECT_NAME} で管理されてるパッケージ一覧です`,
    },
    pageTitle: {
      en: "Packages",
      ja: "パッケージ",
    },
  },
} as const satisfies Dictionary
