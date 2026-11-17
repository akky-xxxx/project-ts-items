import { expect, within } from "storybook/test"

import meta, { En } from "./OxlintConfigHome.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForHeadingStructure: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const heading1Texts = canvas
      .getAllByRole("heading", { level: 1 })
      .map((element) => element.textContent)
    const heading2Texts = canvas
      .getAllByRole("heading", { level: 2 })
      .map((element) => element.textContent)
    await expect(heading1Texts).toStrictEqual(["Introduction"])
    await expect(heading2Texts).toStrictEqual(["Overview"])
  },
}

export const TestForPageDescriptionLineBreak: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const descriptionElement = canvas.getByText(/Shareable configuration for oxlint/u).closest("p")
    await expect(descriptionElement?.querySelectorAll("br")).toHaveLength(1)
  },
}

export const TestForBackgroundDescriptionLineBreak: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const descriptionElement = canvas.getByText(/It helps keep code maintainable/u).closest("p")
    await expect(descriptionElement?.querySelectorAll("br")).toHaveLength(1)
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

export const TestForBreadcrumbPackagesLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const linkElement = within(navigationElement).getByRole("link", { name: "Packages" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForBreadcrumbCurrentPage: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const currentPageElement = within(navigationElement).getByText("oxlint-config")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
}
