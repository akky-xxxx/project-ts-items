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
  <RootLayout headerInnerElement={HEADER_INNER_ELEMENT} newTabText="{newTabText}" thisYear={2026}>
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

export const Default: Story = {}
