/**
 * @description
 * storybook の beforeEach 向けの関数。story 内で書き換えた html 要素の data-theme を元に戻す
 */
export const restoreThemeDatasetForStorybook = () => {
  const { theme } = document.documentElement.dataset

  return () => {
    document.documentElement.dataset.theme = theme
  }
}
