import { useCallback, useState } from "react"
import { fn } from "storybook/test"

import { OptionSwitcher } from "./OptionSwitcher.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Renderer: FC<ComponentProps<typeof OptionSwitcher>> = (props) => {
  const { handleChange, selectedValue } = props
  const [value, setValue] = useState(selectedValue)
  const onChange = useCallback(
    (nextValue: string) => {
      handleChange(nextValue)
      setValue(nextValue)
    },
    [handleChange],
  )

  return <OptionSwitcher {...props} selectedValue={value} handleChange={onChange} />
}

const meta = {
  component: OptionSwitcher,

  args: {
    handleChange: fn(),
    items: Array.from({ length: 5 }, (_, index) => ({
      labelText: `item${index + 1}`,
      value: `${index}`,
    })),
    legendText: "{OptionSwitcher}",
    selectedValue: "2",
  },
  render: (args) => <Renderer {...args} />,
} satisfies Meta<typeof OptionSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
