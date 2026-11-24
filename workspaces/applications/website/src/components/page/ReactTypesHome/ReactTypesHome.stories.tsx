import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { ReactTypesHome } from "./ReactTypesHome.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof ReactTypesHome>> = (props) => {
  const pagesTranslate = useTranslations("pages")
  const breadcrumbItems = useMemo(
    () => [
      {
        href: "/packages/",
        text: pagesTranslate("packages.pageTitle"),
      },
    ],
    [pagesTranslate],
  )

  return <ReactTypesHome {...props} breadcrumbItems={breadcrumbItems} />
}

const meta = {
  component: ReactTypesHome,

  argTypes: {
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートと現在のページの間の階層(各要素は Breadcrumb の items の要素)",
    },
  },
  args: {
    breadcrumbItems: [{ href: "/packages/", text: "{breadcrumbItemText}" }],
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof ReactTypesHome>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
