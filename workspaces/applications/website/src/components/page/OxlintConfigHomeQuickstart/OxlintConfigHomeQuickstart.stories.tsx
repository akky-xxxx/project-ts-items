import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { OxlintConfigHomeQuickstart } from "./OxlintConfigHomeQuickstart.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof OxlintConfigHomeQuickstart>> = (props) => {
  const pageTranslate = useTranslations("pages.oxlintConfigQuickstart")
  const packagesPageTranslate = useTranslations("pages.packages")
  const breadcrumbTranslate = useTranslations("components.ui.breadcrumb")
  const tabTranslate = useTranslations("components.ui.tab")
  const breadcrumbItems = useMemo(
    () => [
      {
        href: "/packages/",
        text: packagesPageTranslate("pageTitle"),
      },
      {
        href: `/packages/${PACKAGE_NAMES.oxlintConfig}/`,
        text: PACKAGE_NAMES.oxlintConfig,
      },
      {
        text: pageTranslate("pageTitle"),
      },
    ],
    [packagesPageTranslate, pageTranslate],
  )

  return (
    <OxlintConfigHomeQuickstart
      {...props}
      breadcrumbItems={breadcrumbItems}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      copiedText={tabTranslate("copiedText")}
      copyButtonLabelText={tabTranslate("copyButtonLabelText")}
      installTitleText={pageTranslate("installTitle")}
      pageDescriptionText={pageTranslate.rich("pageDescription", { br: renderLineBreak })}
      pageTitle={pageTranslate("pageTitle")}
      setupTitleText={pageTranslate("setupTitle")}
    />
  )
}

const meta = {
  component: OxlintConfigHomeQuickstart,

  argTypes: {
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートより後ろの階層(各要素は Breadcrumb の items の要素)",
    },
    breadcrumbLabelText: { control: false, description: "パンくずの nav 要素のアクセシブルネーム" },
    copiedText: {
      control: false,
      description: "インストールコマンドのコピー完了時にトーストで表示するテキスト",
    },
    copyButtonLabelText: {
      control: false,
      description: "インストールコマンドのコピーボタンのラベル(aria-label)",
    },
    installTitleText: { control: false, description: "インストールセクションの見出し(h2)" },
    pageDescriptionText: {
      control: false,
      description: "ページの説明文。改行は t.rich の `<br></br>` タグで表す",
    },
    pageTitle: { control: false, description: "ページタイトル(h1)" },
    setupTitleText: { control: false, description: "設定方法セクションの見出し(h2)" },
  },
  args: {
    breadcrumbItems: [
      { href: "/packages/", text: "{breadcrumbItemText}" },
      { href: `/packages/${PACKAGE_NAMES.oxlintConfig}/`, text: PACKAGE_NAMES.oxlintConfig },
      { text: "{pageTitle}" },
    ],
    breadcrumbLabelText: "{breadcrumbLabelText}",
    copiedText: "{copiedText}",
    copyButtonLabelText: "{copyButtonLabelText}",
    installTitleText: "{installTitleText}",
    pageDescriptionText: "{pageDescriptionText}",
    pageTitle: "{pageTitle}",
    setupTitleText: "{setupTitleText}",
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof OxlintConfigHomeQuickstart>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
