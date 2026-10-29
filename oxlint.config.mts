import { forConfigurationFiles } from "@ts-items/configurations/oxlint/forConfigurationFiles"
import { baseConfig } from "@ts-items/oxlint-config/baseConfig"
import { defineConfig } from "oxlint"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  ignorePatterns: ["workspaces/**"],
})

export default config
