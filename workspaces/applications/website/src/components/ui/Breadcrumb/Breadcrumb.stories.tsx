import { expect, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { Breadcrumb } from "./Breadcrumb.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Breadcrumb,

  ...EN_LOCALE_FOR_STORYBOOK,
  argTypes: {
    items: {
      description: "ルートより後ろの階層(最後の項目は現在のページとしてテキストで表示)",
    },
    labelText: { description: "nav 要素のアクセシブルネーム" },
  },
  args: {
    items: [
      {
        href: "/packages",
        text: "{packages-text}",
      },
      {
        text: "oxlint-config",
      },
    ],
    labelText: "{labelText}",
  },
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TestForNavigationLabel: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "{labelText}" })
    await expect(navigationElement).toBeInTheDocument()
  },
  tags: ["!autodocs"],
}

export const TestForCurrentPage: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const currentPageElement = canvas.getByText("oxlint-config")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
  tags: ["!autodocs"],
}

export const TestForRootLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const rootLinkElement = canvas.getByRole("link", { name: "@ts-items" })
    await expect(rootLinkElement).toHaveAttribute("href", "/en/")
  },
  tags: ["!autodocs"],
}

export const TestForItemLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const itemLinkElement = canvas.getByRole("link", { name: "{packages-text}" })
    await expect(itemLinkElement).toHaveAttribute("href", "/en/packages/")
  },
  tags: ["!autodocs"],
}

export const TestForItemWithoutHref: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("oxlint-config")).toBeInTheDocument()
    await expect(canvas.queryByRole("link", { name: "oxlint-config" })).not.toBeInTheDocument()
  },
  tags: ["!autodocs"],
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
  tags: ["!autodocs"],
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
  tags: ["!autodocs"],
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
  tags: ["!autodocs"],
}

export const TestForItemOrder: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const itemTexts = canvas.getAllByRole("listitem").map((element) => element.textContent)
    await expect(itemTexts).toStrictEqual(["@ts-items", "{packages-text}", "oxlint-config"])
  },
  tags: ["!autodocs"],
}
