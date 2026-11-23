import { expect, within } from "storybook/test"

import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { DisabledOn, Off, On } from "./Toggle.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForOffState: Story = {
  ...Off,
  play: async (context) => {
    const { canvasElement } = context
    const switchElement = within(canvasElement).getByRole("switch", { name: "Toggle label" })
    await expect(switchElement).not.toBeChecked()
    await expect(switchElement).toBeEnabled()
    await expect(switchElement).toHaveAttribute("name", "toggle")
    await expect(switchElement).toHaveAttribute("value", "toggle")
  },
}

export const TestForOnState: Story = {
  ...On,
  play: async (context) => {
    const { canvasElement } = context
    const switchElement = within(canvasElement).getByRole("switch", { name: "Toggle label" })
    await expect(switchElement).toBeChecked()
  },
}

export const TestForChangeByClick: Story = {
  ...Off,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const switchElement = within(canvasElement).getByRole("switch", { name: "Toggle label" })

    await userEvent.click(switchElement)
    await expect(args.onChange).toHaveBeenCalledTimes(1)
    await expect(switchElement).toBeChecked()
  },
}

export const TestForChangeByLabelClick: Story = {
  ...Off,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByText("Toggle label"))
    await expect(args.onChange).toHaveBeenCalledTimes(1)
    await expect(canvas.getByRole("switch", { name: "Toggle label" })).toBeChecked()
  },
}

export const TestForChangeBySpaceKey: Story = {
  ...Off,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const switchElement = within(canvasElement).getByRole("switch", { name: "Toggle label" })

    await userEvent.tab()
    await expect(switchElement).toHaveFocus()
    await userEvent.keyboard(" ")
    await expect(args.onChange).toHaveBeenCalledTimes(1)
    await expect(switchElement).toBeChecked()
  },
}

export const TestForDisabled: Story = {
  ...DisabledOn,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole("switch", { name: "Toggle label" })
    await expect(switchElement).toBeDisabled()
    await expect(switchElement).toBeChecked()

    // Playwright は disabled 要素へのクリックを enabled になるまで待つため、force で actionability チェックを外す
    await userEvent.click(canvas.getByText("Toggle label"), { force: true })
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}
