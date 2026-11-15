import { expect, within } from "storybook/test"

import meta from "./DocsSidebar.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForElements: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{packagesSelectorElement}")).toBeVisible()
    await expect(canvas.getByText("v1.0.0")).toBeVisible()
    await expect(canvas.getByText("{latestText}")).toBeVisible()
  },
}

export const TestForNavigation: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const navigationElement = within(canvasElement).getByRole("navigation", {
      name: "{navigationLabelText}",
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
    await expect(canvas.getByRole("link", { name: "GitHub ({newTabText})" })).toMatchObject({
      href: "https://github.com/akky-xxxx/project-ts-items",
      rel: "noopener noreferrer",
      target: "_blank",
    })
  },
}
