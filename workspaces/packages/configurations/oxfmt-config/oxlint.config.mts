import { forConfigurationFiles } from "@ts-items/configurations/oxlint/forConfigurationFiles"
import { base } from "@ts-items/oxlint-config-ts/base"
import { defineConfig } from "oxlint"

const config = defineConfig({
  ignorePatterns: ["workspaces/**"],
  ...base,
  ...forConfigurationFiles,
})

export default config
