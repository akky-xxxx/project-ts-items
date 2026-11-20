import { fn } from "storybook/test"

import type { isFeatureEnabled as original } from "../isFeatureEnabled.ts"

/**
 * @description
 * storybook 用のモック。node:fs を読み込む本体の代わりに使い、既定では全ての feature flag を無効とする
 */
export const isFeatureEnabled = fn<typeof original>().mockResolvedValue(false)
