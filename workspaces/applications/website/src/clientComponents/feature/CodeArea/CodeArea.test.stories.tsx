import { expect, spyOn, userEvent, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import meta from "./CodeArea.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForContentsHeader: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{title}")).toBeInTheDocument()
    await expect(canvas.getByText("{copyIconElement}")).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  },
}

export const TestForChildren: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{children}")).toBeInTheDocument()
  },
}

export const TestForCopy: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const writeTextSpy = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).toHaveBeenLastCalledWith("{copyTargetText}")
      await expect(await canvas.findByText("Copied")).toBeInTheDocument()
    } finally {
      writeTextSpy.mockRestore()
    }
  },
}

export const TestForCopyTargetTextUndefined: Story = {
  args: {
    copyTargetText: undefined,
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const writeTextSpy = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    try {
      await userEvent.click(canvas.getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).not.toHaveBeenCalled()
    } finally {
      writeTextSpy.mockRestore()
    }
  },
}
