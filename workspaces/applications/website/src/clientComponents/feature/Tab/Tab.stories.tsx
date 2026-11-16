import { Fragment } from "react"
import { Toaster } from "react-hot-toast"

import { CodeBlock } from "../../../components/ui/CodeBlock/CodeBlock.tsx"
import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { Tab } from "./Tab.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Tab,

  argTypes: {
    copiedText: {
      description: "コピー完了時にトーストで表示するテキスト",
    },
    copyButtonLabelText: {
      description: "コピーボタンのラベル(aria-label)",
    },
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
        "タブの一覧(copyText: コピーボタン押下時にクリップボードへ書き込む文字列 / tabLabelText: タブのボタンのテキスト / tabValue: タブの識別子 / tabContent: 選択時に表示する内容)。1件以上",
    },
    title: {
      description: "コンテンツ領域のヘッダー左側に表示するタイトル",
    },
  },
  args: {
    copiedText: "{copiedText}",
    copyButtonLabelText: "{copyButtonLabelText}",
    copyIconElement: <DummyForStorybook label="C" />,
    items: [
      {
        copyText: "copyText1",
        tabContent: <DummyForStorybook label="tabContent1" />,
        tabLabelText: "tabLabelText1",
        tabValue: "tabValue1",
      },
      {
        copyText: "copyText2",
        tabContent: <DummyForStorybook label="tabContent2" />,
        tabLabelText: "tabLabelText2",
        tabValue: "tabValue2",
      },
      {
        copyText: "copyText3",
        tabContent: <DummyForStorybook label="tabContent3" />,
        tabLabelText: "tabLabelText3",
        tabValue: "tabValue3",
      },
    ],
    title: "{title}",
  },
  decorators: [
    (Story) => (
      <Fragment>
        <Story />
        <Toaster />
      </Fragment>
    ),
  ],
} satisfies Meta<typeof Tab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCodeBlock: Story = {
  args: {
    items: [
      {
        copyText: "bun add -D @ts-items/oxlint-config oxlint",
        tabContent: <CodeBlock code="bun add -D @ts-items/oxlint-config oxlint" lang="bash" />,
        tabLabelText: "bun",
        tabValue: "bun",
      },
      {
        copyText: "npm install -D @ts-items/oxlint-config oxlint",
        tabContent: <CodeBlock code="npm install -D @ts-items/oxlint-config oxlint" lang="bash" />,
        tabLabelText: "npm",
        tabValue: "npm",
      },
    ],
    title: "Terminal",
  },
}
