export const EXPECTED_NEXT_WITH_STORYBOOK_AND_TYPE_AWARE = `import { nextConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [nextConfig, storybookConfig],
  options: {
    typeAware: true,
  },
})`
