export const EXPECTED_TS_WITH_TYPE_AWARE = `import { baseConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [baseConfig],
  options: {
    typeAware: true,
  },
})`
