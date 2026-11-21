import { expect, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import meta from "./DocsSidebar.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForElements: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{packagesSelectorElement}")).toBeVisible()
    await expect(canvas.getByText("1.0.0")).toBeVisible()
    await expect(canvas.getByText("Latest")).toBeVisible()
  },
}

export const TestForNavigation: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const navigationElement = within(canvasElement).getByRole("navigation", {
      name: "Documentation",
    })
    await expect(
      within(navigationElement).getByText("{docsNavigationUlElement}"),
    ).toBeInTheDocument()
  },
}

export const TestForExternalLinks: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "GitHub (opens in a new tab)" })).toMatchObject({
      href: "https://github.com/akky-xxxx/project-ts-items",
      rel: "noopener noreferrer",
      target: "_blank",
    })
    await expect(canvas.getByRole("link", { name: "npm (opens in a new tab)" })).toMatchObject({
      href: "https://example.com/",
      rel: "noopener noreferrer",
      target: "_blank",
    })
  },
}

export const TestForJaTexts: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("最新版")).toBeVisible()
    await expect(canvas.getByRole("navigation", { name: "ドキュメント" })).toBeInTheDocument()
    await expect(
      canvas.getByRole("link", { name: "GitHub (新しいタブで開く)" }),
    ).toBeInTheDocument()
    await expect(canvas.getByRole("link", { name: "npm (新しいタブで開く)" })).toBeInTheDocument()
  },
}
