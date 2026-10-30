import { DRY_RUN_IGNORE_PATTERNS } from "@ts-items/configurations/dryRun"

import type { KnipConfig } from "knip"

export default {
  entry: ["src/configurations/index.ts"],
  ignore: [...DRY_RUN_IGNORE_PATTERNS],
  ignoreDependencies: ["@tsconfig/strictest"],
} as const satisfies KnipConfig
