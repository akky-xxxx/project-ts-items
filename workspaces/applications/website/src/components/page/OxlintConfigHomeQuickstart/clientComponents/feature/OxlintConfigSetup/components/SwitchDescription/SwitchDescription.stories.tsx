import { SwitchDescription } from "./SwitchDescription.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: SwitchDescription,

  argTypes: {
    descriptionText: { description: "見出しの後に表示する説明" },
    titleText: { description: "強調して表示する見出し" },
  },
  args: {
    descriptionText: "{descriptionText}",
    titleText: "{titleText}",
  },
} satisfies Meta<typeof SwitchDescription>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
