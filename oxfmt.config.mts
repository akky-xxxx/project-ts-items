import { base } from "@ts-items/oxfmt-config/base"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...base,
  ignorePatterns: ["**/workspaces/**"],
})
