import { defineConfig } from "oxfmt"

import { tsItemConfig } from "./configurations/oxfmt/tsItemConfig/tsItemConfig.mts"

export default defineConfig({
  ...tsItemConfig,
  ignorePatterns: ["**/workspaces/**"],
})
