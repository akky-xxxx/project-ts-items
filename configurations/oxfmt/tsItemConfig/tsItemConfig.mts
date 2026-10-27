import { defineConfig } from "oxfmt"

import type { OxfmtConfig } from "oxfmt"

const SORT_IMPORTS = {
  groups: [
    ["builtin", "external"],
    ["internal", "subpath"],
    ["parent", "sibling", "index"],
    "type",
    "style",
    "unknown",
  ],
  newlinesBetween: true,
} as const satisfies OxfmtConfig["sortImports"]

/**
 * @description
 * デフォルトで設定されてるものも意思があるものは明示的に指定しておく
 */
export const tsItemConfig = defineConfig({
  insertFinalNewline: true,
  printWidth: 100,
  quoteProps: "consistent",
  semi: false,
  singleQuote: false,
  sortImports: SORT_IMPORTS,
  sortPackageJson: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
})
