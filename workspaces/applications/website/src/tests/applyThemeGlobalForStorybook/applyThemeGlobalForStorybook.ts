import { themeSchema } from "../../schemas/themeSchema/themeSchema.ts"
import { restoreThemeDatasetForStorybook } from "../restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"

import type { StoryContext } from "@storybook/nextjs-vite"

type ApplyThemeGlobalForStorybookInput = Pick<StoryContext, "globals">
type ApplyThemeGlobalForStorybook = (input: ApplyThemeGlobalForStorybookInput) => () => void

/**
 * @description
 * storybook の preview の beforeEach 向けの関数。globals の theme を html 要素の data-theme に設定し、story の終了後に元に戻す
 * theme が themeSchema の値でない場合は data-theme を変更しない
 */
export const applyThemeGlobalForStorybook: ApplyThemeGlobalForStorybook = (input) => {
  const restoreThemeDataset = restoreThemeDatasetForStorybook()
  const parsedTheme = themeSchema.safeParse(input.globals.theme)
  if (!parsedTheme.success) {
    return restoreThemeDataset
  }

  document.documentElement.dataset.theme = parsedTheme.data
  return restoreThemeDataset
}
