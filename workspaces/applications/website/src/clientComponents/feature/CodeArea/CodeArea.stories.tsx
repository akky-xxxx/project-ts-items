import { Fragment } from "react"
import { Toaster } from "react-hot-toast"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { CodeArea } from "./CodeArea.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: CodeArea,

  argTypes: {
    children: {
      control: false,
      description: "コンテンツ領域の本文に表示する内容",
    },
    copyIconElement: {
      control: false,
      description: "コンテンツ領域のヘッダー右側に表示するコピー用アイコン",
    },
    copyTargetText: {
      description:
        "コピーボタン押下時にクリップボードへ書き込む文字列(undefined の場合はコピーしない)",
    },
    title: {
      description: "コンテンツ領域のヘッダー左側に表示するタイトル",
    },
  },
  args: {
    children: <DummyForStorybook label="children" />,
    copyIconElement: <DummyForStorybook label="copyIconElement" />,
    copyTargetText: "{copyTargetText}",
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
} satisfies Meta<typeof CodeArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
