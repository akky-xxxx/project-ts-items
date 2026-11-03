import { defineConfig } from "oxlint"

import { baseConfig } from "../baseConfig/baseConfig.ts"

export const reactConfig = defineConfig({
  extends: [baseConfig],
  plugins: ["react", "react-perf"],
  rules: {
    "react-in-jsx-scope": "off",
    "react/forbid-component-props": ["error", { forbid: ["style"] }],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: ["tsx"],
      },
    ],
    "react/jsx-max-depth": ["error", { max: 5 }],
    "react/jsx-no-literals": "off",
    "react/jsx-props-no-spreading": "off",
  },
})
