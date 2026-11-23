import { HeaderNavigationLink } from "./HeaderNavigationLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderNavigationLink,

  args: {
    children: "HeaderNavigationLink",
    href: "/href/",
  },
} satisfies Meta<typeof HeaderNavigationLink>

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
