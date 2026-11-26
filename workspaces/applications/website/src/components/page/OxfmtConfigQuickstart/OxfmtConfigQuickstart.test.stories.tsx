import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import { expect, spyOn, userEvent, within } from "storybook/test"

import meta, { En } from "./OxfmtConfigQuickstart.stories.tsx"

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
    const heading1Texts = canvas
      .getAllByRole("heading", { level: 1 })
      .map((element) => element.textContent)
    const heading2Texts = canvas
      .getAllByRole("heading", { level: 2 })
      .map((element) => element.textContent)
    await expect(heading1Texts).toStrictEqual(["Quickstart"])
    await expect(heading2Texts).toStrictEqual(["Installation", "Setup"])
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

export const TestForBreadcrumbPackagesLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const linkElement = within(navigationElement).getByRole("link", { name: "Packages" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/")
  },
}

export const TestForBreadcrumbOxfmtConfigLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const linkElement = within(navigationElement).getByRole("link", { name: "oxfmt-config" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/oxfmt-config/")
  },
}

export const TestForBreadcrumbCurrentPage: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Breadcrumbs" })
    const currentPageElement = within(navigationElement).getByText("Quickstart")
    await expect(currentPageElement).toHaveAttribute("aria-current", "page")
  },
}

export const TestForCopyButtonLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    // Install の Tab と Setup の CodeArea にそれぞれ1つずつある
    await expect(canvas.getAllByRole("button", { name: "Copy" })).toHaveLength(2)
  },
}

const EXPECTED_SETTING_CODE = [
  'import { baseConfig } from "@ts-items/oxfmt-config"',
  'import { defineConfig } from "oxfmt"',
  "",
  "export default defineConfig({",
  "  ...baseConfig,",
  "})",
].join("\n")

export const TestForSetupCodeTitle: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    await expect(within(canvasElement).getByText("oxfmt.config.mts")).toBeInTheDocument()
  },
}

export const TestForSetupCode: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const codeTexts = [...canvasElement.querySelectorAll("pre > code")].map(
      (element) => element.textContent,
    )
    await expect(codeTexts).toContain(EXPECTED_SETTING_CODE)
  },
}

export const TestForSetupCopy: Story = {
  ...En,
  // ページでは RootLayout が Toaster を描画するため、コピー完了のトーストの検証用に追加する
  decorators: [
    (Story) => (
      <Fragment>
        <Story />
        <Toaster />
      </Fragment>
    ),
  ],
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headerElement = canvas.getByText("oxfmt.config.mts").closest("header")
    if (!headerElement) {
      throw new Error("Setup の CodeArea の header が見つからない")
    }
    const writeTextSpy = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    try {
      await userEvent.click(within(headerElement).getByRole("button", { name: "Copy" }))
      await expect(writeTextSpy).toHaveBeenLastCalledWith(EXPECTED_SETTING_CODE)
      await expect(await canvas.findByText("Copied")).toBeInTheDocument()
    } finally {
      writeTextSpy.mockRestore()
    }
  },
}
