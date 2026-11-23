import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

import type { DummyRuleMap } from "oxlint"

export const importRules = withRulePrefix("import", {
  "consistent-type-specifier-style": ["error", "prefer-top-level"],
  "exports-last": "off",
  "group-exports": "off",
  "max-dependencies": "off",
  "no-named-export": "off",
  "no-relative-parent-imports": "off",
  "prefer-default-export": "off",
} as const satisfies DummyRuleMap)
