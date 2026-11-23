import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

/* oxlint-disable no-magic-numbers */
export const eslintRules = withRulePrefix("eslint", {
  "arrow-body-style": ["error", "as-needed"],
  "complexity": ["error", 5],
  "curly": ["warn", "all"],
  "id-length": [
    "error",
    {
      exceptions: ["_"],
      min: 2,
    },
  ],
  "max-depth": ["error", 3],
  "max-lines": ["error", { max: 100 }],
  "max-lines-per-function": [
    "error",
    {
      IIFEs: true,
      max: 50,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  "max-nested-callbacks": ["error", 3],
  "max-params": ["warn", 3],
  "max-statements": ["error", 10],
  "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
  "no-implicit-coercion": [
    "warn",
    {
      boolean: true,
      number: true,
      string: true,
    },
  ],
  "no-inline-comments": "off",
  "no-magic-numbers": [
    "warn",
    {
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
    },
  ],
  "no-nested-ternary": "error",
  "no-param-reassign": [
    "error",
    {
      props: true,
    },
  ],
  "no-ternary": "off",
  "no-undefined": "off",
  "no-unneeded-ternary": "error",
  "no-use-before-define": "error",
  "no-warning-comments": "off",
  "one-var": "off",
  "prefer-named-capture-group": "warn",
  "require-await": "off",
  "sort-imports": "off",
  "sort-keys": ["warn", "asc", { allowLineSeparatedGroups: true }],
} as const satisfies DummyRuleMap)
