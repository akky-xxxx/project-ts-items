import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { MenuModalInner } from "./MenuModalInner.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: MenuModalInner,

  argTypes: {
    navigationElement: {
      control: false,
      description: "メニューモーダルのナビゲーション(MenuModalNavigation を想定)",
    },
    toolElement: {
      control: false,
      description: "テーマ・言語の切り替えなどのツール(MenuModalTool を想定)",
    },
  },
  args: {
    navigationElement: <DummyForStorybook label="navigationElement" />,
    toolElement: <DummyForStorybook label="toolElement" />,
  },
  globals: {
    viewport: { value: "mobile2" },
  },
} satisfies Meta<typeof MenuModalInner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
