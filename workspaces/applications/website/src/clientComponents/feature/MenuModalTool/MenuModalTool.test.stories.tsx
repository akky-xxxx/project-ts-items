import { cookies } from "@storybook/nextjs-vite/headers.mock"
import { getRouter } from "@storybook/nextjs-vite/navigation.mock"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { restoreThemeDatasetForStorybook } from "../../../tests/restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"
import meta, { En, Ja } from "./MenuModalTool.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForLanguageSelection: Story = {
  ...Ja,
  parameters: { nextjs: { navigation: { pathname: "/ja/a/ja", segments: [["locale", "ja"]] } } },
  play: async (context) => {
    const { canvasElement } = context
    const group = within(within(canvasElement).getByRole("group", { name: "言語" }))
    await expect(group.getByRole("radio", { name: "日本語" })).toBeChecked()

    await userEvent.click(group.getByText("English"))
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
    const group = within(within(canvasElement).getByRole("group", { name: "Theme" }))
    await expect(group.getByRole("radio", { name: "Dark" })).toBeChecked()

    await userEvent.click(group.getByText("Light"))
    await expect(group.getByRole("radio", { name: "Light" })).toBeChecked()
    await expect(document.documentElement.dataset.theme).toBe("light")
    await waitFor(async () => {
      await expect(cookies().set).toHaveBeenCalledWith("THEME", "light", expect.anything())
    })
  },
}
