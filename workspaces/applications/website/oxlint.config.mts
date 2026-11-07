import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { nextConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

const config = defineConfig({
  extends: [nextConfig, forConfigurationFiles, storybookConfig],
  options: {
    typeAware: true,
  },
  overrides: [
    {
      // Request config は next-intl の規約で default export する
      files: ["src/i18n/request.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
})

export default config
