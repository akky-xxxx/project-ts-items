import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { HeaderInner } from "./HeaderInner.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderInner,

  argTypes: {
    menuButtonElement: {
      control: false,
      description: "SP 幅で表示するメニューボタン(HeaderMenuButton を想定)",
    },
    navigationElement: {
      control: false,
      description: "ヘッダーのナビゲーション(HeaderNavigation を想定)",
    },
    toolElement: {
      control: false,
      description: "テーマ・言語の切り替えなどのツール(HeaderTool を想定)",
    },
  },
  args: {
    menuButtonElement: <DummyForStorybook label="menuButtonElement" />,
    navigationElement: <DummyForStorybook label="navigationElement" />,
    toolElement: <DummyForStorybook label="toolElement" />,
  },
} satisfies Meta<typeof HeaderInner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
