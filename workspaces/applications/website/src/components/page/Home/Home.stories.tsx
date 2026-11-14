import { useTranslations } from "next-intl"
import { expect, within } from "storybook/test"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { Home } from "./Home.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof Home>> = (props) => {
  const pageTranslate = useTranslations("pages.home")
  const packageTranslate = useTranslations("packages")
  const breadcrumbTranslate = useTranslations("components.ui.breadcrumb")
  const packageCardTranslate = useTranslations("components.ui.packageCard")
  const pageTitleText = pageTranslate("pageTitle")

  return (
    <Home
      {...props}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      packageTitleText={pageTranslate("packageTitleText")}
      packages={buildPackageCardItems({ packageCardTranslate, packageTranslate }, "h3")}
      pageDescriptionText={pageTranslate.rich("pageDescription", { br: renderLineBreak })}
      pageTitleText={pageTitleText}
    />
  )
}

const meta = {
  component: Home,

  argTypes: {
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートより後ろの階層(各要素は Breadcrumb の items の要素)",
    },
    breadcrumbLabelText: { control: false, description: "パンくずの nav 要素のアクセシブルネーム" },
    packageTitleText: { control: false, description: "パッケージタイトル(h2)" },
    packages: {
      control: false,
      description: "表示するパッケージ一覧(各要素は PackageCard の props)",
    },
    pageDescriptionText: { control: false, description: "ページの説明文" },
    pageTitleText: { control: false, description: "ページタイトル(h1)" },
  },
  args: {
    breadcrumbItems: [],
    breadcrumbLabelText: "{breadcrumbLabelText}",
    packageTitleText: "{packageTitleText}",
    packages: [
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h3",
        innerLinkHref: "/packages/oxfmt-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxfmt-config",
        versionText: "v1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h3",
        innerLinkHref: "/packages/oxlint-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxlint-config",
        versionText: "v1.0.0",
      },
    ],
    pageDescriptionText: "{pageDescriptionText}",
    pageTitleText: "{pageTitleText}",
  },
} satisfies Meta<typeof Home>

export default meta

type Story = StoryObj<typeof meta>

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}

export const TestForHeadingStructure: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const heading1Texts = canvas
      .getAllByRole("heading", { level: 1 })
      .map((element) => element.textContent)
    const heading2Texts = canvas
      .getAllByRole("heading", { level: 2 })
      .map((element) => element.textContent)
    const heading3Texts = canvas
      .getAllByRole("heading", { level: 3 })
      .map((element) => element.textContent)
    await expect(heading1Texts).toStrictEqual(["Tool for TypeScript projects"])
    await expect(heading2Texts).toStrictEqual(["Packages"])
    await expect(heading3Texts).toStrictEqual(["@ts-items/oxlint-config", "@ts-items/oxfmt-config"])
  },
  render: (args) => <Localized {...args} />,
  tags: ["!autodocs"],
}
