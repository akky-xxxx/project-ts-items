import { expect, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import meta from "./DocsLayout.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  ...EN_LOCALE_FOR_STORYBOOK,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

const NARROW_WRAPPER_STYLE = { overflowX: "hidden", width: "320px" } as const

const expectBetweenHeaderAndFooter = async (element: HTMLElement, canvasElement: HTMLElement) => {
  const canvas = within(canvasElement)
  const { bottom, top } = element.getBoundingClientRect()
  await expect(top).toBeGreaterThanOrEqual(
    canvas.getByRole("banner").getBoundingClientRect().bottom,
  )
  await expect(bottom).toBeLessThanOrEqual(
    canvas.getByRole("contentinfo").getBoundingClientRect().top,
  )
}

/**
 * 列ごとスクロールするのは docsSidebarElement を囲む要素のため、その要素を返す
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

    const mainElement = canvas.getByRole("main")
    await expect(within(mainElement).getByText("{children0}")).toBeInTheDocument()
  },
}

/**
 * 各列は内部でスクロールし、ページ(window)自体はスクロールしないことを検証する
 */
const expectColumnsFitBetweenHeaderAndFooter = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement)

  await expectBetweenHeaderAndFooter(getDocsSidebarColumnElement(canvasElement), canvasElement)
  await expectBetweenHeaderAndFooter(canvas.getByRole("main"), canvasElement)

  const { clientHeight, scrollHeight } = document.documentElement
  await expect(scrollHeight).toBeLessThanOrEqual(clientHeight)
}

export const TestForColumnsFitBetweenHeaderAndFooter: Story = {
  play: async (context) => {
    await expectColumnsFitBetweenHeaderAndFooter(context.canvasElement)
  },
}

/**
 * 幅が狭くフッターが折り返して高くなっても、各列がヘッダーとフッターの間に収まることを検証する
 */
export const TestForColumnsFitWithWrappedFooter: Story = {
  decorators: [
    (Story) => (
      <div style={NARROW_WRAPPER_STYLE}>
        <Story />
      </div>
    ),
  ],
  play: async (context) => {
    const { canvasElement } = context
    // 折り返しの前提: 1行のときのフッターの高さ(72.2px)より高い
    await expect(
      within(canvasElement).getByRole("contentinfo").getBoundingClientRect().height,
    ).toBeGreaterThan(72.2)

    await expectColumnsFitBetweenHeaderAndFooter(canvasElement)
  },
}

/**
 * 折り返せない長い children でも、children の列が押し広げられないことを検証する
 * (スクロールコンテナは自動最小サイズが 0 になり押し広げを検出できないため、children の main は内部スクロールさせない)
 */
export const TestForLongUnbreakableChildren: Story = {
  args: {
    children: <main>{"children.".repeat(100)}</main>,
    docsSidebarElement: (
      <nav aria-label="{docsSidebarLabelText}">
        <LongContents length={10} text="docsSidebarElement" />
      </nav>
    ),
  },
  play: async (context) => {
    const { canvasElement } = context
    const mainElement = within(canvasElement).getByRole("main")
    await expect(mainElement.getBoundingClientRect().right).toBeLessThanOrEqual(
      document.documentElement.clientWidth,
    )
  },
}
