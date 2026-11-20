import { Fragment } from "react"
import { expect, within } from "storybook/test"

import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import meta, { Disabled, Enabled } from "./FetchedFeatureEnabled.stories.tsx"
import { FetchedFeatureEnabled } from "./FetchedFeatureEnabled.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForEnabled: Story = {
  ...Enabled,
  play: async (context) => {
    const canvas = within(context.canvasElement)
    await expect(await canvas.findByText("{newFeature}")).toBeInTheDocument()
    await expect(canvas.queryByText("{currentFeature}")).not.toBeInTheDocument()
    await expect(isFeatureEnabled).toHaveBeenCalledWith("sampleFeature")
  },
}

export const TestForDisabled: Story = {
  ...Disabled,
  play: async (context) => {
    const canvas = within(context.canvasElement)
    await expect(await canvas.findByText("{currentFeature}")).toBeInTheDocument()
    await expect(canvas.queryByText("{newFeature}")).not.toBeInTheDocument()
  },
}

export const TestForDisabledWithoutCurrentFeature: Story = {
  ...Disabled,
  args: { currentFeatureElement: undefined },
  play: async (context) => {
    const canvas = within(context.canvasElement)
    await expect(await canvas.findByText("{rendered}")).toBeInTheDocument()
    await expect(canvas.getByTestId("target")).toBeEmptyDOMElement()
    await expect(isFeatureEnabled).toHaveBeenCalledWith("sampleFeature")
  },
  // 同じ Suspense 境界に置いた目印は、判定後の描画が反映されるまで表示されない
  render: (args) => (
    <Fragment>
      <div data-testid="target">
        <FetchedFeatureEnabled {...args} />
      </div>
      <DummyForStorybook label="rendered" />
    </Fragment>
  ),
}
