import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { HeaderMenuButton } from "./HeaderMenuButton.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderMenuButton,

  args: {
    children: <DummyForStorybook label="HeaderMenuButton" />,
  },
} satisfies Meta<typeof HeaderMenuButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
