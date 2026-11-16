import { defineConfig } from "oxlint"

import { withRulePrefix } from "../../utilities/withRulePrefix/withRulePrefix.ts"

export const vitestConfig = defineConfig({
  overrides: [
    {
      // Storybook の play 関数などで storybook/test から import した expect を誤検知しないよう、vitest のテストファイルに限る
      files: ["**/*.{spec,test}.{cjs,cts,js,jsx,mjs,mts,ts,tsx}", "**/spec/**"],
      rules: withRulePrefix("vitest", {
        "prefer-importing-vitest-globals": "error",
      }),
    },
  ],
  plugins: ["vitest"],
  rules: withRulePrefix("vitest", {
    "no-hooks": "off",
    "no-importing-vitest-globals": "off",
    "prefer-expect-assertions": [
      "error",
      {
        onlyFunctionsWithAsyncKeyword: true,
        onlyFunctionsWithExpectInCallback: true,
        onlyFunctionsWithExpectInLoop: true,
      },
    ],
    "prefer-importing-vitest-globals": "off",
    "require-test-timeout": "off",
    "valid-title": ["error", { allowArguments: true }],
  }),
})
