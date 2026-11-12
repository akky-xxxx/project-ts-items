import { expect, userEvent, waitFor, within } from "storybook/test"

interface Input {
  /** Popover を開くボタンのアクセシブルネーム(現在選択中の選択肢名と一致する前提) */
  buttonName: string
  legendText: string
  nextOptionName: string
}

/**
 * @description
 * storybook 向けの関数。ボタンから popover を開き、現在の選択肢が選択済みであることを確認したうえで
 * 別の選択肢を選び、popover が閉じるまで待つ
 */
export const selectOptionInPopoverForStorybook = async (
  canvasElement: HTMLElement,
  input: Input,
) => {
  const { buttonName, legendText, nextOptionName } = input
  const canvas = within(canvasElement)
  const groupElement = canvas.getByRole("group", { hidden: true, name: legendText })
  await expect(groupElement).not.toBeVisible()

  await userEvent.click(canvas.getByRole("button", { name: buttonName }))
  await waitFor(async () => expect(groupElement).toBeVisible())
  const group = within(groupElement)
  await expect(group.getByRole("radio", { name: buttonName })).toBeChecked()

  await userEvent.click(group.getByText(nextOptionName))
  await waitFor(async () => expect(groupElement).not.toBeVisible())
}
