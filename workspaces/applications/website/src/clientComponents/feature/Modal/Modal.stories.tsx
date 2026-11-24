import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { Modal } from "./Modal.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const WRAPPER_STYLE = {
  padding: 20,
} as const

const WithOpenButton: FC<ComponentProps<typeof Modal>> = (props) => {
  const { id } = props

  return (
    <div style={WRAPPER_STYLE}>
      <div>
        <button type="button" command="show-modal" commandfor={id}>
          開く
        </button>
      </div>

      <Modal {...props} />
    </div>
  )
}

const meta = {
  component: Modal,

  argTypes: {
    children: { control: false, description: "モーダルの中身" },
    id: { description: "dialog 要素の id 属性(開くボタンの commandfor に指定する)" },
    type: { description: "モーダルの種類(スタイルの切り替えに使う)" },
  },
  args: {
    children: <DummyForStorybook label="Modal" />,
    id: "Modal",
    type: "spMenu",
  },
  render: (args) => <WithOpenButton {...args} />,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const SpMenu: Story = {}
