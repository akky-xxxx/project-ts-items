import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { OxfmtConfigHome } from "./OxfmtConfigHome.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof OxfmtConfigHome>> = (props) => {
  const packagesPageTranslate = useTranslations("pages.packages")
  const breadcrumbItems = useMemo(
    () => [
      {
        href: "/packages/",
        text: packagesPageTranslate("pageTitle"),
      },
      {
        text: PACKAGE_NAMES.oxfmtConfig,
      },
    ],
    [packagesPageTranslate],
  )

  return <OxfmtConfigHome {...props} breadcrumbItems={breadcrumbItems} />
}

const meta = {
  component: OxfmtConfigHome,

  argTypes: {
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートより後ろの階層(各要素は Breadcrumb の items の要素)",
    },
  },
  args: {
    breadcrumbItems: [
      { href: "/packages/", text: "{breadcrumbItemText}" },
      { text: PACKAGE_NAMES.oxfmtConfig },
    ],
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof OxfmtConfigHome>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
