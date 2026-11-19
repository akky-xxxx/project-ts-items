import type { featureFlagSchema } from "../../schemas/featureFlagSchema/featureFlagSchema.ts"
import type * as z from "zod/mini"

export type FeatureFlag = z.output<typeof featureFlagSchema>
