import { expect } from "storybook/test"

import { DARK_THEME_FOR_STORYBOOK } from "../DARK_THEME_FOR_STORYBOOK/DARK_THEME_FOR_STORYBOOK.ts"
import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"
import { JA_LOCALE_FOR_STORYBOOK } from "../JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { SMALL_VIEWPORT_FOR_STORYBOOK } from "../SMALL_VIEWPORT_FOR_STORYBOOK/SMALL_VIEWPORT_FOR_STORYBOOK.ts"
import { mergeStoryPresetsForStorybook } from "./mergeStoryPresetsForStorybook.ts"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/**
 * mergeStoryPresetsForStorybook の回帰テスト。表示用の story は無いため meta を直接書く
 */
const testMeta = {
  args: { label: "merge presets" },
  component: DummyForStorybook,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof DummyForStorybook>

export default testMeta

type Story = StoryObj<typeof testMeta>

/**
 * locale は既定値(en)と異なる ja を使う。en だと、helper が globals.locale を落としても既定値で en になり、テストが通ってしまうため
 */
export const TestForLocaleViewportTheme: Story = {
  ...mergeStoryPresetsForStorybook(
    JA_LOCALE_FOR_STORYBOOK,
    SMALL_VIEWPORT_FOR_STORYBOOK,
    DARK_THEME_FOR_STORYBOOK,
  ),
  play: async (context) => {
    await expect(context.globals).toHaveProperty("locale", "ja")
    await expect(context.globals).toHaveProperty("viewport", { value: "small" })
    await expect(context.parameters).toHaveProperty(
      ["nextjs", "navigation", "segments"],
      [["locale", "ja"]],
    )
    await expect(document.documentElement.dataset.theme).toBe("dark")
    await expect(globalThis.innerWidth).toBe(375)
  },
}
