import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { PackageSwitcher } from "./PackageSwitcher.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: PackageSwitcher,

  parameters: {
    nextjs: {
      navigation: {
        // 表示中のパッケージ名は pathname から求める
        pathname: `/packages/${PACKAGE_NAMES.oxlintConfig}/`,
      },
    },
  },
} satisfies Meta<typeof PackageSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = { ...EN_LOCALE_FOR_STORYBOOK }
export const Ja: Story = { ...JA_LOCALE_FOR_STORYBOOK }
