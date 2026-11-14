import { Heading } from "./Heading.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Heading,

  argTypes: {
    children: { description: "見出しのテキスト" },
    headingTag: { description: "見出し要素(h1・h2)" },
  },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: {
    children: "{h1}",
    headingTag: "h1",
  },
}

export const Heading2: Story = {
  args: {
    children: "{h2}",
    headingTag: "h2",
  },
}
