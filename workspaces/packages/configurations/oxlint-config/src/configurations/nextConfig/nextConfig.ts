import { defineConfig } from "oxlint"

import { withRulePrefix } from "../../utilities/withRulePrefix/withRulePrefix.ts"
import { reactConfig } from "../reactConfig/reactConfig.ts"

export const nextConfig = defineConfig({
  extends: [reactConfig],
  ignorePatterns: ["**/next-env.d.ts"],
  overrides: [
    {
      files: [],
      rules: {
        ...withRulePrefix("import", {
          "no-unassigned-import": "off",
        }),
      },
    },
    {
      files: ["**/app/**/{page,layout,loading,error,not-found,global-error,template}.tsx"],
      rules: {
        ...withRulePrefix("import", {
          "no-default-export": "off",
        }),
        ...withRulePrefix("react", {
          "only-export-components": [
            "error",
            {
              allowExportNames: [
                "dynamic",
                "generateMetadata",
                "generateStaticParams",
                "metadata",
                "revalidate",
              ],
            },
          ],
        }),
      },
    },
    {
      files: ["**/app/**/layout.tsx"],
      rules: {
        ...withRulePrefix("eslint", {
          "new-cap": "off",
        }),
        ...withRulePrefix("import", {
          "no-default-export": "off",
          "no-unassigned-import": ["error", { allow: ["**/*.css"] }],
        }),
        ...withRulePrefix("oxc", {
          "no-async-await": "off",
        }),
      },
    },
    {
      files: ["**/proxy.ts"],
      rules: {
        ...withRulePrefix("import", {
          "no-default-export": "off",
        }),
      },
    },
  ],
  plugins: ["nextjs"],
})
