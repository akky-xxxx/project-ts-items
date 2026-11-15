import { expect, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta from "./DocsNavigationUl.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForItemLink: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole("link", { name: "a2" })
    await expect(linkElement).toHaveAttribute("href", "/en/docs/a2/")
  },
}

export const TestForNestedList: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole("list")).toHaveLength(4)

    const parentItemElement = canvas.getByRole("link", { name: "a1" }).closest("li")
    const childLinkElement = canvas.getByRole("link", { name: "a1-1-1" })
    await expect(parentItemElement).toContainElement(childLinkElement)
  },
}

export const TestForItemOrder: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const linkTexts = canvas.getAllByRole("link").map((element) => element.textContent)
    await expect(linkTexts).toStrictEqual([
      "a1",
      "a1-1",
      "a1-1-1",
      "a1-2",
      "a2",
      "a3",
      "a2-1",
      "a2-2",
      "a4",
    ])
  },
}

export const TestForUndefinedItems: Story = {
  args: {
    items: undefined,
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole("list")).not.toBeInTheDocument()
  },
}

export const TestForActiveItemStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const activeLinkElement = canvas.getByRole("link", { name: "a1-1" })
    const inactiveLinkElement = canvas.getByRole("link", { name: "a2" })
    await waitFor(async () => {
      await expect(activeLinkElement).toHaveStyle({
        backgroundColor: "rgb(240, 245, 242)",
        fontWeight: "700",
      })
      await expect(inactiveLinkElement).toHaveStyle({
        backgroundColor: "rgb(255, 255, 255)",
        fontWeight: "400",
      })
    })
  },
}

export const TestForActiveItemWithTrailingSlash: Story = {
  args: {
    currentPathname: "/docs/a1-1/",
  },
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const activeLinkElement = within(canvasElement).getByRole("link", { name: "a1-1" })
    await waitFor(async () => {
      await expect(activeLinkElement).toHaveStyle({
        backgroundColor: "rgb(240, 245, 242)",
        fontWeight: "700",
      })
    })
  },
}

export const TestForHoverStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const linkElement = within(canvasElement).getByRole("link", { name: "a2" })
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" })
    })

    await userEvent.hover(linkElement)
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
    await userEvent.unhover(linkElement)
  },
}

export const TestForFocusVisibleStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const linkElement = within(canvasElement).getByRole("link", { name: "a1" })
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" })
    })

    await userEvent.tab()
    await expect(linkElement).toHaveFocus()
    await waitFor(async () => {
      await expect(linkElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
  },
}

/**
 * タッチ端末(hover: none)では、hover しても背景色が変わらない(タップ後に hover の見た目が残らない)。
 * タグ touch により、hasTouch で作った browser context(vitest の storybook-touch project)で実行して hover: none を再現する
 * (CDP のタッチエミュレーションは Linux の Chromium で無効化しても hover: none が戻らず、後続のテストに残るため使わない)
 */
export const TestForTouchDeviceHoverStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const { userEvent } = await import("vitest/browser")
    await expect(globalThis.matchMedia("(hover: none)").matches).toBe(true)
    const linkElement = within(canvasElement).getByRole("link", { name: "a2" })
    await userEvent.hover(linkElement)
    await expect(linkElement.matches(":hover")).toBe(true)
    // 色が変わる場合は transition が始まるため、実行中の transition が無いことで変化が無いことを確かめる
    await expect(linkElement.getAnimations()).toHaveLength(0)
    await expect(linkElement).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" })
    await userEvent.unhover(linkElement)
  },
  tags: ["touch"],
}
