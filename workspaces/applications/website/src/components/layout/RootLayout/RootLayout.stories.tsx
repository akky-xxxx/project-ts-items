import { expect, within } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import { RootLayout } from "./RootLayout.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: RootLayout,

  argTypes: {
    children: { control: false },
    headerInnerElement: { control: false },
  },
  args: {
    children: <LongContents />,
    headerInnerElement: <DummyForStorybook label="headerInnerElement" />,
  },
} satisfies Meta<typeof RootLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TestForLandmarks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const headerElement = within(canvas.getByRole("banner"))
    await expect(headerElement.getByText("{headerInnerElement}")).toBeInTheDocument()
    await expect(canvas.getByText("{children0}")).toBeInTheDocument()
    await expect(canvas.queryByRole("main")).not.toBeInTheDocument()
  },
  tags: ["!autodocs"],
}
