import type { FeatureFlag } from "../../types/FeatureFlag/FeatureFlag.ts"

export const prdFeatureFlag = {
  sampleFeature: "enabled",
} as const satisfies FeatureFlag
