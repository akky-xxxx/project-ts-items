export const EXPECTED_TS_WITH_STORYBOOK = `import { baseConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [baseConfig, storybookConfig],
})`
