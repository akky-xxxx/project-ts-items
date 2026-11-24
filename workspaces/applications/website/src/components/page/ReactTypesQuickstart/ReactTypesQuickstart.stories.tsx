import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { PACKAGE_MASTER } from "../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { ReactTypesQuickstart } from "./ReactTypesQuickstart.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof ReactTypesQuickstart>> = (props) => {
  const pagesTranslate = useTranslations("pages")
  const breadcrumbItems = useMemo(
    () => [
      {
        href: "/packages/",
        text: pagesTranslate("packages.pageTitle"),
      },
      {
        href: `/packages/${PACKAGE_MASTER["react-types"].name}/`,
        text: PACKAGE_MASTER["react-types"].name,
      },
    ],
    [pagesTranslate],
  )

  return <ReactTypesQuickstart {...props} breadcrumbItems={breadcrumbItems} />
}

const meta = {
  component: ReactTypesQuickstart,

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
        href: `/packages/${PACKAGE_MASTER["react-types"].name}/`,
        text: PACKAGE_MASTER["react-types"].name,
      },
    ],
  },
  render: (args) => <Localized {...args} />,
} satisfies Meta<typeof ReactTypesQuickstart>

export default meta

type Story = StoryObj<typeof meta>

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
}
