import { expect, waitFor, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import meta from "./Breadcrumb.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForNavigationLabel: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForJaNavigationLabel: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "パンくずリスト" })
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

export const TestForItemLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const itemLinkElement = canvas.getByRole("link", { name: "{packages-text}" })
    await expect(itemLinkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForCurrentPageWithoutLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("oxlint-config")).toBeInTheDocument()
    await expect(canvas.queryByRole("link", { name: "oxlint-config" })).not.toBeInTheDocument()
  },
}

export const TestForItemWithoutHref: Story = {
  args: {
    items: [{ text: "Category" }],
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
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const itemLinkElement = canvas.getByRole("link", { name: "{packages-text}" })
    await expect(itemLinkElement).not.toHaveAttribute("aria-current")
  },
}

export const TestForItemSameAsCurrentPageText: Story = {
  args: {
    currentPageText: "Shared",
    items: [{ text: "Shared" }],
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

export const TestForHoverStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const linkElement = within(canvasElement).getByRole("link", { name: "@ts-items" })
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ color: "rgb(104, 115, 113)" })
    })

    await userEvent.hover(linkElement)
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ color: "rgb(25, 90, 73)" })
    })
    await userEvent.unhover(linkElement)
  },
}

export const TestForFocusVisibleStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const linkElement = within(canvasElement).getByRole("link", { name: "@ts-items" })
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ color: "rgb(104, 115, 113)" })
    })

    await userEvent.tab()
    await expect(linkElement).toHaveFocus()
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ color: "rgb(25, 90, 73)" })
    })
  },
}
