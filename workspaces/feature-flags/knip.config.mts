import type { KnipConfig } from "knip"

export default {
  // JSON を出力する script から import するまでの一時的な除外。script の実装後に削除する
  ignore: [
    "src/website/jsonOrigins/local/featureFlag.ts",
    "src/website/types/FeatureFlag/FeatureFlag.ts",
  ],
} as const satisfies KnipConfig
