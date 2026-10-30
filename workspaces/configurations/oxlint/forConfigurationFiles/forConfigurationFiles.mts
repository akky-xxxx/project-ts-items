import { defineConfig } from "oxlint"

export const forConfigurationFiles = defineConfig({
  overrides: [
    {
      files: ["./*.mts", "./scripts/**"],
      rules: {
        "no-nodejs-modules": "off",
      },
    },
    {
      files: ["./*.mts"],
      rules: {
        "no-default-export": "off",
      },
    },
  ],
})
