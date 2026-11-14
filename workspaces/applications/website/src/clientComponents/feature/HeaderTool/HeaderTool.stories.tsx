import { cookies } from "@storybook/nextjs-vite/headers.mock"
import { getRouter } from "@storybook/nextjs-vite/navigation.mock"
import { expect, waitFor, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { restoreThemeDatasetForStorybook } from "../../../tests/restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"
import { selectOptionInPopoverForStorybook } from "../../../tests/selectOptionInPopoverForStorybook/selectOptionInPopoverForStorybook.ts"
import { HeaderTool } from "./HeaderTool.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderTool,

  argTypes: {
    darkThemeText: { description: "ダークテーマ選択肢用文字列" },
    languageLegendText: { description: "言語選択ポップアップの見出し文字列" },
    lightThemeText: { description: "ライトテーマ選択肢用文字列" },
    systemThemeText: { description: "システムテーマ選択肢用文字列" },
    theme: { description: "server component で取得した cookie の値" },
    themeLegendText: { description: "テーマ選択ポップアップの見出し文字列" },
  },
  args: {
    darkThemeText: "{darkThemeText}",
    languageLegendText: "{languageLegendText}",
    lightThemeText: "{lightThemeText}",
    systemThemeText: "{systemThemeText}",
    theme: "dark",
    themeLegendText: "{themeLegendText}",
  },
} satisfies Meta<typeof HeaderTool>

export default meta

type Story = StoryObj<typeof meta>
type Theme = NonNullable<Story["args"]>["theme"]

export const En: Story = { ...EN_LOCALE_FOR_STORYBOOK }
export const Ja: Story = { ...JA_LOCALE_FOR_STORYBOOK }

/** ボタンの中身はアイコン(または言語名)のみのため、現在の値がアクセシブルネームになる */
const createButtonNameStory = (base: Story, theme: Theme, buttonName: string): Story => ({
  ...base,
  args: { theme },
  play: async (context) => {
    const { canvasElement } = context
    await expect(within(canvasElement).getByRole("button", { name: buttonName })).toBeVisible()
  },
  tags: ["!autodocs"],
})

// TODO: 効果のない globals.locale を見直す
export const TestForLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    await expect(within(canvasElement).getByRole("link", { name: "GitHub" })).toMatchObject({
      href: "https://github.com/akky-xxxx/project-ts-items",
      rel: "noopener noreferrer",
      target: "_blank",
    })
  },
  tags: ["!autodocs"],
}

export const TestForThemeButtonLight = createButtonNameStory(En, "light", "{lightThemeText}")
export const TestForThemeButtonSystem = createButtonNameStory(En, "system", "{systemThemeText}")

export const TestForLanguageSelection: Story = {
  ...Ja,
  parameters: { nextjs: { navigation: { pathname: "/ja/a/ja", segments: [["locale", "ja"]] } } },
  play: async (context) => {
    const { canvasElement } = context
    await selectOptionInPopoverForStorybook(canvasElement, {
      buttonName: "日本語",
      legendText: "{languageLegendText}",
      nextOptionName: "English",
    })
    // Query string と hash は環境(iframe の URL)の値がそのまま保持される
    const { hash, search } = globalThis.location
    await expect(getRouter().replace).toHaveBeenCalledWith(`/en/a/ja${search}${hash}`)
  },
  tags: ["!autodocs"],
}

export const TestForThemeSelection: Story = {
  ...En,
  beforeEach: restoreThemeDatasetForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    await selectOptionInPopoverForStorybook(canvasElement, {
      buttonName: "{darkThemeText}",
      legendText: "{themeLegendText}",
      nextOptionName: "{lightThemeText}",
    })
    await expect(
      within(canvasElement).getByRole("radio", { hidden: true, name: "{lightThemeText}" }),
    ).toBeChecked()
    await expect(document.documentElement.dataset.theme).toBe("light")
    // ボタンのアイコンも選択したテーマに即時に切り替わる
    await expect(
      within(canvasElement).getByRole("button", { name: "{lightThemeText}" }),
    ).toBeInTheDocument()
    await waitFor(async () => {
      await expect(cookies().set).toHaveBeenCalledWith("THEME", "light", expect.anything())
    })
  },
  tags: ["!autodocs"],
}
