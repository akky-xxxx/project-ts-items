import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { baseConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  ignorePatterns: ["workspaces/**"],
})

export default config
