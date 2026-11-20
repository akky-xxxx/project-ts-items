import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"

import type { featureFlagSchema } from "@ts-items/feature-flags/website"
import type { ReactNode } from "react"
import type * as z from "zod/mini"

type Props = {
  currentFeatureElement?: ReactNode
  featureName: keyof z.output<typeof featureFlagSchema>
  newFeatureElement: ReactNode
}
type FetchedFeatureEnabledType = (props: Props) => Promise<ReactNode>

export const FetchedFeatureEnabled: FetchedFeatureEnabledType = async (props) => {
  const { currentFeatureElement, featureName, newFeatureElement } = props

  if (await isFeatureEnabled(featureName)) {
    return newFeatureElement
  }

  return currentFeatureElement ?? null
}
