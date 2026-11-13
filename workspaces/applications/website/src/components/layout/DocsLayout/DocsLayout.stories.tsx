import { expect, within } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import { HeaderInner } from "../../ui/HeaderInner/HeaderInner.tsx"
import { RootLayout } from "../RootLayout/RootLayout.tsx"
import { DocsLayout } from "./DocsLayout.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const NAVIGATION_ELEMENT = <DummyForStorybook label="navigationElement" />
const TOOL_ELEMENT = <DummyForStorybook label="toolElement" />
const HEADER_INNER_ELEMENT = (
  <HeaderInner navigationElement={NAVIGATION_ELEMENT} toolElement={TOOL_ELEMENT} />
)

const WithRootLayout: FC<ComponentProps<typeof DocsLayout>> = (props) => (
  <RootLayout headerInnerElement={HEADER_INNER_ELEMENT}>
    <DocsLayout {...props} />
  </RootLayout>
)

const meta = {
  component: DocsLayout,

  argTypes: {
    children: { control: false },
    docsSidebarElement: { control: false },
    tocElement: { control: false },
  },
  args: {
    children: <LongContents text="children" />,
    docsSidebarElement: <LongContents text="docsSidebarElement" />,
    docsSidebarLabelText: "{docsSidebarLabelText}",
    tocElement: <LongContents text="tocElement" />,
    tocLabelText: "{tocLabelText}",
  },
  render: (props) => <WithRootLayout {...props} />,
} satisfies Meta<typeof DocsLayout>

export default meta

type Story = StoryObj<typeof meta>

const expectWithinVisibleArea = async (element: HTMLElement, headerElement: HTMLElement) => {
  const { bottom, top } = element.getBoundingClientRect()
  await expect(top).toBeGreaterThanOrEqual(headerElement.getBoundingClientRect().bottom)
  await expect(bottom).toBeLessThanOrEqual(window.innerHeight)
}

export const Default: Story = {}

export const TestForLandmarks: Story = {
  play: async ({ canvasElement }) => {
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
  tags: ["!autodocs"],
}

export const TestForStickyColumnsBelowHeader: Story = {
  args: {
    children: "children.".repeat(10),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    window.scrollTo({ top: document.documentElement.scrollHeight })

    const headerElement = canvas.getByRole("banner")
    const docsSidebarNavigationElement = canvas.getByRole("navigation", {
      name: "{docsSidebarLabelText}",
    })
    await expectWithinVisibleArea(docsSidebarNavigationElement, headerElement)
    await expectWithinVisibleArea(canvas.getByRole("complementary"), headerElement)
  },
  tags: ["!autodocs"],
}

export const TestForLongUnbreakableMain: Story = {
  args: {
    children: "children.".repeat(100),
    docsSidebarElement: <LongContents length={10} text="docsSidebarElement" />,
    tocElement: <LongContents length={10} text="tocElement" />,
  },
  play: async ({ canvasElement }) => {
    const mainElement = within(canvasElement).getByRole("main")
    await expect(mainElement.scrollWidth).toBeLessThanOrEqual(mainElement.clientWidth)

    const { clientWidth, scrollWidth } = document.documentElement
    await expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
  },
  tags: ["!autodocs"],
}
