import { expect, within } from "storybook/test"

import meta, { En } from "./HeaderNavigation.stories.tsx"

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
    const navigationElement = canvas.getByRole("navigation", { name: "Site navigation menu" })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForPackagesLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const packagesLinkElement = canvas.queryByText<HTMLLinkElement>("Packages")
    await expect(packagesLinkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForChangeLogLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const packagesLinkElement = canvas.queryByText<HTMLLinkElement>("Change log")
    await expect(packagesLinkElement).toHaveAttribute(
      "href",
      "https://github.com/akky-xxxx/project-ts-items/releases",
    )
    await expect(packagesLinkElement).toHaveAttribute("target", "_blank")
  },
}
