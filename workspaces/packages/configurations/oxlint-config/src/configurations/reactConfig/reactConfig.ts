import { defineConfig } from "oxlint"

import { baseConfig } from "../baseConfig/baseConfig.ts"
import { reactPerformanceRules } from "./rules/reactPerformanceRules/reactPerformanceRules.ts"
import { reactRules } from "./rules/reactRules/reactRules.ts"

export const reactConfig = defineConfig({
  extends: [baseConfig],
  plugins: ["react", "react-perf"],
  rules: {
    ...reactRules,
    ...reactPerformanceRules,
  },
})
