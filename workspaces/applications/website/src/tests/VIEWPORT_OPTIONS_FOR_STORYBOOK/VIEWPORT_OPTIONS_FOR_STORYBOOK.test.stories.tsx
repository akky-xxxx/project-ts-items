import { expect } from "storybook/test"

import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"
import { LARGE_VIEWPORT_FOR_STORYBOOK } from "../LARGE_VIEWPORT_FOR_STORYBOOK/LARGE_VIEWPORT_FOR_STORYBOOK.ts"
import { MEDIUM_VIEWPORT_FOR_STORYBOOK } from "../MEDIUM_VIEWPORT_FOR_STORYBOOK/MEDIUM_VIEWPORT_FOR_STORYBOOK.ts"
import { SMALL_VIEWPORT_FOR_STORYBOOK } from "../SMALL_VIEWPORT_FOR_STORYBOOK/SMALL_VIEWPORT_FOR_STORYBOOK.ts"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/**
 * .storybook/preview.tsx に登録する viewport の回帰テスト。表示用の story は無いため meta を直接書く
 * 条件は src/app/[locale]/presets.css の custom media と同じものを書く
 */
const testMeta = {
  args: { label: "viewport" },
  component: DummyForStorybook,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof DummyForStorybook>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForSmall: Story = {
  ...SMALL_VIEWPORT_FOR_STORYBOOK,
  play: async () => {
    await expect(globalThis.innerWidth).toBe(375)
    await expect(globalThis.matchMedia("(768px >= width)").matches).toBe(true)
  },
}

export const TestForMedium: Story = {
  ...MEDIUM_VIEWPORT_FOR_STORYBOOK,
  play: async () => {
    await expect(globalThis.innerWidth).toBe(834)
    await expect(globalThis.matchMedia("(768px < width < 1024px)").matches).toBe(true)
  },
}

/**
 * large は viewport が見つからない場合の既定の寸法(1200x900)と同じため、描画幅だけでは登録・選択を区別できない
 * そのため globals の選択値と、parameters に登録された寸法も確かめる
 */
export const TestForLarge: Story = {
  ...LARGE_VIEWPORT_FOR_STORYBOOK,
  play: async (context) => {
    await expect(context.globals).toHaveProperty("viewport", { value: "large" })
    await expect(context.parameters).toHaveProperty(["viewport", "options", "large", "styles"], {
      height: "900px",
      width: "1200px",
    })
    await expect(globalThis.innerWidth).toBe(1200)
    await expect(globalThis.matchMedia("(width >= 1024px)").matches).toBe(true)
  },
}
