import type { FeatureFlag } from "../../types/FeatureFlag/FeatureFlag.ts"

export const stgFeatureFlag = {
  sampleFeature: "enabled",
} as const satisfies FeatureFlag
