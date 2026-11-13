import { DOCS_LAYOUT } from "./constants/DOCS_LAYOUT/DOCS_LAYOUT.ts"
import { HEADER } from "./constants/HEADER/HEADER.ts"

import type { Dictionary } from "../../types/Dictionary/Dictionary.ts"

export const siteDictionary = {
  HomePage: {
    greeting: {
      en: "Hello, World!",
      ja: "こんにちは、世界!",
    },
  },
  Metadata: {
    description: {
      en: "ts-items",
      ja: "ts-items",
    },
    title: {
      en: "ts-items",
      ja: "ts-items",
    },
  },
  Radio: {
    label: {
      en: "Radio",
      ja: "ラジオ",
    },
  },
  docsLayout: DOCS_LAYOUT,
  externalLink: {
    newTab: {
      en: "opens in a new tab",
      ja: "新しいタブで開く",
    },
  },
  header: HEADER,
} as const satisfies Dictionary
