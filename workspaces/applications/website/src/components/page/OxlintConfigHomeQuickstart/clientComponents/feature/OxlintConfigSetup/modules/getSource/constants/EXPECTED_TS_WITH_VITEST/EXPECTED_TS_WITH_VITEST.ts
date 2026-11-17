export const EXPECTED_TS_WITH_VITEST = `import { baseConfig, vitestConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [baseConfig, vitestConfig],
})`
