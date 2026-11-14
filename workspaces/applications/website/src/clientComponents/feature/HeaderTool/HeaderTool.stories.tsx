import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { HeaderTool } from "./HeaderTool.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderTool,

  argTypes: {
    darkThemeText: { description: "ダークテーマ選択肢用文字列" },
    languageLegendText: { description: "言語選択ポップアップの見出し文字列" },
    lightThemeText: { description: "ライトテーマ選択肢用文字列" },
    systemThemeText: { description: "システムテーマ選択肢用文字列" },
    theme: { description: "server component で取得した cookie の値" },
    themeLegendText: { description: "テーマ選択ポップアップの見出し文字列" },
  },
  args: {
    darkThemeText: "{darkThemeText}",
    languageLegendText: "{languageLegendText}",
    lightThemeText: "{lightThemeText}",
    systemThemeText: "{systemThemeText}",
    theme: "dark",
    themeLegendText: "{themeLegendText}",
  },
} satisfies Meta<typeof HeaderTool>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = { ...EN_LOCALE_FOR_STORYBOOK }
export const Ja: Story = { ...JA_LOCALE_FOR_STORYBOOK }
