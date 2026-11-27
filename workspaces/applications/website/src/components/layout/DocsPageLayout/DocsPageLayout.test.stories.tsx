import { expect, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import meta from "./DocsPageLayout.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

/**
 * children は main のランドマークの中に、tocElement は main の外に描画されることを検証する
 */
export const TestForLandmarks: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const mainElement = canvas.getByRole("main")
    await expect(within(mainElement).getByText("{children0}")).toBeInTheDocument()
    await expect(within(mainElement).queryByRole("navigation")).not.toBeInTheDocument()
    // 内部でスクロールする main は、キーボードでスクロールできるようフォーカスを受け取れる
    mainElement.focus()
    await expect(mainElement).toHaveFocus()

    const tocNavigationElement = canvas.getByRole("navigation", { name: "{tocLabelText}" })
    await expect(tocNavigationElement).toHaveTextContent("{tocElement0}")
  },
}
