import { expect, within } from "storybook/test"

import meta, { En } from "./Home.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForHeadingStructure: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const heading1Texts = canvas
      .getAllByRole("heading", { level: 1 })
      .map((element) => element.textContent)
    const heading2Texts = canvas
      .getAllByRole("heading", { level: 2 })
      .map((element) => element.textContent)
    const heading3Texts = canvas
      .getAllByRole("heading", { level: 3 })
      .map((element) => element.textContent)
    await expect(heading1Texts).toStrictEqual(["Tool for TypeScript projects"])
    await expect(heading2Texts).toStrictEqual(["Packages"])
    await expect(heading3Texts).toStrictEqual(["@ts-items/oxlint-config", "@ts-items/oxfmt-config"])
  },
}
