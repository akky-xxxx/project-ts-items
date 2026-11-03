import { DRY_RUN_IGNORE_PATTERNS } from "@ts-items/configurations/dryRun"
import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { defineConfig } from "oxlint"

import { baseConfig } from "./src/configurations/index.ts"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  ignorePatterns: [...DRY_RUN_IGNORE_PATTERNS],
  options: {
    typeAware: true,
  },
})

export default config
