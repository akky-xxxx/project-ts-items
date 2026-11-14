import { expect, within } from "storybook/test"

import meta from "./RootLayout.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForLandmarks: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headerElement = within(canvas.getByRole("banner"))
    await expect(headerElement.getByText("{headerInnerElement}")).toBeInTheDocument()
    await expect(canvas.getByText("{children0}")).toBeInTheDocument()
    await expect(canvas.queryByRole("main")).not.toBeInTheDocument()
  },
}

export const TestForFooter: Story = {
  play: async (context) => {
    const { canvasElement } = context
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
}
