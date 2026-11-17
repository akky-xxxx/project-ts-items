import { getRouter } from "@storybook/nextjs-vite/navigation.mock"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { En, Ja } from "./PackageSwitcher.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForButtonName: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    await expect(within(canvasElement).getByRole("button", { name: "oxlint-config" })).toBeVisible()
  },
}

export const TestForButtonNameOnNestedPathname: Story = {
  ...En,
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/packages/oxlint-config/rules/foo/",
      },
    },
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "oxlint-config" })).toBeVisible()

    await userEvent.click(canvas.getByRole("button", { name: "oxlint-config" }))
    const groupElement = canvas.getByRole("group", { hidden: true, name: "Select a package" })
    await waitFor(async () => expect(groupElement).toBeVisible())
    await expect(
      within(groupElement).getByRole("radio", { name: "@ts-items/oxlint-config" }),
    ).toBeChecked()
  },
}

export const TestForPackageSelection: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const groupElement = canvas.getByRole("group", { hidden: true, name: "Select a package" })
    await expect(groupElement).not.toBeVisible()

    await userEvent.click(canvas.getByRole("button", { name: "oxlint-config" }))
    await waitFor(async () => expect(groupElement).toBeVisible())
    const group = within(groupElement)
    await expect(group.getByRole("radio", { name: "@ts-items/oxlint-config" })).toBeChecked()

    await userEvent.click(group.getByText("@ts-items/oxfmt-config"))
    // Next-intl の useRouter が現在の locale を前置する
    await expect(getRouter().push).toHaveBeenCalledWith("/en/packages/oxfmt-config/")
  },
}

export const TestForJaLegend: Story = {
  ...Ja,
  play: async (context) => {
    const { canvasElement } = context
    await expect(
      within(canvasElement).getByRole("group", { hidden: true, name: "パッケージを選択" }),
    ).toBeInTheDocument()
  },
}

export const TestForHoverStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const browserUserEvent = await getUserEventForStorybook()
    const buttonElement = within(canvasElement).getByRole("button", { name: "oxlint-config" })
    await waitFor(async () => {
      await expect(buttonElement).toHaveStyle({ backgroundColor: "rgba(0, 0, 0, 0)" })
    })

    await browserUserEvent.hover(buttonElement)
    await waitFor(async () => {
      await expect(buttonElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
    await browserUserEvent.unhover(buttonElement)
  },
}

export const TestForFocusVisibleStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const browserUserEvent = await getUserEventForStorybook()
    const buttonElement = within(canvasElement).getByRole("button", { name: "oxlint-config" })
    await waitFor(async () => {
      await expect(buttonElement).toHaveStyle({ backgroundColor: "rgba(0, 0, 0, 0)" })
    })

    await browserUserEvent.tab()
    await expect(buttonElement).toHaveFocus()
    await waitFor(async () => {
      await expect(buttonElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
  },
}
