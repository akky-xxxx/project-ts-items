import { baseConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

import { DRY_RUN_IGNORE_PATTERNS } from "./dryRun/index.mts"
import { forConfigurationFiles } from "./oxlint/index.mts"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  ignorePatterns: [...DRY_RUN_IGNORE_PATTERNS],
  options: {
    typeAware: true,
  },
})

export default config
