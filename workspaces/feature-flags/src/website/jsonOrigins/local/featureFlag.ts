import type { FeatureFlag } from "../../types/FeatureFlag/FeatureFlag.ts"

export const localFeatureFlag = {
  sampleFeature: "enabled",
} as const satisfies FeatureFlag
