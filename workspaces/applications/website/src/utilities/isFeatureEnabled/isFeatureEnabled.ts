import { loadData } from "./modules/loadData/loadData.ts"

import type { featureFlagSchema } from "@ts-items/feature-flags/website"
import type * as z from "zod/mini"

type FeatureName = keyof z.output<typeof featureFlagSchema>
type IsFeatureEnabled = (featureName: FeatureName) => Promise<boolean>

export const isFeatureEnabled: IsFeatureEnabled = async (featureName) => {
  try {
    const json = await loadData()

    return json[featureName] === "enabled"
  } catch {
    return false
  }
}
