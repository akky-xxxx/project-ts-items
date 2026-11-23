import { expect, userEvent, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta from "./OptionSwitcher.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForSelection: Story = {
  play: async (context) => {
    const { args, canvasElement } = context
    const canvas = within(canvasElement)
    const item3Element = canvas.getByRole("radio", { name: "item3" })
    const item4Element = canvas.getByRole("radio", { name: "item4" })
    await expect(item3Element).toBeChecked()
    await expect(item3Element.closest("label")?.querySelector("svg")).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1)

    await userEvent.click(canvas.getByText("item4"))
    await expect(args.handleChange).toHaveBeenCalledWith("3")
    await waitFor(async () => {
      await expect(item4Element).toBeChecked()
    })
    await expect(item3Element).not.toBeChecked()
    await expect(item4Element.closest("label")?.querySelector("svg")).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1)
  },
}

/** 項目の label 要素(背景色・outline は label に付く) */
const getLabelElement = (canvasElement: HTMLElement, name: string) => {
  const labelElement = within(canvasElement).getByRole("radio", { name }).closest("label")
  if (labelElement === null) {
    throw new TypeError("label element not found")
  }

  return labelElement
}

export const TestForUncheckedItemHoverStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const browserUserEvent = await getUserEventForStorybook()
    const labelElement = getLabelElement(canvasElement, "item1")
    await waitFor(async () => {
      await expect(labelElement).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" })
    })

    await browserUserEvent.hover(labelElement)
    await waitFor(async () => {
      await expect(labelElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
    await browserUserEvent.unhover(labelElement)
  },
}

export const TestForCheckedItemHoverStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const browserUserEvent = await getUserEventForStorybook()
    const labelElement = getLabelElement(canvasElement, "item3")
    await waitFor(async () => {
      await expect(labelElement).toHaveStyle({ backgroundColor: "rgb(237, 245, 241)" })
    })

    await browserUserEvent.hover(labelElement)
    await expect(labelElement.matches(":hover")).toBe(true)
    // 色が変わる場合は transition が始まるため、実行中の transition が無いことで変化が無いことを確かめる
    await expect(labelElement.getAnimations()).toHaveLength(0)
    await expect(labelElement).toHaveStyle({ backgroundColor: "rgb(237, 245, 241)" })
    await browserUserEvent.unhover(labelElement)
  },
}

export const TestForCheckedItemFocusVisibleStyle: Story = {
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const browserUserEvent = await getUserEventForStorybook()
    const radioElement = within(canvasElement).getByRole("radio", { name: "item3" })
    const labelElement = getLabelElement(canvasElement, "item3")
    // 選択中の項目は autoFocus されるため、見出しをクリックして focus を外し、Tab の起点を項目の前に置く
    await browserUserEvent.click(within(canvasElement).getByText("{OptionSwitcher}"))
    await expect(radioElement).not.toHaveFocus()
    await waitFor(async () => {
      await expect(labelElement).toHaveStyle({ outlineStyle: "none" })
    })

    await browserUserEvent.tab()
    await expect(radioElement).toHaveFocus()
    await expect(labelElement).toHaveStyle({
      backgroundColor: "rgb(237, 245, 241)",
      outlineStyle: "solid",
      outlineWidth: "2px",
    })
  },
}
