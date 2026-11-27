import { expect, within } from "storybook/test"

import meta, { En, Ja } from "./OxlintConfigBaseConfigRules.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForHeadingStructure: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const getHeadingTexts = (level: number) =>
      canvas.getAllByRole("heading", { level }).map((element) => element.textContent)
    await expect(getHeadingTexts(1)).toStrictEqual(["Overall base config"])
    await expect(getHeadingTexts(2)).toStrictEqual(["Configuration of each rules"])
    await expect(getHeadingTexts(3)).toStrictEqual([
      "Origins of eslint",
      "Origins of typescript",
      "Origins of unicorn",
      "Origins of import",
      "Origins of oxc",
    ])
  },
}

export const TestForJaHeading: Story = {
  ...Ja,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole("heading", { level: 1, name: "基本構成全体" }),
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole("heading", { level: 2, name: "各ルールの設定" }),
    ).toBeInTheDocument()
    const heading3Texts = canvas
      .getAllByRole("heading", { level: 3 })
      .map((element) => element.textContent)
    await expect(heading3Texts).toStrictEqual([
      "eslint 由来のルール",
      "typescript 由来のルール",
      "unicorn 由来のルール",
      "import 由来のルール",
      "oxc 由来のルール",
    ])
  },
}

export const TestForMultipleOptions: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const ruleHeading = canvas.getByRole("heading", { level: 4, name: "eslint/sort-keys" })
    // 複数の値を持つオプションも、ルールの li 内に code として描画される
    await expect(ruleHeading.closest("li")?.querySelector("code")).toBeInstanceOf(HTMLElement)
  },
}

export const TestForRuleDetail: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const ruleHeading = canvas.getByRole("heading", { level: 4, name: "eslint/arrow-body-style" })
    await expect(ruleHeading).toBeInTheDocument()
  },
}

export const TestForBreadcrumbLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    await expect(navigationElement).toBeInTheDocument()
  },
}

export const TestForBreadcrumbLinks: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const navigation = within(navigationElement)
    await expect(navigation.getByRole("link", { name: "Packages" })).toHaveAttribute(
      "href",
      "/en/packages/",
    )
    await expect(navigation.getByRole("link", { name: "oxlint-config" })).toHaveAttribute(
      "href",
      "/en/packages/oxlint-config/",
    )
  },
}

export const TestForBreadcrumbCurrentPage: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const currentPageElement = within(navigationElement).getByText("Overall base config")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
}
