import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { Breadcrumb } from "./Breadcrumb.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Breadcrumb,

  ...EN_LOCALE_FOR_STORYBOOK,
  argTypes: {
    items: {
      description:
        "ルートより後ろの階層(最後の項目は現在のページとしてテキストで表示。空配列の場合はルートを現在のページとしてテキストで表示)",
    },
    labelText: { description: "nav 要素のアクセシブルネーム" },
  },
  args: {
    items: [
      {
        href: "/packages",
        text: "{packages-text}",
      },
      {
        text: "oxlint-config",
      },
    ],
    labelText: "{labelText}",
  },
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
