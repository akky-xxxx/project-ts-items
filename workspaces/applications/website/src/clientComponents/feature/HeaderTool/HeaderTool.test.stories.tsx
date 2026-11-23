import { cookies } from "@storybook/nextjs-vite/headers.mock"
import { getRouter } from "@storybook/nextjs-vite/navigation.mock"
import { expect, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import { restoreThemeDatasetForStorybook } from "../../../tests/restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"
import { selectOptionInPopoverForStorybook } from "../../../tests/selectOptionInPopoverForStorybook/selectOptionInPopoverForStorybook.ts"
import meta, { En, Ja } from "./HeaderTool.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>
type Theme = NonNullable<Story["args"]>["theme"]

/** ボタンの中身はアイコン(または言語名)のみのため、現在の値がアクセシブルネームになる */
const createButtonNameStory = (base: Story, theme: Theme, buttonName: string): Story => ({
  ...base,
  args: { theme },
  play: async (context) => {
    const { canvasElement } = context
    await expect(within(canvasElement).getByRole("button", { name: buttonName })).toBeVisible()
  },
})

export const TestForThemeButtonLight = createButtonNameStory(En, "light", "Light")
export const TestForThemeButtonSystem = createButtonNameStory(En, "system", "System")

export const TestForLanguageSelection: Story = {
  ...Ja,
  parameters: { nextjs: { navigation: { pathname: "/ja/a/ja", segments: [["locale", "ja"]] } } },
  play: async (context) => {
    const { canvasElement } = context
    await selectOptionInPopoverForStorybook(canvasElement, {
      buttonName: "日本語",
      legendText: "言語",
      nextOptionName: "English",
    })
    // Query string と hash は環境(iframe の URL)の値がそのまま保持される
    const { hash, search } = globalThis.location
    await expect(getRouter().replace).toHaveBeenCalledWith(`/en/a/ja${search}${hash}`)
  },
}

export const TestForThemeSelection: Story = {
  ...En,
  beforeEach: restoreThemeDatasetForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    await selectOptionInPopoverForStorybook(canvasElement, {
      buttonName: "Dark",
      legendText: "Theme",
      nextOptionName: "Light",
    })
    await expect(
      within(canvasElement).getByRole("radio", { hidden: true, name: "Light" }),
    ).toBeChecked()
    await expect(document.documentElement.dataset.theme).toBe("light")
    // ボタンのアイコンも選択したテーマに即時に切り替わる
    await expect(within(canvasElement).getByRole("button", { name: "Light" })).toBeInTheDocument()
    await waitFor(async () => {
      await expect(cookies().set).toHaveBeenCalledWith("THEME", "light", expect.anything())
    })
  },
}

/** 通常時は背景が透明で、hover すると hover 用の背景色になる */
const createHoverStyleStory = (buttonName: string): Story => ({
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const element = within(canvasElement).getByRole("button", { name: buttonName })
    await waitFor(async () => {
      await expect(element).toHaveStyle({ backgroundColor: "rgba(0, 0, 0, 0)" })
    })

    await userEvent.hover(element)
    await waitFor(async () => {
      await expect(element).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
    await userEvent.unhover(element)
  },
})

export const TestForLanguageButtonHoverStyle = createHoverStyleStory("English")
export const TestForThemeButtonHoverStyle = createHoverStyleStory("Dark")

export const TestForFocusVisibleStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const languageButtonElement = within(canvasElement).getByRole("button", { name: "English" })
    await waitFor(async () => {
      await expect(languageButtonElement).toHaveStyle({ backgroundColor: "rgba(0, 0, 0, 0)" })
    })

    await userEvent.tab()
    await expect(languageButtonElement).toHaveFocus()
    await waitFor(async () => {
      await expect(languageButtonElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
  },
}
