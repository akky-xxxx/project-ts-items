import { expect, within } from "storybook/test"

import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import meta, { En, EnWithChangeLog } from "./MenuModalNavigation.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForNavigationLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = await canvas.findByRole("navigation", {
      name: "Site navigation menu",
    })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForPackagesLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const packagesLinkElement = await canvas.findByRole("link", { name: "Packages" })
    await expect(packagesLinkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForChangeLogLink: Story = {
  ...EnWithChangeLog,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const changeLogLinkElement = await canvas.findByRole("link", { name: "Change log" })
    await expect(isFeatureEnabled).toHaveBeenCalledWith("changeLogPagesFeature")
    await expect(changeLogLinkElement).toHaveAttribute("href", "/en/change-log/")
  },
}

export const TestForChangeLogLinkHidden: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await canvas.findByRole("link", { name: "Packages" })
    await expect(canvas.queryByRole("link", { name: "Change log" })).not.toBeInTheDocument()
  },
}
