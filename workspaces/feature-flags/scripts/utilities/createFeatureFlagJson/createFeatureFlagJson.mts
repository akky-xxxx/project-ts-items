import { featureFlagSchema } from "@ts-items/feature-flags/website"
import * as z from "zod/mini"

import { INDENT_SIZE } from "../../constants/INDENT_SIZE/INDENT_SIZE.mts"

export const createFeatureFlagJson = (featureFlag: unknown) => {
  const result = featureFlagSchema.safeParse(featureFlag)

  if (!result.success) {
    throw new Error(z.prettifyError(result.error))
  }

  return JSON.stringify(result.data, null, INDENT_SIZE)
}
