import type { FeatureFlag } from "../../types/FeatureFlag/FeatureFlag.ts"

export const stgFeatureFlag = {
  changeLogPagesFeature: "disabled",
  oxlintDetailPagesFeature: "disabled",
  reactTypesPagesFeature: "disabled",
  sampleFeature: "disabled",
  searchFeature: "disabled",
} as const satisfies FeatureFlag
