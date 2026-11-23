import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const oxcRules = withRulePrefix("oxc", {
  "no-async-await": "off",
  "no-optional-chaining": "off",
  "no-rest-spread-properties": "off",
} as const satisfies DummyRuleMap)
