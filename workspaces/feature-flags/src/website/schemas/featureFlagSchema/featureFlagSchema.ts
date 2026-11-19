import * as z from "zod/mini"

import { FEATURE_FLAG_STATUSES } from "../../constants/FEATURE_FLAG_STATUSES/FEATURE_FLAG_STATUSES.ts"

type FeatureFlagShape = Record<string, (typeof FEATURE_FLAG_STATUSES)[number]>

export const featureFlagSchema = z.partial(
  z.object({
    sampleFeature: z.enum(FEATURE_FLAG_STATUSES),
  }) satisfies z.ZodMiniType<FeatureFlagShape>,
)
