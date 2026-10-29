import { baseConfig } from "@ts-items/oxfmt-config/baseConfig"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
  ignorePatterns: ["**/workspaces/**"],
})
