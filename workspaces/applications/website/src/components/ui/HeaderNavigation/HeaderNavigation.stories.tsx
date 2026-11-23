import { mocked } from "storybook/test"

import { SuspenseDecorator } from "../../../tests/SuspenseDecorator/SuspenseDecorator.tsx"
import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import { HeaderNavigation } from "./HeaderNavigation.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  beforeEach: () => {
    mocked(isFeatureEnabled).mockResolvedValue(true)
  },
  component: HeaderNavigation,
  decorators: [SuspenseDecorator],
} satisfies Meta<typeof HeaderNavigation>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  globals: {
    locale: "en",
  },
}
export const Ja: Story = {
  globals: {
    locale: "ja",
  },
}

export const ChangeLogDisabled: Story = {
  ...En,
  beforeEach: () => {
    mocked(isFeatureEnabled).mockResolvedValue(false)
  },
}
