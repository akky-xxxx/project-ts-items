import { expect, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import meta, { Allow, Off } from "./SeverityLabel.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForAllow: Story = {
  ...Allow,
  play: async (context) => {
    const { canvasElement } = context
    const labelElement = within(canvasElement).getByText("ALLOW")
    await expect(labelElement.style.getPropertyValue("--background")).toBe(
      "var(--color-severity-allow-background)",
    )
    await expect(labelElement.style.getPropertyValue("--color")).toBe(
      "var(--color-severity-allow-color)",
    )
    // Global.css で定義した変数が解決され、文字色が親から継承した色のままになっていないこと
    await expect(getComputedStyle(labelElement).color).not.toBe(
      getComputedStyle(canvasElement).color,
    )
  },
}

// ライトテーマで背景色とのコントラスト比 4.5:1 以上(約 5.06:1)を保つ配色であること
export const TestForOffLightThemeColor: Story = {
  ...Off,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const labelStyle = getComputedStyle(within(canvasElement).getByText("OFF"))
    await expect(labelStyle.color).toBe("rgb(92, 103, 101)")
    await expect(labelStyle.backgroundColor).toBe("rgb(236, 239, 238)")
  },
}

export const TestForUnknownValue: Story = {
  args: {
    severity: "unknown",
  },
  play: async (context) => {
    const { canvasElement } = context
    const labelElement = within(canvasElement).getByText("UNKNOWN")
    await expect(labelElement.style.getPropertyValue("--color")).toBe(
      "var(--color-severity-off-color)",
    )
  },
}
