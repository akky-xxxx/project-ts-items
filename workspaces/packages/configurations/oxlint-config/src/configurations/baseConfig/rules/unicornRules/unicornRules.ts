import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const unicornRules = withRulePrefix("unicorn", {
  "filename-case": "off",
  "no-array-callback-reference": "off",
  "no-array-reduce": "off",
  "no-immediate-mutation": "off",
  "no-null": "off",
} as const satisfies DummyRuleMap)
