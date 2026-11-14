import { useCallback, useState } from "react"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"

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

export const TestForSelection: Story = {
  play: async (context) => {
    const { args, canvasElement } = context
    const canvas = within(canvasElement)
    const item3Element = canvas.getByRole("radio", { name: "item3" })
    const item4Element = canvas.getByRole("radio", { name: "item4" })
    await expect(item3Element).toBeChecked()
    await expect(item3Element.closest("label")?.querySelector("svg")).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1)

    await userEvent.click(canvas.getByText("item4"))
    await expect(args.handleChange).toHaveBeenCalledWith("3")
    await waitFor(async () => {
      await expect(item4Element).toBeChecked()
    })
    await expect(item3Element).not.toBeChecked()
    await expect(item4Element.closest("label")?.querySelector("svg")).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1)
  },
  tags: ["!autodocs"],
}
