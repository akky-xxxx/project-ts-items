import { useTranslations } from "next-intl"

import { HeaderNavigation } from "./HeaderNavigation.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof HeaderNavigation>> = (props) => {
  const translate = useTranslations("header.navigation")

  return (
    <HeaderNavigation
      {...props}
      changeLogText={translate("changeLog")}
      navigationLabelText={translate("ariaLabel")}
      packageText={translate("package")}
    />
  )
}

const meta = {
  component: HeaderNavigation,

  argTypes: {
    changeLogText: { control: false, description: "リンクテキスト" },
    navigationLabelText: { control: false, description: "ナビゲーションのラベル(aria-label)" },
    packageText: { control: false, description: "リンクテキスト" },
  },
  args: {
    changeLogText: "{Change Log}",
    navigationLabelText: "{Site navigation menu}",
    packageText: "{Packages}",
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof HeaderNavigation>

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
