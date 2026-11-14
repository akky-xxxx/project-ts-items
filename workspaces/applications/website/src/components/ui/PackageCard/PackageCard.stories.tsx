import { createTranslator, useLocale, useTranslations } from "next-intl"

import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { PackageCard } from "./PackageCard.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

/** T.rich で改行を渡す例。自己終了タグ(`<br/>`)はタグとして解釈されないため `<br></br>` と書く */
const descriptionMessages = {
  en: { description: "First line<br></br>Second line" },
  ja: { description: "一行目<br></br>二行目" },
} as const

const Localized: FC<ComponentProps<typeof PackageCard>> = (props) => {
  const locale = useLocale()
  const translate = useTranslations("components.ui.packageCard")
  const translateDescription = createTranslator({
    locale,
    messages: descriptionMessages[locale],
  })

  return (
    <PackageCard
      {...props}
      descriptionNode={translateDescription.rich("description", { br: renderLineBreak })}
      linkText={translate("linkText")}
    />
  )
}

const meta = {
  component: PackageCard,

  argTypes: {
    descriptionNode: {
      control: false,
      description: "パッケージの説明。改行は t.rich の `<br></br>` タグで表す",
    },
    headingTag: { description: "パッケージ名の見出し要素(h2〜h6)" },
    innerLinkHref: { description: "カード全体のリンク先(サイト内のパス)" },
    isDescriptionClamped: { description: "説明を2行で省略するか" },
    linkText: {
      control: false,
      description: "リンクであることを示す装飾用テキスト(読み上げ対象外)",
    },
    packageNameText: { description: "パッケージ名(見出し・リンクのアクセシブルネーム)" },
    versionText: { description: "バージョン" },
  },
  args: {
    descriptionNode: "{descriptionNode}",
    headingTag: "h2",
    innerLinkHref: "/packages/oxlint-config",
    linkText: "{linkText}",
    packageNameText: "@ts-items/oxlint-config",
    versionText: "v1.0.0",
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof PackageCard>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  globals: {
    locale: "en",
  },
}
export const Ja: Story = {
  globals: {
    locale: "ja",
  },
}
