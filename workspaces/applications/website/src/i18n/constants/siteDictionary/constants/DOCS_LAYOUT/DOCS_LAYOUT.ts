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
    en: "Select a package",
    ja: "パッケージを選択",
  },
  toc: {
    en: "ON THIS PAGE",
    ja: "このページの内容",
  },
} as const satisfies Dictionary
