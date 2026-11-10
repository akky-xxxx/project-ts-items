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
  header: {
    navigation: {
      changeLog: {
        en: "Change log",
        ja: "更新履歴",
      },
      package: {
        en: "Packages",
        ja: "パッケージ",
      },
    },
  },
} as const satisfies Dictionary
