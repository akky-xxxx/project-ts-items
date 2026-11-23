import { mocked } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { SuspenseDecorator } from "../../../tests/SuspenseDecorator/SuspenseDecorator.tsx"
import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import { MenuModalNavigation } from "./MenuModalNavigation.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: MenuModalNavigation,

  args: {
    navigationElement: <DummyForStorybook label="navigationElement" />,
  },
  decorators: [SuspenseDecorator],
} satisfies Meta<typeof MenuModalNavigation>

export default meta

type Story = StoryObj<typeof meta>

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const EnWithChangeLog: Story = {
  ...En,
  beforeEach: () => {
    mocked(isFeatureEnabled).mockResolvedValue(true)
  },
}
