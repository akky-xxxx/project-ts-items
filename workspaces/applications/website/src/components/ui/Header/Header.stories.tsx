import { expect, within } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { Header } from "./Header.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Header,

  argTypes: {
    navigationElement: { control: false },
    toolElement: { control: false },
  },
  args: {
    navigationElement: <DummyForStorybook label="navigationElement" />,
    toolElement: <DummyForStorybook label="toolElement" />,
  },
} satisfies Meta<typeof Header>

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
    await expect(packagesLinkElement).toHaveAttribute("href", "/en")
  },
  tags: ["!autodocs"],
}
