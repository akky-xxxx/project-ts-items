import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { SuspenseDecorator } from "../../../tests/SuspenseDecorator/SuspenseDecorator.tsx"
import { MenuModalInner } from "./MenuModalInner.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: MenuModalInner,

  args: {
    navigationElement: <DummyForStorybook label="navigationElement" />,
    toolElement: <DummyForStorybook label="toolElement" />,
  },
  decorators: [SuspenseDecorator],
} satisfies Meta<typeof MenuModalInner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
