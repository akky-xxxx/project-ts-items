import { Tab } from "./Tab.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ReactNode } from "react"

const Dummy = ({ children }: { children: ReactNode }) => <div>{children}</div>

const meta = {
  component: Tab,

  args: {
    items: [
      {
        contents: <Dummy>Content for Tab 1</Dummy>,
        id: "tab-1",
        tab: <Dummy>Tab 1</Dummy>,
      },
      {
        contents: <Dummy>Content for Tab 2</Dummy>,
        id: "tab-2",
        tab: <Dummy>Tab 2</Dummy>,
      },
    ],
  },
} satisfies Meta<typeof Tab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
