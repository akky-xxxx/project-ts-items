import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const UI = {
  breadcrumb: {
    labelText: {
      en: "Breadcrumbs",
      ja: "パンくずリスト",
    },
  },
  codeArea: {
    copiedText: {
      en: "Copied",
      ja: "コピーしました",
    },
    copyButtonLabelText: {
      en: "Copy",
      ja: "コピー",
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
} as const satisfies Dictionary
