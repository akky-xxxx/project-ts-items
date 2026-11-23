import { expect, within } from "storybook/test"

import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { Checked, DisabledChecked, Unchecked } from "./Radio.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForUncheckedState: Story = {
  ...Unchecked,
  play: async (context) => {
    const { canvasElement } = context
    const radioElement = within(canvasElement).getByRole("radio", { name: "Radio label" })
    await expect(radioElement).not.toBeChecked()
    await expect(radioElement).toBeEnabled()
    await expect(radioElement).toHaveAttribute("name", "radio")
    await expect(radioElement).toHaveAttribute("value", "radio")
  },
}

export const TestForCheckedState: Story = {
  ...Checked,
  play: async (context) => {
    const { canvasElement } = context
    const radioElement = within(canvasElement).getByRole("radio", { name: "Radio label" })
    await expect(radioElement).toBeChecked()
  },
}

export const TestForChangeByClick: Story = {
  ...Unchecked,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const radioElement = within(canvasElement).getByRole("radio", { name: "Radio label" })

    await userEvent.click(radioElement)
    await expect(args.onChange).toHaveBeenCalledTimes(1)
    await expect(radioElement).toBeChecked()
  },
}

export const TestForChangeByLabelClick: Story = {
  ...Unchecked,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByText("Radio label"))
    await expect(args.onChange).toHaveBeenCalledTimes(1)
    await expect(canvas.getByRole("radio", { name: "Radio label" })).toBeChecked()
  },
}

export const TestForChangeBySpaceKey: Story = {
  ...Unchecked,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const radioElement = within(canvasElement).getByRole("radio", { name: "Radio label" })

    await userEvent.tab()
    await expect(radioElement).toHaveFocus()
    await userEvent.keyboard(" ")
    await expect(args.onChange).toHaveBeenCalledTimes(1)
    await expect(radioElement).toBeChecked()
  },
}

export const TestForDisabled: Story = {
  ...DisabledChecked,
  play: async (context) => {
    const { args, canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const canvas = within(canvasElement)
    const radioElement = canvas.getByRole("radio", { name: "Radio label" })
    await expect(radioElement).toBeDisabled()
    await expect(radioElement).toBeChecked()

    // Playwright は disabled 要素へのクリックを enabled になるまで待つため、force で actionability チェックを外す
    await userEvent.click(canvas.getByText("Radio label"), { force: true })
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}
