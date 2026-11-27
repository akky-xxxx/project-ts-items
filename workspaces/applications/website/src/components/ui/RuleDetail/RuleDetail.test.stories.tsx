import { expect, within } from "storybook/test"

import meta, { WithOption, WithoutOption } from "./RuleDetail.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForHeader: Story = {
  ...WithoutOption,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 4, name: "{ruleName}" })).toBeInTheDocument()
  },
}

export const TestForWithOption: Story = {
  ...WithOption,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Copy" })).toBeInTheDocument()
    await expect(canvasElement.querySelector("code")).not.toBeNull()
  },
}

export const TestForWithoutOption: Story = {
  ...WithoutOption,
  play: async (context) => {
    const { canvasElement } = context
    await expect(canvasElement.querySelector("code")).toBeNull()
  },
}
