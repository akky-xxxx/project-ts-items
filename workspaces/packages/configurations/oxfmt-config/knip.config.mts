import type { KnipConfig } from "knip"

export default {
  entry: ["src/*/*.ts"],
  ignoreDependencies: ["@tsconfig/strictest"],
} as const satisfies KnipConfig
