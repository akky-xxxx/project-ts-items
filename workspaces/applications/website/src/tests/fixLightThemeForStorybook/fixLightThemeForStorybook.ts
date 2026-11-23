import { restoreThemeDatasetForStorybook } from "../restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"

/**
 * @description
 * storybook の beforeEach 向けの関数。html 要素の data-theme を light に固定し、story の終了後に元に戻す
 */
export const fixLightThemeForStorybook = () => {
  const restoreThemeDataset = restoreThemeDatasetForStorybook()
  document.documentElement.dataset.theme = "light"

  return restoreThemeDataset
}
