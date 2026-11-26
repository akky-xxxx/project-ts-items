import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { PACKAGE_MASTER } from "../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { OxlintConfigQuickstart } from "./OxlintConfigQuickstart.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof OxlintConfigQuickstart>> = (props) => {
  const pagesTranslate = useTranslations("pages")
  const breadcrumbItems = useMemo(
    () => [
      {
        href: "/packages/",
        text: pagesTranslate("packages.pageTitle"),
      },
      {
        href: `/packages/${PACKAGE_MASTER["oxlint-config"].name}/`,
        text: PACKAGE_MASTER["oxlint-config"].name,
      },
    ],
    [pagesTranslate],
  )

  return <OxlintConfigQuickstart {...props} breadcrumbItems={breadcrumbItems} />
}

const meta = {
  component: OxlintConfigQuickstart,

  argTypes: {
    breadcrumbItems: {
      control: false,
      description: "パンくずのルートと現在のページの間の階層(各要素は Breadcrumb の items の要素)",
    },
  },
  args: {
    breadcrumbItems: [
      { href: "/packages/", text: "{breadcrumbItemText}" },
      {
        href: `/packages/${PACKAGE_MASTER["oxlint-config"].name}/`,
        text: PACKAGE_MASTER["oxlint-config"].name,
      },
    ],
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof OxlintConfigQuickstart>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
