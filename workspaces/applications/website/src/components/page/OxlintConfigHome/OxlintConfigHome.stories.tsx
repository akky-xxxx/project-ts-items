import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { OxlintConfigHome } from "./OxlintConfigHome.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof OxlintConfigHome>> = (props) => {
  const pageTranslate = useTranslations("pages.oxlintConfigHome")
  const packagesPageTranslate = useTranslations("pages.packages")
  const breadcrumbItems = useMemo(
    () => [
      {
        href: "/packages/",
        text: packagesPageTranslate("pageTitle"),
      },
      {
        text: PACKAGE_NAMES.oxlintConfig,
      },
    ],
    [packagesPageTranslate],
  )

  return (
    <OxlintConfigHome
      {...props}
      backgroundDescriptionText={pageTranslate.rich("backgroundDescription", {
        br: renderLineBreak,
      })}
      backgroundTitleText={pageTranslate("backgroundTitle")}
      breadcrumbItems={breadcrumbItems}
      pageDescriptionText={pageTranslate.rich("pageDescription", { br: renderLineBreak })}
      pageTitle={pageTranslate("pageTitle")}
    />
  )
}

const meta = {
  component: OxlintConfigHome,

  argTypes: {
    backgroundDescriptionText: {
      control: false,
      description: "概要セクションの説明文。改行は t.rich の `<br></br>` タグで表す",
    },
    backgroundTitleText: { control: false, description: "概要セクションの見出し(h2)" },
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートより後ろの階層(各要素は Breadcrumb の items の要素)",
    },
    pageDescriptionText: {
      control: false,
      description: "ページの説明文。改行は t.rich の `<br></br>` タグで表す",
    },
    pageTitle: { control: false, description: "ページタイトル(h1)" },
  },
  args: {
    backgroundDescriptionText: "{backgroundDescriptionText}",
    backgroundTitleText: "{backgroundTitleText}",
    breadcrumbItems: [
      { href: "/packages/", text: "{breadcrumbItemText}" },
      { text: PACKAGE_NAMES.oxlintConfig },
    ],
    pageDescriptionText: "{pageDescriptionText}",
    pageTitle: "{pageTitle}",
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof OxlintConfigHome>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
