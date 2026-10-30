import { defineConfig } from "oxlint"

import { eslintRules } from "./rules/eslintRules/eslintRules.ts"
import { typescriptRules } from "./rules/typescriptRules/typescriptRules.ts"

export const baseConfig = defineConfig({
  categories: {
    correctness: "error",
    nursery: "off",
    pedantic: "error",
    perf: "error",
    restriction: "error",
    style: "error",
    suspicious: "error",
  },
  plugins: ["eslint", "import", "oxc", "unicorn"],
  rules: {
    ...eslintRules,
    ...typescriptRules,
    "explicit-function-return-type": "off",
    "explicit-module-boundary-types": "off",
    "exports-last": "off",
    "filename-case": "off",
    "group-exports": "off",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/no-relative-parent-imports": "off",
    "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
    "no-inline-comments": "off",
    "no-named-export": "off",
    "no-nested-ternary": "error",
    "no-null": "off",
    "no-rest-spread-properties": "off",
    "no-ternary": "off",
    "no-undefined": "off",
    "no-unneeded-ternary": "error",
    "no-warning-comments": "off",
    "one-var": "off",
    "oxc/no-async-await": "off",
    "oxc/no-optional-chaining": "off",
    "prefer-default-export": "off",
    "sort-imports": "off",
  },
})
