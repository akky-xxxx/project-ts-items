import { useTranslations } from "next-intl"
import { expect, within } from "storybook/test"

import { ExternalLink } from "./ExternalLink.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof ExternalLink>> = (props) => {
  const translate = useTranslations("externalLink")

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

export const TestForAttributes: Story = {
  ...En,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole<HTMLAnchorElement>("link", {
      name: "External link (opens in a new tab)",
    })
    await expect(linkElement).toHaveAttribute("href", "https://example.com")
    await expect(linkElement).toHaveAttribute("rel", "noopener noreferrer")
    await expect(linkElement).toHaveAttribute("target", "_blank")
  },
  tags: ["!autodocs"],
}

export const TestForJaAccessibleName: Story = {
  ...Ja,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole("link", { name: "External link (新しいタブで開く)" })
    await expect(linkElement).toBeInTheDocument()
  },
  tags: ["!autodocs"],
}
