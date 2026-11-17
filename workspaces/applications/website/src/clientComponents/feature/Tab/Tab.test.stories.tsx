import { expect, spyOn, userEvent, waitFor, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import meta from "./Tab.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForInitialContent: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{tabContent1}")).toBeInTheDocument()
    await expect(canvas.queryByText("{tabContent2}")).not.toBeInTheDocument()
    await expect(canvas.queryByText("{tabContent3}")).not.toBeInTheDocument()
  },
}

export const TestForContentsChange: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "tabLabelText2" }))
    await expect(await canvas.findByText("{tabContent2}")).toBeInTheDocument()
    await waitFor(async () => {
      await expect(canvas.queryByText("{tabContent1}")).not.toBeInTheDocument()
    })
  },
}

export const TestForCopyTextOfActiveTab: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const writeTextSpy = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).toHaveBeenLastCalledWith("copyText1")

      await userEvent.click(canvas.getByRole("button", { name: "tabLabelText2" }))
      await expect(await canvas.findByText("{tabContent2}")).toBeInTheDocument()
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).toHaveBeenLastCalledWith("copyText2")
    } finally {
      writeTextSpy.mockRestore()
    }
  },
}

export const TestForCurrentActiveTabValue: Story = {
  args: {
    currentActiveTabValue: "tabValue3",
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{tabContent3}")).toBeInTheDocument()
    await expect(canvas.queryByText("{tabContent1}")).not.toBeInTheDocument()
  },
}
