import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.ts"
import { Packages } from "./Packages.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof Packages>> = (props) => {
  const pageTranslate = useTranslations("pages.packages")
  const packageTranslate = useTranslations("packages")
  const breadcrumbTranslate = useTranslations("components.ui.breadcrumb")
  const packageCardTranslate = useTranslations("components.ui.packageCard")
  const pageTitleText = pageTranslate("pageTitle")
  const breadcrumbItems = useMemo(() => [{ text: pageTitleText }], [pageTitleText])

  return (
    <Packages
      {...props}
      breadcrumbItems={breadcrumbItems}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      packages={buildPackageCardItems({ packageCardTranslate, packageTranslate }, "h2")}
      pageDescriptionText={pageTranslate("pageDescription")}
      pageTitleText={pageTitleText}
    />
  )
}

const meta = {
  component: Packages,

  argTypes: {
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートより後ろの階層(各要素は Breadcrumb の items の要素)",
    },
    breadcrumbLabelText: { control: false, description: "パンくずの nav 要素のアクセシブルネーム" },
    packages: {
      control: false,
      description: "表示するパッケージ一覧(各要素は PackageCard の props)",
    },
    pageDescriptionText: { control: false, description: "ページの説明文" },
    pageTitleText: { control: false, description: "ページタイトル(h1)" },
  },
  args: {
    breadcrumbItems: [{ text: "{breadcrumbItemText}" }],
    breadcrumbLabelText: "{breadcrumbLabelText}",
    packages: [
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: "/packages/oxfmt-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxfmt-config",
        versionText: "v1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: "/packages/oxlint-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxlint-config",
        versionText: "v1.0.0",
      },
    ],
    pageDescriptionText: "{pageDescriptionText}",
    pageTitleText: "{pageTitleText}",
  },
} satisfies Meta<typeof Packages>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  argTypes: {
    breadcrumbItems: { control: "object" },
    breadcrumbLabelText: { control: "text" },
    packages: {
      control: "object",
    },
    pageDescriptionText: { control: "text" },
    pageTitleText: { control: "text" },
  },
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}
