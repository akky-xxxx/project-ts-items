import { SeverityLabel } from "./SeverityLabel.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: SeverityLabel,

  argTypes: {
    severity: {
      options: ["allow", "warn", "error", "off", -1],
    },
  },
} satisfies Meta<typeof SeverityLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Allow: Story = {
  args: {
    severity: "allow",
  },
}

export const Warn: Story = {
  args: {
    severity: "warn",
  },
}

export const Error: Story = {
  args: {
    severity: "error",
  },
}

export const Off: Story = {
  args: {
    severity: "off",
  },
}

export const UnknownNumber: Story = {
  args: {
    severity: -1,
  },
}
