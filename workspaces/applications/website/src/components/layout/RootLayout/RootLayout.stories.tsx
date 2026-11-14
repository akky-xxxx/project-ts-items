import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import { RootLayout } from "./RootLayout.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: RootLayout,

  argTypes: {
    children: { control: false },
    headerInnerElement: { control: false },
    newTabText: { control: "text" },
    thisYear: { control: "number" },
  },
  args: {
    children: <LongContents />,
    headerInnerElement: <DummyForStorybook label="headerInnerElement" />,
    newTabText: "{newTabText}",
    thisYear: 2026,
  },
} satisfies Meta<typeof RootLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
