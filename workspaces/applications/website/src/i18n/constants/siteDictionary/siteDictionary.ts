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
    language: {
      en: "Language",
      ja: "言語",
    },
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
    theme: {
      dark: {
        en: "Dark",
        ja: "ダーク",
      },
      legend: {
        en: "Theme",
        ja: "テーマ",
      },
      light: {
        en: "Light",
        ja: "ライト",
      },
      system: {
        en: "System",
        ja: "システム",
      },
    },
  },
} as const satisfies Dictionary
