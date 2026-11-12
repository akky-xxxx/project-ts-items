import { defineConfig } from "oxlint"

import { withRulePrefix } from "../../utilities/withRulePrefix/withRulePrefix.ts"

/* oxlint-disable no-magic-numbers */
export const storybookConfig = defineConfig({
  overrides: [
    {
      files: ["**/.storybook/**"],
      rules: {
        ...withRulePrefix("import", {
          "no-default-export": "off",
          "no-nodejs-modules": "off",
          "no-unassigned-import": "off",
        }),
        ...withRulePrefix("eslint", {
          "prefer-named-capture-group": "off",
          "require-unicode-regexp": "off",
        }),
      },
    },
    {
      files: ["**/*.stories.*"],
      rules: {
        ...withRulePrefix("eslint", {
          "max-lines": ["error", 300],
          "no-magic-numbers": "off",
          "no-param-reassign": "off",
        }),
        ...withRulePrefix("import", {
          "no-default-export": "off",
        }),
        ...withRulePrefix("typescript", {
          "restrict-template-expressions": "off",
          "strict-void-return": "off",
        }),
      },
    },
  ],
})
