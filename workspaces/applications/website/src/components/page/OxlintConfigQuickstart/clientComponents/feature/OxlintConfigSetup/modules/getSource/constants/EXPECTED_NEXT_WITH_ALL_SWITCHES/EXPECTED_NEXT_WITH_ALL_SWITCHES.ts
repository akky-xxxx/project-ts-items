export const EXPECTED_NEXT_WITH_ALL_SWITCHES = `import { nextConfig, vitestConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [nextConfig, vitestConfig, storybookConfig],
  options: {
    typeAware: true,
  },
})`
