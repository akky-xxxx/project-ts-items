import { EN_LOCALE_FOR_STORYBOOK } from "../../../../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { getCodeBlockMap } from "./modules/getCodeBlockMap/getCodeBlockMap.tsx"
import { OxlintConfigSetup } from "./OxlintConfigSetup.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: OxlintConfigSetup,

  argTypes: {
    codeBlockMap: { control: false, description: "全組み合わせの CodeBlock を描画したマップ" },
  },
  args: {
    codeBlockMap: getCodeBlockMap(),
  },
} satisfies Meta<typeof OxlintConfigSetup>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
