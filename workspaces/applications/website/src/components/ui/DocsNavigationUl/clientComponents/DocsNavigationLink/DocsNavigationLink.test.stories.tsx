import { expect, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { Active, DeActive } from "./DocsNavigationLink.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

/**
 * 実ポインタは他のテストと共有されており、直前のテストが残した位置によってはリンクに :hover が当たるため、
 * リンクの下の何も無い位置へ移して hover されていない状態にしてから確かめる
 * (layout が fullscreen のためリンクは左上隅から始まり、左上隅はリンクの上になる。
 * vitest の unhover は body の中央を hover するため、body の高さによってはリンクの上になる)
 */
export const TestForDeActiveLinkStyle: Story = {
  ...DeActive,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const userEvent = await getUserEventForStorybook()
    const inactiveLinkElement = canvas.getByRole("link", { name: "DocsNavigationLink" })
    await userEvent.hover(document.documentElement, {
      // キー名の x / y は vitest(Playwright)の hover の API が定めるキー名のため変えられない
      // oxlint-disable-next-line eslint/id-length
      position: { x: 1, y: inactiveLinkElement.getBoundingClientRect().bottom + 1 },
    })
    await expect(inactiveLinkElement.matches(":hover")).toBe(false)
    await waitFor(async () => {
      await expect(inactiveLinkElement).toHaveStyle({
        backgroundColor: "rgb(255, 255, 255)",
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
    const activeLinkElement = canvas.getByRole("link", { name: "DocsNavigationLink" })
    await waitFor(async () => {
      await expect(activeLinkElement).toHaveStyle({
        backgroundColor: "rgb(240, 245, 242)",
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
      name: "DocsNavigationLink",
    })
    await waitFor(async () => {
      await expect(activeLinkElement).toHaveStyle({
        backgroundColor: "rgb(240, 245, 242)",
      })
    })
  },
}
