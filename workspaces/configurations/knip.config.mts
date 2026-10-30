import { DRY_RUN_IGNORE_PATTERNS } from "./dryRun/index.mts"

import type { KnipConfig } from "knip"

export default {
  entry: ["**/*.test.mts"],
  ignore: [...DRY_RUN_IGNORE_PATTERNS],
  ignoreDependencies: ["@tsconfig/strictest"],
} as const satisfies KnipConfig
