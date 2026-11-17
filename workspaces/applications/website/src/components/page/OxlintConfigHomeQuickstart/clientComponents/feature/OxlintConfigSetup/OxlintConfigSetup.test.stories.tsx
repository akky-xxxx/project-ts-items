import { expect, waitFor, within } from "storybook/test"

import { getUserEventForStorybook } from "../../../../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { En } from "./OxlintConfigSetup.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

/** 選択の変更は startTransition で反映されるため、表示中のコードを都度取得して待つ */
const getCodeText = (canvasElement: HTMLElement) =>
  canvasElement.querySelector("pre > code")?.textContent

export const TestForInitialBase: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("radio", { name: "TypeScript" })).toBeChecked()
    await expect(canvas.getByRole("radio", { name: "React" })).not.toBeChecked()
    await expect(canvas.getByRole("radio", { name: "Next.js" })).not.toBeChecked()
  },
}

export const TestForBaseGroup: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const group = within(canvasElement).getByRole("group", { name: "Select base configuration" })
    await expect(within(group).getAllByRole("radio")).toHaveLength(3)
  },
}

export const TestForInitialSwitches: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("switch", { name: /Type-aware linting/u })).toBeChecked()
    await expect(canvas.getByRole("switch", { name: /Vitest/u })).not.toBeChecked()
    await expect(canvas.getByRole("switch", { name: /Storybook/u })).not.toBeChecked()
  },
}

export const TestForCodeTitle: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    await expect(within(canvasElement).getByText("oxlint.config.mts")).toBeInTheDocument()
  },
}

export const TestForChangeBase: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    await expect(getCodeText(canvasElement)).toContain("baseConfig")

    await userEvent.click(within(canvasElement).getByRole("radio", { name: "React" }))
    await waitFor(async () => expect(getCodeText(canvasElement)).toContain("reactConfig"))
    await expect(getCodeText(canvasElement)).not.toContain("baseConfig")
  },
}

export const TestForToggleStorybook: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    await expect(getCodeText(canvasElement)).not.toContain("storybookConfig")

    await userEvent.click(within(canvasElement).getByRole("switch", { name: /Storybook/u }))
    await waitFor(async () => expect(getCodeText(canvasElement)).toContain("storybookConfig"))
  },
}

export const TestForToggleVitest: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    await expect(getCodeText(canvasElement)).not.toContain("vitestConfig")

    await userEvent.click(within(canvasElement).getByRole("switch", { name: /Vitest/u }))
    await waitFor(async () => expect(getCodeText(canvasElement)).toContain("vitestConfig"))
  },
}

export const TestForToggleTypeAwareLinting: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    await expect(getCodeText(canvasElement)).toContain("typeAware: true")

    await userEvent.click(
      within(canvasElement).getByRole("switch", { name: /Type-aware linting/u }),
    )
    await waitFor(async () => expect(getCodeText(canvasElement)).not.toContain("typeAware"))
  },
}
