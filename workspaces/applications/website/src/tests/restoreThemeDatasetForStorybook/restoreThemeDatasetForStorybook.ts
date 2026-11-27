/**
 * @description
 * storybook の beforeEach 向けの関数。story 内で書き換えた html 要素の data-theme を元に戻す
 * 呼び出し時に data-theme が無かった場合は、属性ごと削除する
 */
export const restoreThemeDatasetForStorybook = () => {
  const { theme } = document.documentElement.dataset

  return () => {
    if (theme === undefined) {
      delete document.documentElement.dataset.theme
      return
    }

    document.documentElement.dataset.theme = theme
  }
}
