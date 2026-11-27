import { expect } from "storybook/test"

import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"
import { LARGE_VIEWPORT_FOR_STORYBOOK } from "../LARGE_VIEWPORT_FOR_STORYBOOK/LARGE_VIEWPORT_FOR_STORYBOOK.ts"
import { MEDIUM_VIEWPORT_FOR_STORYBOOK } from "../MEDIUM_VIEWPORT_FOR_STORYBOOK/MEDIUM_VIEWPORT_FOR_STORYBOOK.ts"
import { SMALL_VIEWPORT_FOR_STORYBOOK } from "../SMALL_VIEWPORT_FOR_STORYBOOK/SMALL_VIEWPORT_FOR_STORYBOOK.ts"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import styles from "./breakpointForStorybook.module.css"

/**
 * .storybook/preview.tsx に登録する viewport の回帰テスト。表示用の story は無いため meta を直接書く
 * breakpoint は、presets.css の custom media を使う breakpointForStorybook.module.css が返す値で判定する(条件をテストに複製しない)
 */
const testMeta = {
  args: { label: "viewport" },
  component: DummyForStorybook,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof DummyForStorybook>

export default testMeta

type Story = StoryObj<typeof testMeta>

type ReadBreakpoint = (canvasElement: HTMLElement) => string

const readBreakpoint: ReadBreakpoint = (canvasElement) => {
  const element = document.createElement("div")
  element.className = styles.breakpoint
  canvasElement.append(element)
  return getComputedStyle(element).getPropertyValue("--breakpoint-for-storybook")
}

export const TestForSmall: Story = {
  ...SMALL_VIEWPORT_FOR_STORYBOOK,
  play: async (context) => {
    await expect(globalThis.innerWidth).toBe(375)
    await expect(readBreakpoint(context.canvasElement)).toBe("small")
  },
}

export const TestForMedium: Story = {
  ...MEDIUM_VIEWPORT_FOR_STORYBOOK,
  play: async (context) => {
    await expect(globalThis.innerWidth).toBe(834)
    await expect(readBreakpoint(context.canvasElement)).toBe("medium")
  },
}

/**
 * large は viewport が見つからない場合の既定の寸法(1200x900)と同じため、描画幅だけでは登録・選択を区別できない
 * そのため globals の選択値と、parameters に登録された寸法も確かめる
 */
export const TestForLarge: Story = {
  ...LARGE_VIEWPORT_FOR_STORYBOOK,
  play: async (context) => {
    await expect(context.globals).toHaveProperty("viewport", { value: "large" })
    await expect(context.parameters).toHaveProperty(["viewport", "options", "large", "styles"], {
      height: "900px",
      width: "1200px",
    })
    await expect(globalThis.innerWidth).toBe(1200)
    await expect(readBreakpoint(context.canvasElement)).toBe("large")
  },
}
