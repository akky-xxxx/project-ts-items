import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { nextConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

const config = defineConfig({
  extends: [nextConfig, forConfigurationFiles, storybookConfig],
  options: {
    typeAware: true,
  },
})

export default config
