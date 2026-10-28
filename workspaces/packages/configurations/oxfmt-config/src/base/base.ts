import { defineConfig } from "oxfmt"

/**
 * @description
 * デフォルトで設定されてるものも意思があるものは明示的に指定しておく
 */
export const base = defineConfig({
  insertFinalNewline: true,
  printWidth: 100,
  quoteProps: "consistent",
  semi: false,
  singleQuote: false,
  sortImports: {
    groups: [
      ["builtin", "external"],
      ["internal", "subpath"],
      ["parent", "sibling", "index"],
      "type",
      "style",
      "unknown",
    ],
    newlinesBetween: true,
  },
  sortPackageJson: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
})
