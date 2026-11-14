import { expect, within } from "storybook/test"

import meta, { En } from "./PackageCard.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole("link", { name: "@ts-items/oxlint-config" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/oxlint-config/")
  },
}

export const TestForHeading: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headingElement = canvas.getByRole("heading", {
      level: 2,
      name: "@ts-items/oxlint-config",
    })
    await expect(headingElement).toBeInTheDocument()
  },
}

export const TestForLinkTextHidden: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Documents >")).toHaveAttribute("aria-hidden", "true")
  },
}

export const TestForDescriptionLineBreak: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const descriptionElement = canvas.getByText(/First line/u).closest("p")
    await expect(descriptionElement?.querySelectorAll("br")).toHaveLength(1)
    await expect(descriptionElement).toHaveTextContent("First lineSecond line")
  },
}
