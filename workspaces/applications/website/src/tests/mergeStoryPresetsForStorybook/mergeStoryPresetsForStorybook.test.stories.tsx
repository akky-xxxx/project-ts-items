import { expect } from "storybook/test"

import { DARK_THEME_FOR_STORYBOOK } from "../DARK_THEME_FOR_STORYBOOK/DARK_THEME_FOR_STORYBOOK.ts"
import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"
import { EN_LOCALE_FOR_STORYBOOK } from "../EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
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

export const TestForLocaleViewportTheme: Story = {
  ...mergeStoryPresetsForStorybook(
    EN_LOCALE_FOR_STORYBOOK,
    SMALL_VIEWPORT_FOR_STORYBOOK,
    DARK_THEME_FOR_STORYBOOK,
  ),
  play: async (context) => {
    await expect(context.globals).toHaveProperty("locale", "en")
    await expect(context.globals).toHaveProperty("viewport", { value: "small" })
    await expect(context.parameters).toHaveProperty(
      ["nextjs", "navigation", "segments"],
      [["locale", "en"]],
    )
    await expect(document.documentElement.dataset.theme).toBe("dark")
    await expect(globalThis.innerWidth).toBe(375)
  },
}
