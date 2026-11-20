import type { KnipConfig } from "knip"

export default {
  entry: ["compatibility/*/index.ts", "src/**/*.test.ts", "src/index.ts"],
  // @types/react 18 での型テストと TS 5.0 の互換チェック用。tsconfig の paths からのみ参照する
  ignoreDependencies: ["@types/react-18"],
} as const satisfies KnipConfig
