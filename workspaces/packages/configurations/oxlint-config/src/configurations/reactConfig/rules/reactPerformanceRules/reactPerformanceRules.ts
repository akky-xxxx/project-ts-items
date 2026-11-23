import { withRulePrefix } from "../../../../utilities/withRulePrefix/withRulePrefix.ts"

export const reactPerformanceRules = withRulePrefix("react-perf", {
  // メモ化の必要性は実行環境やレンダリングコストに依存するため、一律に強制しない
  "jsx-no-jsx-as-prop": "off",
  "jsx-no-new-array-as-prop": "off",
  "jsx-no-new-function-as-prop": "off",
  "jsx-no-new-object-as-prop": "off",
})
