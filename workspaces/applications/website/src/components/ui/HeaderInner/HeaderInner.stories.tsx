import { expect, within } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { HeaderInner } from "./HeaderInner.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderInner,

  argTypes: {
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
    navigationElement: <DummyForStorybook label="navigationElement" />,
    toolElement: <DummyForStorybook label="toolElement" />,
  },
} satisfies Meta<typeof HeaderInner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TestForLink: Story = {
  globals: {
    locale: "en",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const packagesLinkElement = canvas.getByRole<HTMLLinkElement>("link")
    await expect(packagesLinkElement).toHaveAttribute("href", "/en/")
  },
  tags: ["!autodocs"],
}
