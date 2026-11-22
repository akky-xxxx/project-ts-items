import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import { ExpandableContents } from "./ExpandableContents.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: ExpandableContents,

  args: {
    children: <LongContents text="ExpandableContents" />,
  },
} satisfies Meta<typeof ExpandableContents>

export default meta

type Story = StoryObj<typeof meta>

export const Shrink: Story = {}
