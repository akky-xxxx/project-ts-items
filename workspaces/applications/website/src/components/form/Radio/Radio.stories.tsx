import { useTranslations } from "next-intl"
import { expect, fn, userEvent, within } from "storybook/test"

import { Radio } from "./Radio.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const LocalizedRadio: FC<ComponentProps<typeof Radio>> = (props) => {
  const translate = useTranslations("Radio")

  return <Radio {...props} label={translate("label")} />
}

const meta = {
  component: Radio,
  render: (args) => <LocalizedRadio {...args} />,

  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: false },
  },
  args: {
    label: "Radio",
    onChange: fn(),
  },
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Japanese: Story = {
  globals: {
    locale: "ja",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("ラジオ")).toBeInTheDocument()
  },
}

export const TestForChangeHandler: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radioElement = canvas.getByRole("radio")
    await expect(radioElement).toBeInTheDocument()
    await userEvent.click(radioElement)
    await expect(radioElement).toHaveProperty("checked", true)
  },
  tags: ["!autodocs"],
}
