/**
 * @description
 * storybook 向けの関数。vitest の Browser Mode の userEvent を返す。
 * Playwright 経由で実際のポインタ・キーボードを操作するため、CSS の :hover / :focus-visible が適用される
 * (storybook/test の userEvent は合成イベントのため適用されない)。
 * vitest/browser は Browser Mode の外で読み込むと throw するため、play 関数の中で動的に import する
 */
export const getUserEventForStorybook = async () => {
  const { userEvent } = await import("vitest/browser")

  return userEvent
}
