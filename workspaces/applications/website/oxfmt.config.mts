import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
  // 取得元から無加工で置く OpenAPI 定義(手書きの定義は対象にする)
  ignorePatterns: ["openapi/npmRegistry/**"],
})
