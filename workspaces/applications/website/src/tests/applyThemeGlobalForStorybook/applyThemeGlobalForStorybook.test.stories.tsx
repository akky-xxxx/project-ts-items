import { expect } from "storybook/test"

import { DARK_THEME_FOR_STORYBOOK } from "../DARK_THEME_FOR_STORYBOOK/DARK_THEME_FOR_STORYBOOK.ts"
import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"
import { fixLightThemeForStorybook } from "../fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { LIGHT_THEME_FOR_STORYBOOK } from "../LIGHT_THEME_FOR_STORYBOOK/LIGHT_THEME_FOR_STORYBOOK.ts"
import { applyThemeGlobalForStorybook } from "./applyThemeGlobalForStorybook.ts"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/**
 * .storybook/preview.tsx の beforeEach に登録する applyThemeGlobalForStorybook の回帰テスト。表示用の story は無いため meta を直接書く
 */
const testMeta = {
  args: { label: "theme" },
  component: DummyForStorybook,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof DummyForStorybook>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForDefault: Story = {
  play: async () => {
    await expect(document.documentElement.dataset.theme).toBe("system")
  },
}

export const TestForDark: Story = {
  ...DARK_THEME_FOR_STORYBOOK,
  play: async () => {
    await expect(document.documentElement.dataset.theme).toBe("dark")
  },
}

export const TestForLight: Story = {
  ...LIGHT_THEME_FOR_STORYBOOK,
  play: async () => {
    await expect(document.documentElement.dataset.theme).toBe("light")
  },
}

/** preview の beforeEach は story の beforeEach より先に実行されるため、story 側で data-theme を上書きできる */
export const TestForStoryBeforeEach: Story = {
  ...DARK_THEME_FOR_STORYBOOK,
  beforeEach: fixLightThemeForStorybook,
  play: async () => {
    await expect(document.documentElement.dataset.theme).toBe("light")
  },
}

export const TestForInvalidTheme: Story = {
  play: async () => {
    document.documentElement.dataset.theme = "dark"
    const restoreThemeDataset = applyThemeGlobalForStorybook({ globals: { theme: "unknown" } })
    await expect(document.documentElement.dataset.theme).toBe("dark")

    document.documentElement.dataset.theme = "light"
    restoreThemeDataset()
    await expect(document.documentElement.dataset.theme).toBe("dark")
  },
}
