import type { FeatureFlag } from "../../types/FeatureFlag/FeatureFlag.ts"

export const localFeatureFlag = {
  oxlintDetailPagesFeature: "enabled",
  reactTypesPagesFeature: "enabled",
  sampleFeature: "enabled",
  searchFeature: "enabled",
} as const satisfies FeatureFlag
