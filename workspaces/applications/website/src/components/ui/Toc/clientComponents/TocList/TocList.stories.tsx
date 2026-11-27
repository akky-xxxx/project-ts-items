import { TocList } from "./TocList.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: TocList,

  argTypes: {
    items: {
      description:
        "目次の項目(anchor: リンク先のアンカー、text: 表示するテキスト)。anchor の見出しが画面上部に入ると現在位置になる。末尾までスクロールしている間は最後の項目が現在位置になる",
    },
  },
  args: {
    items: [
      {
        anchor: "#about",
        text: "About",
      },
      {
        anchor: "#install",
        text: "Install",
      },
    ],
  },
} satisfies Meta<typeof TocList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
