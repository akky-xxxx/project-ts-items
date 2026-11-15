import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const DOCS_LAYOUT = {
  docsSidebar: {
    en: "Docs sidebar",
    ja: "ドキュメントのサイドバー",
  },
  latest: {
    en: "Latest",
    ja: "最新版",
  },
  packageLegend: {
    en: "Packages",
    ja: "パッケージ",
  },
  toc: {
    en: "Table of contents",
    ja: "目次",
  },
} as const satisfies Dictionary
