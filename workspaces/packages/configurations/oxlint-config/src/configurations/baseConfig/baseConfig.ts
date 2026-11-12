import { defineConfig } from "oxlint"

import { eslintRules } from "./rules/eslintRules/eslintRules.ts"
import { importRules } from "./rules/importRules/importRules.ts"
import { oxcRules } from "./rules/oxcRules/oxcRules.ts"
import { typescriptRules } from "./rules/typescriptRules/typescriptRules.ts"
import { unicornRules } from "./rules/unicornRules/unicornRules.ts"

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
    ...importRules,
    ...oxcRules,
    ...typescriptRules,
    ...unicornRules,
  },
})
