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

export const En: Story = {
  globals: {
    locale: "en",
  },
}
export const Ja: Story = {
  globals: {
    locale: "ja",
  },
}
