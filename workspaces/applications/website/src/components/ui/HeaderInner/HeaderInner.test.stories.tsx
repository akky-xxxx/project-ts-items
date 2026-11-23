import { expect, within } from "storybook/test"

import meta from "./HeaderInner.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForLink: Story = {
  globals: {
    locale: "en",
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const packagesLinkElement = canvas.getByRole<HTMLLinkElement>("link")
    await expect(packagesLinkElement).toHaveAttribute("href", "/en/")
  },
}
