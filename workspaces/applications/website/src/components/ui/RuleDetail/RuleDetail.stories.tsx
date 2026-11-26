import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { RuleDetail } from "./RuleDetail.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: RuleDetail,
  ...EN_LOCALE_FOR_STORYBOOK,

  argTypes: {
    descriptionBase: {
      control: false,
      description: "オプションを平坦化したもの(現状は表示に使わない)",
    },
    originOption: { description: "ルールのオプション(undefined の時はコード領域を表示しない)" },
    ruleName: { description: "ルール名" },
    severity: { description: "ルールの severity" },
  },
  args: {
    descriptionBase: undefined,
    originOption: undefined,
    ruleName: "{ruleName}",
    severity: "error",
  },
} satisfies Meta<typeof RuleDetail>

export default meta

type Story = StoryObj<typeof meta>

export const WithOption: Story = {
  args: {
    descriptionBase: { max: 100 },
    originOption: { max: 100 },
  },
}

export const WithMultipleOptions: Story = {
  args: {
    descriptionBase: { "0": "asc", "1.allowLineSeparatedGroups": true },
    originOption: ["asc", { allowLineSeparatedGroups: true }],
  },
}

export const WithoutOption: Story = {}
