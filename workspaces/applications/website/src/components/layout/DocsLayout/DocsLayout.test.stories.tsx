import { expect, within } from "storybook/test"

import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import meta from "./DocsLayout.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

const expectWithinVisibleArea = async (element: HTMLElement, headerElement: HTMLElement) => {
  const { bottom, top } = element.getBoundingClientRect()
  await expect(top).toBeGreaterThanOrEqual(headerElement.getBoundingClientRect().bottom)
  await expect(bottom).toBeLessThanOrEqual(window.innerHeight)
}

/**
 * 列ごと sticky でスクロールするのは docsSidebarElement を囲む要素のため、その要素を返す
 */
const getDocsSidebarColumnElement = (canvasElement: HTMLElement) => {
  const docsSidebarNavigationElement = within(canvasElement).getByRole("navigation", {
    name: "{docsSidebarLabelText}",
  })
  const { parentElement } = docsSidebarNavigationElement
  if (parentElement === null) {
    throw new Error("docsSidebarElement の親要素が見つからない")
  }
  return parentElement
}

export const TestForLandmarks: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const docsSidebarNavigationElement = canvas.getByRole("navigation", {
      name: "{docsSidebarLabelText}",
    })
    await expect(docsSidebarNavigationElement).toHaveTextContent("{docsSidebarElement0}")

    const mainElement = within(canvas.getByRole("main"))
    await expect(mainElement.getByText("{children0}")).toBeInTheDocument()

    const complementaryElement = within(canvas.getByRole("complementary"))
    const tocNavigationElement = within(
      complementaryElement.getByRole("navigation", { name: "{tocLabelText}" }),
    )
    await expect(tocNavigationElement.getByText("{tocElement0}")).toBeInTheDocument()
  },
}

export const TestForLandmarksWithoutToc: Story = {
  args: {
    tocElement: undefined,
    tocLabelText: undefined,
  },
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole("complementary")).toBeNull()

    const mainElement = canvas.getByRole("main")
    const { parentElement } = mainElement
    if (parentElement === null) {
      throw new Error("main の親要素が見つからない")
    }
    await expect(mainElement.getBoundingClientRect().right).toBe(
      parentElement.getBoundingClientRect().right,
    )
  },
}

export const TestForStickyColumnsBelowHeader: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    canvas.getByRole("main").scrollIntoView({ block: "end" })

    const headerElement = canvas.getByRole("banner")
    await expectWithinVisibleArea(getDocsSidebarColumnElement(canvasElement), headerElement)
    await expectWithinVisibleArea(canvas.getByRole("complementary"), headerElement)
  },
}

/**
 * ページ最下部では sticky の列が grid の末尾に押し上げられ、上端がヘッダーの下に潜る(sticky の仕様として許容する)。
 * ここでは列が footer に重ならないことを検証する
 */
export const TestForStickyColumnsAboveFooter: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    window.scrollTo({ top: document.documentElement.scrollHeight })

    const footerTop = canvas.getByRole("contentinfo").getBoundingClientRect().top
    await expect(
      getDocsSidebarColumnElement(canvasElement).getBoundingClientRect().bottom,
    ).toBeLessThanOrEqual(footerTop)
    await expect(
      canvas.getByRole("complementary").getBoundingClientRect().bottom,
    ).toBeLessThanOrEqual(footerTop)
  },
}

export const TestForLongUnbreakableMain: Story = {
  args: {
    children: "children.".repeat(100),
    docsSidebarElement: (
      <nav aria-label="{docsSidebarLabelText}">
        <LongContents length={10} text="docsSidebarElement" />
      </nav>
    ),
    tocElement: <LongContents length={10} text="tocElement" />,
  },
  play: async (context) => {
    const { canvasElement } = context
    const mainElement = within(canvasElement).getByRole("main")
    await expect(mainElement.scrollWidth).toBeLessThanOrEqual(mainElement.clientWidth)

    const { clientWidth, scrollWidth } = document.documentElement
    await expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
  },
}
