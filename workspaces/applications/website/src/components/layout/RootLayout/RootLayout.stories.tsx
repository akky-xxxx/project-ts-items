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

export const TestForFooter: Story = {
  play: async ({ canvasElement }) => {
    const footerElement = within(canvasElement).getByRole("contentinfo")
    await expect(footerElement).toHaveTextContent("© 2026 @ts-items · MIT License")

    const footer = within(footerElement)
    await expect(footer.getByRole("link", { name: "GitHub ({newTabText})" })).toMatchObject({
      href: "https://github.com/akky-xxxx/project-ts-items",
      rel: "noopener noreferrer",
      target: "_blank",
    })
    await expect(footer.getByRole("link", { name: "npm ({newTabText})" })).toMatchObject({
      href: "https://www.npmjs.com/org/ts-items",
      rel: "noopener noreferrer",
      target: "_blank",
    })
  },
  tags: ["!autodocs"],
}
