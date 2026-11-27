import { TocLink } from "./TocLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: TocLink,

  argTypes: {
    anchor: {
      description:
        'リンク先のアンカー(# 付き。現在の URL の hash と一致すると aria-current="location" を付ける)',
    },
    children: { description: "リンクテキスト" },
  },
  args: {},
  decorators: [
    (Story) => {
      globalThis.history.replaceState(null, "", "#install")

      return <Story />
    },
  ],
} satisfies Meta<typeof TocLink>

export default meta

type Story = StoryObj<typeof meta>

export const DeActive: Story = {
  args: {
    anchor: "#about",
    children: "About",
  },
}

export const Active: Story = {
  args: {
    anchor: "#install",
    children: "Install",
  },
}
