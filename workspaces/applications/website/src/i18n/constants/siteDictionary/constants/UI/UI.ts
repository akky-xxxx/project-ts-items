import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const UI = {
  breadcrumb: {
    labelText: {
      en: "Breadcrumbs",
      ja: "パンくずリスト",
    },
  },
  externalLink: {
    newTab: {
      en: "opens in a new tab",
      ja: "新しいタブで開く",
    },
  },
  packageCard: {
    linkText: {
      en: "Documents",
      ja: "ドキュメント",
    },
  },
  tab: {
    copyButtonLabelText: {
      en: "Copy",
      ja: "コピー",
    },
  },
} as const satisfies Dictionary
