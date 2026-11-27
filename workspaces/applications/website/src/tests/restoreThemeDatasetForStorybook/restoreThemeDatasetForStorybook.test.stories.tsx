import { expect } from "storybook/test"

import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"
import { restoreThemeDatasetForStorybook } from "./restoreThemeDatasetForStorybook.ts"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/**
 * restoreThemeDatasetForStorybook の回帰テスト。表示用の story は無いため meta を直接書く
 * preview の beforeEach が data-theme を設定済みのため、play の中で状態を作ってから直接呼ぶ
 */
const testMeta = {
  args: { label: "restore theme" },
  component: DummyForStorybook,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof DummyForStorybook>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForAbsentTheme: Story = {
  play: async () => {
    delete document.documentElement.dataset.theme
    const restoreThemeDataset = restoreThemeDatasetForStorybook()

    document.documentElement.dataset.theme = "light"
    restoreThemeDataset()
    // 文字列の "undefined" が残っていないこと(属性が無いと dataset の値は undefined になる)
    await expect(document.documentElement.dataset.theme).toBeUndefined()
  },
}

export const TestForPresentTheme: Story = {
  play: async () => {
    document.documentElement.dataset.theme = "dark"
    const restoreThemeDataset = restoreThemeDatasetForStorybook()

    document.documentElement.dataset.theme = "light"
    restoreThemeDataset()
    await expect(document.documentElement.dataset.theme).toBe("dark")
  },
}
