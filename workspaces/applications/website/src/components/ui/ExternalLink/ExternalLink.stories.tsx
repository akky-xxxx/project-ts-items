import { useTranslations } from "next-intl"

import { ExternalLink } from "./ExternalLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof ExternalLink>> = (props) => {
  const translate = useTranslations("components.ui.externalLink")

  return <ExternalLink {...props} newTabText={translate("newTab")} />
}

const meta = {
  component: ExternalLink,

  argTypes: {
    children: { description: "リンクテキスト" },
    href: { description: "リンク先 URL" },
    newTabText: { control: false, description: "新しいタブで開くことを伝える読み上げ用テキスト" },
  },
  args: {
    children: "External link",
    href: "https://example.com",
    newTabText: "{newTabText}",
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof ExternalLink>

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
