import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { defineConfig } from "oxlint"

import { baseConfig } from "./src/configurations/index.ts"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  options: {
    typeAware: true,
  },
})

export default config
