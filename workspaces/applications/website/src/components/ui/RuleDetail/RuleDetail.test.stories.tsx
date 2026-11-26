import { expect, within } from "storybook/test"

import meta, { WithMultipleOptions, WithOption, WithoutOption } from "./RuleDetail.stories.tsx"

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
    await expect(canvas.getByText("ERROR")).toBeInTheDocument()
  },
}

export const TestForWithOption: Story = {
  ...WithOption,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("JSON")).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Copy" })).toBeInTheDocument()
    await expect(canvasElement.querySelector("code")?.textContent).toBe('{\n  "max": 100\n}')
  },
}

export const TestForWithMultipleOptions: Story = {
  ...WithMultipleOptions,
  play: async (context) => {
    const { canvasElement } = context
    await expect(canvasElement.querySelector("code")?.textContent).toBe(
      '[\n  "asc",\n  {\n    "allowLineSeparatedGroups": true\n  }\n]',
    )
  },
}

export const TestForWithoutOption: Story = {
  ...WithoutOption,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("JSON")).not.toBeInTheDocument()
    await expect(canvasElement.querySelector("code")).toBeNull()
  },
}
