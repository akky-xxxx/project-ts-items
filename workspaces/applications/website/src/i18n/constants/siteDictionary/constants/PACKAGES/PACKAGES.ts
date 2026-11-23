import type { PackageName } from "../../../../../types/PackageName/PackageName.ts"
import type { Dictionary } from "../../../../types/Dictionary/Dictionary.ts"

export const PACKAGES = {
  "oxfmt-config": {
    description: {
      en: "Shareable configuration for oxfmt.<br></br>Features sorting import statements into groups by category.",
      ja: "oxfmt の配布用設定です。<br></br>import 構文をジャンルごとに仕分ける設定が特徴です。",
    },
  },
  "oxlint-config": {
    description: {
      en: "Shareable configuration for oxlint.<br></br>Comes with a rather strict rule set.",
      ja: "oxlint の配布用設定です。<br></br>厳し目の設定となっています。",
    },
  },
  "react-types": {
    description: {
      en: "General-purpose React types not provided by @types/react.",
      ja: "@types/react で提供されていない汎用的な React の型です。",
    },
  },
} as const satisfies Record<PackageName, Dictionary>
