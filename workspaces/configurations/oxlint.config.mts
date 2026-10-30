import { baseConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

import { forConfigurationFiles } from "./oxlint/index.mts"

const config = defineConfig({
  extends: [baseConfig, forConfigurationFiles],
  options: {
    typeAware: true,
  },
})

export default config
