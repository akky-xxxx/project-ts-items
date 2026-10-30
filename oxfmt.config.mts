import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
  ignorePatterns: ["**/workspaces/**"],
})
