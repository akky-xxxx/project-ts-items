import { HeaderNavigation } from "./HeaderNavigation.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderNavigation,
} satisfies Meta<typeof HeaderNavigation>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  globals: {
    locale: "en",
  },
}
export const Ja: Story = {
  globals: {
    locale: "ja",
  },
}
