import { expect, userEvent, waitFor, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import meta from "./ExpandableContents.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForInitialState: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const buttonElement = canvas.getByRole("button", { name: "Expand" })
    const regionElement = canvas.getByRole("region", { name: "Collapsed contents" })
    await expect(buttonElement).toHaveAttribute("aria-expanded", "false")
    await expect(buttonElement).toHaveAttribute("aria-controls", regionElement.id)
    await expect(regionElement).toHaveAttribute("tabindex", "0")
  },
}

export const TestForExpand: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const contentsId = canvas.getByRole("region", { name: "Collapsed contents" }).id
    await userEvent.click(canvas.getByRole("button", { name: "Expand" }))

    const buttonElement = await canvas.findByRole("button", { name: "Collapse" })
    await expect(buttonElement).toHaveAttribute("aria-expanded", "true")
    await expect(buttonElement).toHaveAttribute("aria-controls", contentsId)
    await expect(canvas.queryByRole("region")).not.toBeInTheDocument()

    const contentsElement = canvasElement.querySelector(`#${CSS.escape(contentsId)}`)
    await expect(contentsElement).not.toHaveAttribute("tabindex")
  },
}

export const TestForCollapse: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Expand" }))
    await userEvent.click(await canvas.findByRole("button", { name: "Collapse" }))

    const buttonElement = await canvas.findByRole("button", { name: "Expand" })
    await expect(buttonElement).toHaveAttribute("aria-expanded", "false")
    await expect(
      await canvas.findByRole("region", { name: "Collapsed contents" }),
    ).toBeInTheDocument()
  },
}

export const TestForKeyboardScroll: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const realUserEvent = await getUserEventForStorybook()
    const regionElement = within(canvasElement).getByRole("region", {
      name: "Collapsed contents",
    })
    await expect(regionElement.scrollTop).toBe(0)

    await realUserEvent.tab()
    await expect(regionElement).toHaveFocus()
    await realUserEvent.keyboard("{ArrowDown}")
    await waitFor(async () => {
      await expect(regionElement.scrollTop).toBeGreaterThan(0)
    })
  },
}

export const TestForMaxHeight: Story = {
  args: {
    maxHeight: "120px",
  },
}

export const TestForJaLabels: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole("region", { name: "折りたたまれたコンテンツ" }),
    ).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "展開する" }))
    await expect(await canvas.findByRole("button", { name: "折りたたむ" })).toBeInTheDocument()
  },
}
