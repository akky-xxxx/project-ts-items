import { expect, within } from "storybook/test"

import meta, { En } from "./Packages.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForHeading: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headingElement = canvas.getByRole("heading", { level: 1, name: "Packages" })
    await expect(headingElement).toBeInTheDocument()
  },
}

export const TestForDescription: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Packages managed by @ts-items.")).toBeInTheDocument()
  },
}

export const TestForListItems: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    // パンくずの li を除いた、パッケージ一覧の li を対象にする
    const listItemElements = canvas
      .getAllByRole("listitem")
      .filter((listItemElement) => listItemElement.closest("nav") === null)
    await expect(listItemElements).toHaveLength(2)
  },
}

export const TestForBreadcrumbLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForBreadcrumbCurrentPage: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const currentPageElement = within(navigationElement).getByText("Packages")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
}
