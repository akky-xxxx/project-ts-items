import { DRY_RUN_IGNORE_PATTERNS } from "@ts-items/configurations/dryRun"
import { GENERATED_RELEASE_PATTERNS } from "@ts-items/configurations/release"
import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
  ignorePatterns: [...DRY_RUN_IGNORE_PATTERNS, ...GENERATED_RELEASE_PATTERNS],
})
