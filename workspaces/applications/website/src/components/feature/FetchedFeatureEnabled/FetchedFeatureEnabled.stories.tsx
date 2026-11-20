import { mocked } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { SuspenseDecorator } from "../../../tests/SuspenseDecorator/SuspenseDecorator.tsx"
import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import { FetchedFeatureEnabled } from "./FetchedFeatureEnabled.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: FetchedFeatureEnabled,
  decorators: [SuspenseDecorator],

  argTypes: {
    currentFeatureElement: {
      control: false,
      description: "feature flag が無効のときに表示する要素(省略時は何も表示しない)",
    },
    featureName: { description: "判定に使う feature flag 名" },
    newFeatureElement: { control: false, description: "feature flag が有効のときに表示する要素" },
  },
  args: {
    currentFeatureElement: <DummyForStorybook label="currentFeature" />,
    featureName: "sampleFeature",
    newFeatureElement: <DummyForStorybook label="newFeature" />,
  },
} satisfies Meta<typeof FetchedFeatureEnabled>

export default meta

type Story = StoryObj<typeof meta>

export const Enabled: Story = {
  beforeEach: () => {
    mocked(isFeatureEnabled).mockResolvedValue(true)
  },
}

export const Disabled: Story = {
  beforeEach: () => {
    mocked(isFeatureEnabled).mockResolvedValue(false)
  },
}
