import { defineConfig } from "oxlint"

import { base } from "./src/base/base.ts"
import { forConfigurationFiles } from "@ts-items/configurations/oxlint/forConfigurationFiles"

const config = defineConfig({
  ignorePatterns: ["workspaces/**"],
  ...base,
  ...forConfigurationFiles,
})

export default config
