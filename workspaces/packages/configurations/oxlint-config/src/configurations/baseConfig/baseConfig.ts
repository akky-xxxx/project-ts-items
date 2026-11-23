import { defineConfig } from "oxlint"

import { withRulePrefix } from "../../utilities/withRulePrefix/withRulePrefix.ts"
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
  overrides: [
    {
      // Declaration merging(module augmentation 等)は interface でしか書けず、type への自動修正で拡張が無効になるため
      files: ["**/*.d.{ts,mts,cts}"],
      rules: withRulePrefix("typescript", {
        "consistent-type-definitions": "off",
      }),
    },
  ],
  plugins: ["eslint", "import", "oxc", "unicorn"],
  rules: {
    ...eslintRules,
    ...importRules,
    ...oxcRules,
    ...typescriptRules,
    ...unicornRules,
  },
})
