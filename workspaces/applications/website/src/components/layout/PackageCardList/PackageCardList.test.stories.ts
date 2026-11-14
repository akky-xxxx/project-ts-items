import { expect, within } from "storybook/test"

import meta, { DoubleLane, SingleLane } from "./PackageCardList.stories.ts"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

const countGridColumns = (element: HTMLElement) =>
  getComputedStyle(element).gridTemplateColumns.split(" ").length

const getLineClamp = (element: HTMLElement) =>
  getComputedStyle(element).getPropertyValue("-webkit-line-clamp")

export const TestForListItems: Story = {
  ...SingleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const listElement = canvas.getByRole("list")
    await expect(within(listElement).getAllByRole("listitem")).toHaveLength(2)
  },
}

export const TestForSingleLane: Story = {
  ...SingleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(countGridColumns(canvas.getByRole("list"))).toBe(1)
  },
}

export const TestForDoubleLane: Story = {
  ...DoubleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(countGridColumns(canvas.getByRole("list"))).toBe(2)
  },
}

export const TestForSingleLaneDescriptionNotClamped: Story = {
  ...SingleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const lineClamps = canvas.getAllByText("{descriptionNode}").map(getLineClamp)
    await expect(lineClamps).toEqual(["none", "none"])
  },
}

export const TestForDoubleLaneDescriptionClamped: Story = {
  ...DoubleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const lineClamps = canvas.getAllByText("{descriptionNode}").map(getLineClamp)
    await expect(lineClamps).toEqual(["2", "2"])
  },
}
