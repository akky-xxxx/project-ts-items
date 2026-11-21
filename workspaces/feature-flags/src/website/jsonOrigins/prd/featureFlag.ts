import type { FeatureFlag } from "../../types/FeatureFlag/FeatureFlag.ts"

export const prdFeatureFlag = {
  oxlintDetailPagesFeature: "disabled",
  reactTypesPagesFeature: "disabled",
  sampleFeature: "disabled",
  searchFeature: "disabled",
} as const satisfies FeatureFlag
