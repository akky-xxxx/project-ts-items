import type { KnipConfig } from "knip"

export default {
  ignore: ["workspaces/**"],
  ignoreDependencies: ["@tsconfig/strictest"],
} as const satisfies KnipConfig
