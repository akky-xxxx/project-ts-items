import { expect, within } from "storybook/test"

import { ExternalLink } from "./ExternalLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: ExternalLink,

  argTypes: {
    children: { description: "リンクテキスト" },
    href: { description: "リンク先 URL" },
  },
  args: {
    children: "External link",
    href: "https://example.com",
  },
} satisfies Meta<typeof ExternalLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TestForAttributes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole<HTMLAnchorElement>("link", { name: "External link" })
    await expect(linkElement).toHaveAttribute("href", "https://example.com")
    await expect(linkElement).toHaveAttribute("rel", "noopener noreferrer")
    await expect(linkElement).toHaveAttribute("target", "_blank")
  },
  tags: ["!autodocs"],
}
