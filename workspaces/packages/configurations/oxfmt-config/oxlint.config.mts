import { DRY_RUN_IGNORE_PATTERNS } from "@ts-items/configurations/dryRun"
import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { baseConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  ignorePatterns: ["workspaces/**", ...DRY_RUN_IGNORE_PATTERNS],
  options: {
    typeAware: true,
  },
})

export default config
