import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const unicornRules = withRulePrefix("unicorn", {
  "no-array-callback-reference": "off",
  "no-array-reduce": "off",
  "no-immediate-mutation": "off",
} as const satisfies DummyRuleMap)
