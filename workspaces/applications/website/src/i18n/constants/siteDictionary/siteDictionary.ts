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
} as const satisfies Dictionary
