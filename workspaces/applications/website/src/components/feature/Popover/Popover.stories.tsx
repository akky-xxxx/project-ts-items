import { expect, userEvent, waitFor, within } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { Popover } from "./Popover.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const WrapperStyle = {
  padding: 20,
} as const

const WithOpenButton: FC<ComponentProps<typeof Popover>> = (props) => {
  const { id } = props

  return (
    <div style={WrapperStyle}>
      <div>
        <button type="button" popoverTarget={id}>
          開く
        </button>
      </div>

      <Popover {...props} />
    </div>
  )
}

const meta = {
  component: Popover,

  argTypes: {
    children: { control: false },
    id: { description: "popover とトリガーとなるボタンを紐づける id" },
  },
  args: {
    children: <DummyForStorybook label="popover" />,
    id: "Popover",
  },
  render: (args) => <WithOpenButton {...args} />,
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Shown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button"))
    await waitFor(async () => {
      await expect(canvas.getByText("{popover}")).toBeVisible()
    })
  },
}

export const Hidden: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("{popover}")).not.toBeVisible()
  },
}

export const Close: Story = {
  play: async (context) => {
    await Shown.play?.(context)
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button"))
    await waitFor(async () => {
      await expect(canvas.getByText("{popover}")).not.toBeVisible()
    })
  },
}
