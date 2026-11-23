import { expect, within } from "storybook/test"

import meta, { Heading1, Heading2 } from "./Heading.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForHeading1: Story = {
  ...Heading1,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headingElement = canvas.getByRole("heading", { level: 1, name: "{h1}" })
    await expect(headingElement).toBeInTheDocument()
  },
}

export const TestForHeading2: Story = {
  ...Heading2,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headingElement = canvas.getByRole("heading", { level: 2, name: "{h2}" })
    await expect(headingElement).toBeInTheDocument()
  },
}
