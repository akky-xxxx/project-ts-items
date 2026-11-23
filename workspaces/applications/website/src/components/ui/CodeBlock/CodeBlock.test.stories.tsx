import { expect } from "storybook/test"

import { restoreThemeDatasetForStorybook } from "../../../tests/restoreThemeDatasetForStorybook/restoreThemeDatasetForStorybook.ts"
import meta, { Bash, TypeScript } from "./CodeBlock.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>
type TokenColorCase = {
  color: string
  theme: "dark" | "light"
  tokenText: string
}

/** HTML 要素の data-theme を切り替え、指定した token の描画色を検証する */
const createTokenColorStory = (base: Story, tokenColorCase: TokenColorCase): Story => ({
  ...base,
  beforeEach: restoreThemeDatasetForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const { color, theme, tokenText } = tokenColorCase
    document.documentElement.dataset.theme = theme
    const tokens = [...canvasElement.querySelectorAll("pre > code span")]
    const token = tokens.find((element) => element.textContent === tokenText)
    await expect(token).toBeDefined()
    await expect(token && getComputedStyle(token).color).toBe(color)
  },
})

export const TestForRenderCode: Story = {
  ...TypeScript,
  play: async (context) => {
    const { canvasElement } = context
    const code = canvasElement.querySelector("pre > code")
    await expect(code?.textContent).toBe(
      [
        'import { baseConfig } from "@ts-items/oxlint-config"',
        'import { defineConfig } from "oxlint"',
        "",
        "const config = defineConfig({",
        "  extends: [baseConfig],",
        "})",
        "",
        "export default config",
      ].join("\n"),
    )
  },
}

export const TestForTypeScriptLightColor = createTokenColorStory(TypeScript, {
  color: "rgb(215, 58, 73)",
  theme: "light",
  tokenText: "const",
})

export const TestForTypeScriptDarkColor = createTokenColorStory(TypeScript, {
  color: "rgb(249, 117, 131)",
  theme: "dark",
  tokenText: "const",
})

export const TestForBashLightColor = createTokenColorStory(Bash, {
  color: "rgb(111, 66, 193)",
  theme: "light",
  tokenText: "bun",
})

export const TestForBashDarkColor = createTokenColorStory(Bash, {
  color: "rgb(179, 146, 240)",
  theme: "dark",
  tokenText: "bun",
})
