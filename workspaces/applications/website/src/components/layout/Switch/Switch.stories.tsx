import { useState } from "react"

import { Radio } from "../../form/Radio/Radio.tsx"
import { Switch } from "./Switch.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { InputHTMLAttributes, FC } from "react"

const Dummy: FC<InputHTMLAttributes<unknown>> = (props) => (
  <Radio label={`Item${props.value}`} name="1" {...props} />
)

const meta = {
  component: Switch,

  args: {
    items: Array.from({ length: 5 }, (_, index) => (
      <Dummy key={index} checked={index === 0} value={index + 1} />
    )),
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithState: Story = {
  decorators: [
    (StoryComponent, context) => {
      const [checkedIndex, setCheckedIndex] = useState(0)
      const createHandleChange = (index: number) => () => {
        setCheckedIndex(index)
      }
      context.args.items = Array.from({ length: 5 }, (_, index) => (
        <Dummy
          key={index}
          checked={index === checkedIndex}
          onChange={createHandleChange(index)}
          value={index}
        />
      ))

      return <StoryComponent {...context} />
    },
  ],
  tags: ["!autodocs"],
}
