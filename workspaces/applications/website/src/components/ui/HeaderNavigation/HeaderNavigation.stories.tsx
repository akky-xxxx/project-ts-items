import { useTranslations } from "next-intl"
import { expect, within } from "storybook/test"

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
    navigationLabelText: "{Site navigation}",
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

export const TestForNavigationLabel: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const navigationElement = canvas.getByRole("navigation", { name: "Site navigation" })
    await expect(navigationElement).toBeInTheDocument()
  },
  tags: ["!autodocs"],
}

export const TestForPackagesLink: Story = {
  ...En,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const packagesLinkElement = canvas.queryByText<HTMLLinkElement>("Packages")
    await expect(packagesLinkElement).toHaveAttribute("href", "/en/packages/")
  },
  tags: ["!autodocs"],
}

export const TestForChangeLogLink: Story = {
  ...En,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const packagesLinkElement = canvas.queryByText<HTMLLinkElement>("Change log")
    await expect(packagesLinkElement).toHaveAttribute(
      "href",
      "https://github.com/akky-xxxx/project-ts-items/releases",
    )
    await expect(packagesLinkElement).toHaveAttribute("target", "_blank")
  },
  tags: ["!autodocs"],
}
