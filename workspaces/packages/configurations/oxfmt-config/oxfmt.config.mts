import { DRY_RUN_IGNORE_PATTERNS } from "@ts-items/configurations/dryRun"
import { GENERATED_RELEASE_PATTERNS } from "@ts-items/configurations/release"
import { defineConfig } from "oxfmt"

import { baseConfig } from "./src/configurations/index.ts"

export default defineConfig({
  ...baseConfig,
  ignorePatterns: [...DRY_RUN_IGNORE_PATTERNS, ...GENERATED_RELEASE_PATTERNS],
})
