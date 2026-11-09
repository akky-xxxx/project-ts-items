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
      // Font loader (next/font) の関数は大文字始まりだが constructor ではない
      files: ["src/constants/FONT_VARIABLES/FONT_VARIABLES.ts"],
      rules: {
        "eslint/new-cap": "off",
      },
    },
    {
      // Request config は next-intl の規約で default export する
      files: ["src/i18n/request.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  rules: {
    // Zod 公式の import スタイル(import * as z from "zod")を踏襲する
    "eslint/id-length": ["error", { exceptions: ["_", "z"], min: 2 }],
    "import/no-namespace": ["error", { ignore: ["zod", "zod/mini"] }],
  },
})

export default config
