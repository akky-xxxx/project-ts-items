import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { OxfmtConfigHome } from "./OxfmtConfigHome.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof OxfmtConfigHome>> = (props) => {
  const pageTranslate = useTranslations("pages.oxfmtConfigHome")
  const packagesPageTranslate = useTranslations("pages.packages")
  const breadcrumbTranslate = useTranslations("components.ui.breadcrumb")
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

  return (
    <OxfmtConfigHome
      {...props}
      backgroundDescriptionText={pageTranslate("backgroundDescription")}
      backgroundTitleText={pageTranslate("backgroundTitle")}
      breadcrumbItems={breadcrumbItems}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      pageDescriptionText={pageTranslate("pageDescription")}
      pageTitle={pageTranslate("pageTitle")}
    />
  )
}

const meta = {
  component: OxfmtConfigHome,

  argTypes: {
    backgroundDescriptionText: {
      control: false,
      description: "概要セクションの説明文",
    },
    backgroundTitleText: { control: false, description: "概要セクションの見出し(h2)" },
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートより後ろの階層(各要素は Breadcrumb の items の要素)",
    },
    breadcrumbLabelText: { control: false, description: "パンくずの nav 要素のアクセシブルネーム" },
    pageDescriptionText: {
      control: false,
      description: "ページの説明文",
    },
    pageTitle: { control: false, description: "ページタイトル(h1)" },
  },
  args: {
    backgroundDescriptionText: "{backgroundDescriptionText}",
    backgroundTitleText: "{backgroundTitleText}",
    breadcrumbItems: [
      { href: "/packages/", text: "{breadcrumbItemText}" },
      { text: PACKAGE_NAMES.oxfmtConfig },
    ],
    breadcrumbLabelText: "{breadcrumbLabelText}",
    pageDescriptionText: "{pageDescriptionText}",
    pageTitle: "{pageTitle}",
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
