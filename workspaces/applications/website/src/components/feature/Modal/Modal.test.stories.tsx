import { expect, waitFor, within } from "storybook/test"

import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { SpMenu } from "./Modal.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

const openModal = async (canvasElement: HTMLElement) => {
  const userEvent = await getUserEventForStorybook()
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("button", { name: "開く" }))
  await waitFor(async () => {
    await expect(canvas.getByRole("dialog")).toBeVisible()
  })

  return userEvent
}

/**
 * @description
 * dialog の外側で背景が見えている点の y 座標を返す。
 * dialog は横幅いっぱいのため、上に余白があれば上側、無ければ下側の余白の中央を使う
 */
const getBackdropY = (dialog: HTMLElement) => {
  const { bottom, top } = dialog.getBoundingClientRect()
  if (top > 0) {
    return top / 2
  }

  return (bottom + globalThis.innerHeight) / 2
}

export const TestForHiddenByDefault: Story = {
  ...SpMenu,
  play: async (context) => {
    const { canvasElement } = context
    const dialog = within(canvasElement).getByRole("dialog", { hidden: true })
    await expect(dialog).not.toBeVisible()
    await expect(dialog).not.toHaveAttribute("open")
  },
}

export const TestForOpenByCommandButton: Story = {
  ...SpMenu,
  play: async (context) => {
    const { canvasElement } = context
    await openModal(canvasElement)
    await expect(within(canvasElement).getByText("{Modal}")).toBeVisible()
  },
}

export const TestForCloseByEscapeKey: Story = {
  ...SpMenu,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await openModal(canvasElement)
    await userEvent.keyboard("{Escape}")
    await waitFor(async () => {
      await expect(within(canvasElement).getByRole("dialog", { hidden: true })).not.toBeVisible()
    })
  },
}

export const TestForCloseByBackdropClick: Story = {
  ...SpMenu,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await openModal(canvasElement)
    const dialog = within(canvasElement).getByRole("dialog")
    const backdropY = getBackdropY(dialog)
    // oxlint-disable-next-line id-length -- Playwright's position option requires x / y keys
    await userEvent.click(document.documentElement, { position: { x: 1, y: backdropY } })
    await waitFor(async () => {
      await expect(dialog).not.toBeVisible()
    })
  },
}
