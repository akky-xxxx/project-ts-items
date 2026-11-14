import { expect, userEvent, waitFor, within } from "storybook/test"

import meta from "./OptionSwitcher.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForSelection: Story = {
  play: async (context) => {
    const { args, canvasElement } = context
    const canvas = within(canvasElement)
    const item3Element = canvas.getByRole("radio", { name: "item3" })
    const item4Element = canvas.getByRole("radio", { name: "item4" })
    await expect(item3Element).toBeChecked()
    await expect(item3Element.closest("label")?.querySelector("svg")).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1)

    await userEvent.click(canvas.getByText("item4"))
    await expect(args.handleChange).toHaveBeenCalledWith("3")
    await waitFor(async () => {
      await expect(item4Element).toBeChecked()
    })
    await expect(item3Element).not.toBeChecked()
    await expect(item4Element.closest("label")?.querySelector("svg")).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1)
  },
}
