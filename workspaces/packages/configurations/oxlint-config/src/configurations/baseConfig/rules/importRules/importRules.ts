import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const importRules = withRulePrefix("import", {
  "max-dependencies": "off",
} as const satisfies DummyRuleMap)
