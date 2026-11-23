import { GENERATED_RELEASE_PATTERNS } from "@ts-items/configurations/release"
import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
  ignorePatterns: [...GENERATED_RELEASE_PATTERNS],
})
