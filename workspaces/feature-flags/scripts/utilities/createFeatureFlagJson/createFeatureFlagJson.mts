import { featureFlagSchema } from "@ts-items/feature-flags/website"

import { INDENT_SIZE } from "../../constants/INDENT_SIZE/INDENT_SIZE.mts"

export const createFeatureFlagJson = (featureFlag: unknown) => {
  const parsedFeatureFlag = featureFlagSchema.parse(featureFlag)

  return JSON.stringify(parsedFeatureFlag, null, INDENT_SIZE)
}
