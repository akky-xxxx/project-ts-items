import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { Toc } from "./Toc.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Toc,

  argTypes: {
    items: {
      description: "目次の項目(anchor: リンク先のアンカー、text: 表示するテキスト)",
    },
  },
  args: {
    items: [
      {
        anchor: "#about",
        text: "about",
      },
      {
        anchor: "#install",
        text: "Install",
      },
    ],
  },
} satisfies Meta<typeof Toc>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = { ...EN_LOCALE_FOR_STORYBOOK }
export const Ja: Story = { ...JA_LOCALE_FOR_STORYBOOK }
