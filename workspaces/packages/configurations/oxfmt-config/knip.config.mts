import type { KnipConfig } from "knip"

export default {
  entry: ["src/configurations/index.ts"],
  ignoreDependencies: ["@tsconfig/strictest"],
} as const satisfies KnipConfig
