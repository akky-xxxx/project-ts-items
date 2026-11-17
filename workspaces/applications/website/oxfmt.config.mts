import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
  // OpenAPI 定義は取得元から無加工で置く
  ignorePatterns: ["openapi/**"],
})
