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
}

type HoverTarget = {
  name: string
  role: "button" | "link"
}

/** 通常時は背景が透明で、hover すると hover 用の背景色になる */
const createHoverStyleStory = (target: HoverTarget): Story => ({
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const element = within(canvasElement).getByRole(target.role, { name: target.name })
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

export const TestForLanguageButtonHoverStyle = createHoverStyleStory({
  name: "English",
  role: "button",
})
export const TestForThemeButtonHoverStyle = createHoverStyleStory({
  name: "{darkThemeText}",
  role: "button",
})
export const TestForLinkHoverStyle = createHoverStyleStory({ name: "GitHub", role: "link" })

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
