import { withRulePrefix } from "../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

/* oxlint-disable no-magic-numbers */
export const eslintRules = withRulePrefix("eslint", {
  "arrow-body-style": ["error", "as-needed"],
  "complexity": ["error", 5],
  "curly": ["warn", "all"],
  "max-depth": ["error", 3],
  "max-lines": ["error", { max: 100 }],
  "max-lines-per-function": [
    "error",
    {
      IIFEs: true,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  "max-nested-callbacks": ["error", 3],
  "max-params": ["warn", 3],
  "max-statements": ["error", 10],
  "no-implicit-coercion": [
    "warn",
    {
      boolean: true,
      number: true,
      string: true,
    },
  ],
  "no-magic-numbers": "warn",
  "no-param-reassign": [
    "error",
    {
      props: true,
    },
  ],
  "no-use-before-define": "error",
  "prefer-named-capture-group": "warn",
  "require-await": "off",
  "sort-keys": ["warn", "asc", { allowLineSeparatedGroups: true }],
} as const satisfies DummyRuleMap)
