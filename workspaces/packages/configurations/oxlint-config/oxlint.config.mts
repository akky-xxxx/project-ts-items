import { forConfigurationFiles } from "@ts-items/configurations/oxlint/forConfigurationFiles"
import { defineConfig } from "oxlint"

import { baseConfig } from "./src/baseConfig/baseConfig.ts"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  options: {
    typeAware: true,
  },
})

export default config
