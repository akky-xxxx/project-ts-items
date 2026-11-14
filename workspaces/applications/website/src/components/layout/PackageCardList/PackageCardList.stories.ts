import { expect, within } from "storybook/test"

import { PackageCardList } from "./PackageCardList.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const countGridColumns = (element: HTMLElement) =>
  getComputedStyle(element).gridTemplateColumns.split(" ").length

const getLineClamp = (element: HTMLElement) =>
  getComputedStyle(element).getPropertyValue("-webkit-line-clamp")

const meta = {
  component: PackageCardList,

  args: {
    packages: [
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: "/packages/oxfmt-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxfmt-config",
        versionText: "v1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: "/packages/oxlint-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxlint-config",
        versionText: "v1.0.0",
      },
    ],
  },
} satisfies Meta<typeof PackageCardList>

export default meta

type Story = StoryObj<typeof meta>

export const SingleLane: Story = {
  args: {
    laneNumber: 1,
  },
}

export const DoubleLane: Story = {
  args: {
    laneNumber: 2,
  },
}

export const TestForListItems: Story = {
  ...SingleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const listElement = canvas.getByRole("list")
    await expect(within(listElement).getAllByRole("listitem")).toHaveLength(2)
  },
  tags: ["!autodocs"],
}

export const TestForSingleLane: Story = {
  ...SingleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(countGridColumns(canvas.getByRole("list"))).toBe(1)
  },
  tags: ["!autodocs"],
}

export const TestForDoubleLane: Story = {
  ...DoubleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(countGridColumns(canvas.getByRole("list"))).toBe(2)
  },
  tags: ["!autodocs"],
}

export const TestForSingleLaneDescriptionNotClamped: Story = {
  ...SingleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const lineClamps = canvas.getAllByText("{descriptionNode}").map(getLineClamp)
    await expect(lineClamps).toEqual(["none", "none"])
  },
  tags: ["!autodocs"],
}

export const TestForDoubleLaneDescriptionClamped: Story = {
  ...DoubleLane,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const lineClamps = canvas.getAllByText("{descriptionNode}").map(getLineClamp)
    await expect(lineClamps).toEqual(["2", "2"])
  },
  tags: ["!autodocs"],
}
