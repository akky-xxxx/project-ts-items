import { themeSchema } from "../../schemas/themeSchema/themeSchema.ts"
import { restoreThemeDatasetForStorybook } from "../restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"

import type { StoryContext } from "@storybook/nextjs-vite"

// userGlobals は公開の StoryContext 型に無いが、実行時の context には含まれる(storybook 10.6.7 の getStoryContext)
type ApplyThemeGlobalForStorybookInput = Pick<StoryContext, "globals" | "viewMode"> & {
  userGlobals?: StoryContext["globals"]
}
type ApplyThemeGlobalForStorybook = (input: ApplyThemeGlobalForStorybookInput) => () => void

/**
 * @description
 * storybook の preview の beforeEach 向けの関数。globals の theme を html 要素の data-theme に設定し、story の終了後に元に戻す
 * theme が themeSchema の値でない場合は data-theme を変更しない
 * Docs では同じページの story が html 要素を共有するため、story ごとの globals ではなくツールバーの値(userGlobals)を使う
 */
export const applyThemeGlobalForStorybook: ApplyThemeGlobalForStorybook = (input) => {
  const restoreThemeDataset = restoreThemeDatasetForStorybook()
  const theme: unknown = input.viewMode === "docs" ? input.userGlobals?.theme : input.globals.theme
  const parsedTheme = themeSchema.safeParse(theme)
  if (!parsedTheme.success) {
    return restoreThemeDataset
  }

  document.documentElement.dataset.theme = parsedTheme.data
  return restoreThemeDataset
}
