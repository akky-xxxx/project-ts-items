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
      files: ["./*.{,m,c}{j,t}s"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "no-default-export": "off",
        "unicorn/prefer-module": "off",
      },
    },
    {
      files: ["**/*.d.{,m}ts"],
      rules: {
        "import/no-unassigned-import": "off",
        "import/unambiguous": "off",
      },
    },
  ],
})
