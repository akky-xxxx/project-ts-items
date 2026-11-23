import { http, HttpResponse } from "msw"
import { expect } from "storybook/test"

import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/**
 * .storybook/preview.tsx から使う MSW の setup の回帰テスト。表示用の story は無いため meta を直接書く
 */
const testMeta = {
  args: { label: "msw" },
  component: DummyForStorybook,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof DummyForStorybook>

export default testMeta

type Story = StoryObj<typeof testMeta>

const EXTERNAL_URL = "https://registry.npmjs.org/msw/latest"

export const TestForMockedResponse: Story = {
  beforeEach: (context) => {
    context.msw.use(http.get(EXTERNAL_URL, () => HttpResponse.json({ version: "mocked" })))
  },
  play: async () => {
    const response = await fetch(EXTERNAL_URL)
    await expect(await response.json()).toStrictEqual({ version: "mocked" })
  },
}

/** 直前の story のハンドラが残っていると 200 になるため、story 間のハンドラのリセットも検証する */
export const TestForUnhandledExternalRequest: Story = {
  play: async () => {
    const response = await fetch(EXTERNAL_URL)
    await expect(response.status).toBe(500)
  },
}

export const TestForSameOriginRequest: Story = {
  play: async () => {
    const response = await fetch(`${location.origin}/mockServiceWorker.js`)
    await expect(response.status).toBe(200)
  },
}
