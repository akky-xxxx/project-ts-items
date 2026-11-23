import { useCallback, useState } from "react"
import { fn } from "storybook/test"

import { Toggle } from "./Toggle.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ChangeEvent, ComponentProps, FC } from "react"

const Renderer: FC<ComponentProps<typeof Toggle>> = (props) => {
  const { checked, onChange } = props
  const [isChecked, setIsChecked] = useState(checked)
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event)
      setIsChecked(event.target.checked)
    },
    [onChange],
  )

  return <Toggle {...props} checked={isChecked} onChange={handleChange} />
}

const meta = {
  component: Toggle,

  argTypes: {
    checked: { description: "オンかどうか" },
    disabled: { description: "無効かどうか" },
    labelNode: { description: "ラベルテキスト" },
    name: { description: "input の name 属性" },
    onChange: { description: "切り替え時のハンドラ" },
    value: { description: "input の value 属性" },
  },
  args: {
    checked: false,
    disabled: false,
    labelNode: "Toggle label",
    name: "toggle",
    onChange: fn(),
    value: "toggle",
  },
  /** Controls パネルで checked を変えたときに Renderer の state を作り直すため、key に checked を渡す */
  render: (args) => <Renderer key={String(args.checked)} {...args} />,
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Off: Story = {}

export const On: Story = {
  args: {
    checked: true,
  },
}

export const DisabledOff: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledOn: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
