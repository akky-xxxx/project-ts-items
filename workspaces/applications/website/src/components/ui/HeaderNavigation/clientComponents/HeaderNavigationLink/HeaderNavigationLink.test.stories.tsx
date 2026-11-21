import { expect, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import meta, { Active, DeActive } from "./HeaderNavigationLink.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForDeActiveLinkStyle: Story = {
  ...DeActive,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const inactiveLinkElement = canvas.getByRole("link", { name: "HeaderNavigationLink" })
    await waitFor(async () => {
      await expect(inactiveLinkElement).toHaveStyle({
        color: "#687371",
      })
    })
  },
}

export const TestForActiveLinkStyle: Story = {
  ...Active,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const activeLinkElement = canvas.getByRole("link", { name: "HeaderNavigationLink" })
    await waitFor(async () => {
      await expect(activeLinkElement).toHaveStyle({
        color: "#202827",
      })
    })
  },
}

export const TestForActiveItemWithTrailingSlash: Story = {
  ...Active,
  args: {
    href: "/href",
  },
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const activeLinkElement = within(canvasElement).getByRole("link", {
      name: "HeaderNavigationLink",
    })
    await waitFor(async () => {
      await expect(activeLinkElement).toHaveStyle({
        color: "#202827",
      })
    })
  },
}
