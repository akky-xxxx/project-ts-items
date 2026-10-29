import { withRulePrefix } from "../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const typescriptRules = withRulePrefix("typescript", {
  "prefer-readonly-parameter-types": "off",
  "promise-function-async": "error",
  "require-await": "error",
} as const satisfies DummyRuleMap)
