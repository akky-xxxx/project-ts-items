import { DRY_RUN_FIXTURE_PATTERNS } from "@ts-items/configurations/dryRun"

import type { KnipConfig } from "knip"

export default {
  entry: ["src/configurations/index.ts"],
  ignore: [...DRY_RUN_FIXTURE_PATTERNS],
} as const satisfies KnipConfig
