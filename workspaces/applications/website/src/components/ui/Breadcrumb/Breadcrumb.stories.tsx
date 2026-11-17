import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { Breadcrumb } from "./Breadcrumb.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Breadcrumb,

  ...EN_LOCALE_FOR_STORYBOOK,
  argTypes: {
    currentPageText: {
      description:
        "現在のページ名(最後の項目としてテキストで表示。省略した場合はルートを現在のページとしてテキストで表示)",
    },
    items: {
      description: "ルートと現在のページの間の階層(現在のページとしては扱わない)",
    },
  },
  args: {
    currentPageText: PACKAGE_NAMES.oxlintConfig,
    items: [
      {
        href: "/packages/",
        text: "{packages-text}",
      },
    ],
  },
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
