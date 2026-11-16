import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { Tab } from "./Tab.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Tab,

  argTypes: {
    copyIconElement: {
      control: false,
      description: "コンテンツ領域のヘッダー右側に表示するコピー用アイコン",
    },
    currentActiveTabValue: {
      description: "初期表示で選択するタブの tabValue(省略時は items の先頭)",
    },
    items: {
      control: false,
      description:
        "タブの一覧(tabLabelText: タブのボタンのテキスト / tabValue: タブの識別子 / tabContent: 選択時に表示する内容)。1件以上",
    },
    title: {
      description: "コンテンツ領域のヘッダー左側に表示するタイトル",
    },
  },
  args: {
    copyIconElement: <DummyForStorybook label="C" />,
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
    title: "{title}",
  },
} satisfies Meta<typeof Tab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
