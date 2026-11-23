import { useCallback, useState } from "react"
import { fn } from "storybook/test"

import { Radio } from "./Radio.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ChangeEvent, ComponentProps, FC } from "react"

const Renderer: FC<ComponentProps<typeof Radio>> = (props) => {
  const { checked, onChange } = props
  const [isChecked, setIsChecked] = useState(checked)
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event)
      setIsChecked(event.target.checked)
    },
    [onChange],
  )

  return <Radio {...props} checked={isChecked} onChange={handleChange} />
}

const meta = {
  component: Radio,

  argTypes: {
    checked: { description: "選択済みかどうか" },
    disabled: { description: "無効かどうか" },
    labelText: { description: "ラベルテキスト" },
    name: { description: "input の name 属性" },
    onChange: { description: "選択時のハンドラ" },
    value: { description: "input の value 属性" },
  },
  args: {
    checked: false,
    disabled: false,
    labelText: "Radio label",
    name: "radio",
    onChange: fn(),
    value: "radio",
  },
  /** Controls パネルで checked を変えたときに Renderer の state を作り直すため、key に checked を渡す */
  render: (args) => <Renderer key={String(args.checked)} {...args} />,
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof meta>

export const Unchecked: Story = {}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
