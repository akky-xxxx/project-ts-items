import { expect, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import meta, { ChangeLogDisabled, En } from "./HeaderNavigation.stories.tsx"

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
    const changeLogLinkElement = await canvas.findByText<HTMLLinkElement>("Change log")
    await expect(isFeatureEnabled).toHaveBeenCalledWith("changeLogPagesFeature")
    await expect(changeLogLinkElement).toHaveAttribute("href", "/en/change-log/")
    await expect(changeLogLinkElement).not.toHaveAttribute("target")
  },
}

export const TestForChangeLogLinkHidden: Story = {
  ...ChangeLogDisabled,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await canvas.findByText("Packages")
    await expect(canvas.queryByText("Change log")).not.toBeInTheDocument()
  },
}

export const TestForHoverStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const linkElement = within(canvasElement).getByRole("link", { name: "Packages" })
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
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const linkElement = within(canvasElement).getByRole("link", { name: "Packages" })
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

/**
 * タッチ端末(hover: none)では、hover しても文字色が変わらない(タップ後に hover の見た目が残らない)。
 * タグ touch により、hasTouch で作った browser context(vitest の storybook-touch project)で実行して hover: none を再現する
 * (CDP のタッチエミュレーションは Linux の Chromium で無効化しても hover: none が戻らず、後続のテストに残るため使わない)
 */
export const TestForTouchDeviceHoverStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const { userEvent } = await import("vitest/browser")
    await expect(globalThis.matchMedia("(hover: none)").matches).toBe(true)
    const linkElement = within(canvasElement).getByRole("link", { name: "Packages" })
    await userEvent.hover(linkElement)
    await expect(linkElement.matches(":hover")).toBe(true)
    // 色が変わる場合は transition が始まるため、実行中の transition が無いことで変化が無いことを確かめる
    await expect(linkElement.getAnimations()).toHaveLength(0)
    await expect(linkElement).toHaveStyle({ color: "rgb(104, 115, 113)" })
    await userEvent.unhover(linkElement)
  },
  tags: ["touch"],
}
