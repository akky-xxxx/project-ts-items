import { expect, within } from "storybook/test"

import meta, { En, Ja } from "./ExternalLink.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForAttributes: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole<HTMLAnchorElement>("link", {
      name: "External link (opens in a new tab)",
    })
    await expect(linkElement).toHaveAttribute("href", "https://example.com")
    await expect(linkElement).toHaveAttribute("rel", "noopener noreferrer")
    await expect(linkElement).toHaveAttribute("target", "_blank")
  },
}

export const TestForJaAccessibleName: Story = {
  ...Ja,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole("link", { name: "External link (新しいタブで開く)" })
    await expect(linkElement).toBeInTheDocument()
  },
}
