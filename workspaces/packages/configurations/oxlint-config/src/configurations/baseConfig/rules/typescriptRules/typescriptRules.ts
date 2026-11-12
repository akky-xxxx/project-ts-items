import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const typescriptRules = withRulePrefix("typescript", {
  "explicit-function-return-type": "off",
  "explicit-module-boundary-types": "off",
  "prefer-readonly-parameter-types": "off",
  "promise-function-async": "error",
  "require-await": "error",
  "restrict-template-expressions": ["error", { allowBoolean: true, allowNumber: true }],
} as const satisfies DummyRuleMap)
