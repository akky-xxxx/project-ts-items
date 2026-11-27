import { expect, within } from "storybook/test"

import meta, { Default } from "./SwitchDescription.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForTitleText: Story = {
  ...Default,
  play: async (context) => {
    const { canvasElement } = context
    const titleElement = within(canvasElement).getByText("{titleText}")
    await expect(titleElement.tagName).toBe("STRONG")
  },
}
