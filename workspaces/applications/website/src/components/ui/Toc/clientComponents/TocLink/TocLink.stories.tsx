import { TocLink } from "./TocLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: TocLink,

  argTypes: {
    anchor: { description: "リンク先のアンカー(# 付き)" },
    children: { description: "リンクテキスト" },
    isCurrent: { description: '現在位置かどうか(true のとき aria-current="location" を付ける)' },
  },
  args: {},
} satisfies Meta<typeof TocLink>

export default meta

type Story = StoryObj<typeof meta>

export const DeActive: Story = {
  args: {
    anchor: "#about",
    children: "About",
    isCurrent: false,
  },
}

export const Active: Story = {
  args: {
    anchor: "#install",
    children: "Install",
    isCurrent: true,
  },
}
