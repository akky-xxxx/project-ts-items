import { expect, within } from "storybook/test"

import meta from "./Breadcrumb.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForNavigationLabel: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "{labelText}" })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForCurrentPage: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const currentPageElement = canvas.getByText("oxlint-config")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
}

export const TestForRootLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const rootLinkElement = canvas.getByRole("link", { name: "@ts-items" })
    await expect(rootLinkElement).toHaveAttribute("href", "/en/")
  },
}

export const TestForEmptyItems: Story = {
  args: {
    items: [],
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("@ts-items")).toHaveAttribute("aria-current", "page")
    await expect(canvas.queryByRole("link", { name: "@ts-items" })).not.toBeInTheDocument()
  },
}

export const TestForItemLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const itemLinkElement = canvas.getByRole("link", { name: "{packages-text}" })
    await expect(itemLinkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForItemWithoutHref: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("oxlint-config")).toBeInTheDocument()
    await expect(canvas.queryByRole("link", { name: "oxlint-config" })).not.toBeInTheDocument()
  },
}

export const TestForNotLastItemWithoutHref: Story = {
  args: {
    items: [{ text: "Category" }, { text: "oxlint-config" }],
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Category")).not.toHaveAttribute("aria-current")
    await expect(canvas.queryByRole("link", { name: "Category" })).not.toBeInTheDocument()
    await expect(canvas.getByText("oxlint-config")).toHaveAttribute("aria-current", "page")
  },
}

export const TestForLastItemWithHref: Story = {
  args: {
    items: [{ href: "/packages", text: "{packages-text}" }],
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{packages-text}")).toHaveAttribute("aria-current", "page")
    await expect(canvas.queryByRole("link", { name: "{packages-text}" })).not.toBeInTheDocument()
  },
}

const sharedItem = { text: "Shared" }

export const TestForSharedItemReference: Story = {
  args: {
    items: [sharedItem, sharedItem],
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const currentPageElements = canvas
      .getAllByText("Shared")
      .filter((element) => element.getAttribute("aria-current") === "page")
    await expect(currentPageElements).toHaveLength(1)
  },
}

export const TestForItemOrder: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const itemTexts = canvas.getAllByRole("listitem").map((element) => element.textContent)
    await expect(itemTexts).toStrictEqual(["@ts-items", "{packages-text}", "oxlint-config"])
  },
}
