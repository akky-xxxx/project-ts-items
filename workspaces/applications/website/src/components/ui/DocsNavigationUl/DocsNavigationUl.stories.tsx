import { DocsNavigationUl } from "./DocsNavigationUl.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const items = [
  {
    childProps: {
      items: [
        {
          childProps: {
            items: [
              {
                href: "/docs/a1-1-1",
                text: "a1-1-1",
              },
            ],
          },
          href: "/docs/a1-1",
          text: "a1-1",
        },
        {
          href: "/docs/a1-2",
          text: "a1-2",
        },
      ],
    },
    href: "/docs/a1",
    text: "a1",
  },
  {
    href: "/docs/a2",
    text: "a2",
  },
  {
    childProps: {
      items: [
        {
          href: "/docs/a2-1",
          text: "a2-1",
        },
        {
          href: "/docs/a2-2",
          text: "a2-2",
        },
      ],
    },
    href: "/docs/a3",
    text: "a3",
  },
  {
    href: "/docs/a4",
    text: "a4",
  },
]

const meta = {
  component: DocsNavigationUl,

  argTypes: {
    items: {
      description:
        "表示する項目(childProps.items を指定すると入れ子のリストを表示。undefined の場合は何も表示しない)",
    },
  },
  args: {
    items,
  },
} satisfies Meta<typeof DocsNavigationUl>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
