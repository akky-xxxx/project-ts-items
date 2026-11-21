import { DocsNavigationLink } from "./DocsNavigationLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: DocsNavigationLink,

  args: {
    children: "DocsNavigationLink",
    href: "/href/",
  },
} satisfies Meta<typeof DocsNavigationLink>

export default meta

type Story = StoryObj<typeof meta>

export const DeActive: Story = {}

export const Active: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/href/",
      },
    },
  },
}
