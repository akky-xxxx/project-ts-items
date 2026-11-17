import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const DOCS_LAYOUT = {
  docsNavigationLabel: {
    en: "Documentation",
    ja: "ドキュメント",
  },
  docsSidebar: {
    en: "Docs sidebar",
    ja: "ドキュメントのサイドバー",
  },
  latest: {
    en: "Latest",
    ja: "最新版",
  },
  packageSelectorLegend: {
    en: "Packages select",
    ja: "パッケージ選択",
  },
  toc: {
    en: "Table of contents",
    ja: "目次",
  },
} as const satisfies Dictionary
