import { forConfigurationFiles } from "@ts-items/configurations/oxlint/forConfigurationFiles"
import { defineConfig } from "oxlint"

import { base } from "./src/base/base.ts"

const config = defineConfig({
  ignorePatterns: ["workspaces/**"],
  ...base,
  ...forConfigurationFiles,
})

export default config
