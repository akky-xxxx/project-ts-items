import { expect, userEvent, within } from "storybook/test"

import meta from "./Tab.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForContentsChange: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const secondButtonElement = canvas.getByRole("button", { name: "Tab 2" })
    await expect(secondButtonElement).toBeInTheDocument()
    await userEvent.click(secondButtonElement)
    await expect(await canvas.findByText("Content for Tab 2")).toBeInTheDocument()
    await expect(canvas.queryByText("Content for Tab 1")).not.toBeInTheDocument()
  },
}
