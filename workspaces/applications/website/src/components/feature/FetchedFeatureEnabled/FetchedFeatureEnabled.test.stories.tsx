import { expect, mocked, waitFor, within } from "storybook/test"

import { isFeatureEnabled } from "../../../utilities/isFeatureEnabled/isFeatureEnabled.ts"
import meta, { Disabled, Enabled } from "./FetchedFeatureEnabled.stories.tsx"

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
    const { canvasElement } = context
    await waitFor(async () => {
      await expect(isFeatureEnabled).toHaveBeenCalledWith("sampleFeature")
    })
    // 判定結果が確定してから、何も描画されていないことを確認する
    await mocked(isFeatureEnabled).mock.results.at(-1)?.value
    await expect(canvasElement).toBeEmptyDOMElement()
  },
}
