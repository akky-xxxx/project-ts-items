import { DRY_RUN_FIXTURE_PATTERNS } from "./dryRun/index.mts"

import type { KnipConfig } from "knip"

export default {
  entry: ["**/*.test.mts"],
  ignore: [...DRY_RUN_FIXTURE_PATTERNS],
} as const satisfies KnipConfig
