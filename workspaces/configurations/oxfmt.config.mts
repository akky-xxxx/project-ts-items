import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

import { DRY_RUN_IGNORE_PATTERNS } from "./dryRun/index.mts"

export default defineConfig({
  ...baseConfig,
  ignorePatterns: [...DRY_RUN_IGNORE_PATTERNS],
})
