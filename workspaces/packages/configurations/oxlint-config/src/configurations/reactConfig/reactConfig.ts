import { defineConfig } from "oxlint"

import { withRulePrefix } from "../../utilities/withRulePrefix/withRulePrefix.ts"
import { baseConfig } from "../baseConfig/baseConfig.ts"

export const reactConfig = defineConfig({
  extends: [baseConfig],
  plugins: ["react", "react-perf"],
  rules: {
    ...withRulePrefix("react", {
      "forbid-component-props": ["error", { forbid: ["style"] }],
      "function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
        },
      ],
      "jsx-filename-extension": [
        "error",
        {
          extensions: ["tsx"],
        },
      ],
      "jsx-fragments": ["error", "element"],
      "jsx-max-depth": ["error", { max: 5 }],
      "jsx-no-literals": "off",
      "jsx-props-no-spreading": "off",
      "react-in-jsx-scope": "off",
    }),
  },
})
