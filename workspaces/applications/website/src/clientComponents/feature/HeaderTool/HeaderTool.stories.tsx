import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { HeaderTool } from "./HeaderTool.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: HeaderTool,

  argTypes: {
    theme: { description: "server component で取得した cookie の値" },
  },
  args: {
    theme: "dark",
  },
} satisfies Meta<typeof HeaderTool>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = { ...EN_LOCALE_FOR_STORYBOOK }
export const Ja: Story = { ...JA_LOCALE_FOR_STORYBOOK }
