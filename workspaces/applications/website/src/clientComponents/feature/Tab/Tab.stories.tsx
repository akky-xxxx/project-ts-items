import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { Tab } from "./Tab.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Tab,

  args: {
    items: [
      {
        tabContent: <DummyForStorybook label="tabContent1" />,
        tabLabelText: "tabLabelText1",
        tabValue: "tabValue1",
      },
      {
        tabContent: <DummyForStorybook label="tabContent2" />,
        tabLabelText: "tabLabelText2",
        tabValue: "tabValue2",
      },
      {
        tabContent: <DummyForStorybook label="tabContent3" />,
        tabLabelText: "tabLabelText3",
        tabValue: "tabValue3",
      },
    ],
  },
} satisfies Meta<typeof Tab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
