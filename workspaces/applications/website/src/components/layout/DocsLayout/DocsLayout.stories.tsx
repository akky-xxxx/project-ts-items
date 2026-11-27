import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import { HeaderInner } from "../../ui/HeaderInner/HeaderInner.tsx"
import { RootLayout } from "../RootLayout/RootLayout.tsx"
import { DocsLayout } from "./DocsLayout.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const MENU_BUTTON_ELEMENT = <DummyForStorybook label="menuButtonElement" />
const NAVIGATION_ELEMENT = <DummyForStorybook label="navigationElement" />
const TOOL_ELEMENT = <DummyForStorybook label="toolElement" />
const HEADER_INNER_ELEMENT = (
  <HeaderInner
    menuButtonElement={MENU_BUTTON_ELEMENT}
    navigationElement={NAVIGATION_ELEMENT}
    toolElement={TOOL_ELEMENT}
  />
)

const MAIN_STYLE = { overflowY: "auto" } as const

const WithRootLayout: FC<ComponentProps<typeof DocsLayout>> = (props) => (
  <RootLayout headerInnerElement={HEADER_INNER_ELEMENT} thisYear={2026}>
    <DocsLayout {...props} />
  </RootLayout>
)

const meta = {
  component: DocsLayout,

  argTypes: {
    children: { control: false },
    docsSidebarElement: { control: false },
  },
  args: {
    // main のランドマークと内部スクロールは children 側が持つ
    children: (
      <main style={MAIN_STYLE}>
        <LongContents text="children" />
      </main>
    ),
    // DocsSidebar と同じく、ナビゲーションのランドマークは docsSidebarElement 側が持つ
    docsSidebarElement: (
      <nav aria-label="{docsSidebarLabelText}">
        <LongContents text="docsSidebarElement" />
      </nav>
    ),
  },
  render: (props) => <WithRootLayout {...props} />,
} satisfies Meta<typeof DocsLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
