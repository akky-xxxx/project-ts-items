import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { MenuModalTool } from "./MenuModalTool.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: MenuModalTool,

  argTypes: {
    theme: { description: "server component で取得した cookie の値" },
  },
  args: {
    theme: "dark",
  },
  globals: {
    viewport: { value: "mobile2" },
  },
} satisfies Meta<typeof MenuModalTool>

export default meta

type Story = StoryObj<typeof meta>

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}
