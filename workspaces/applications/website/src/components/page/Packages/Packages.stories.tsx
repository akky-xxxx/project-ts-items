import { useTranslations } from "next-intl"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.ts"
import { Packages } from "./Packages.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof Packages>> = (props) => {
  const packageTranslate = useTranslations("packages")

  return <Packages {...props} packages={buildPackageCardItems(packageTranslate, "h2")} />
}

const meta = {
  component: Packages,

  argTypes: {
    packages: {
      control: false,
      description: "表示するパッケージ一覧(各要素は PackageCard の props)",
    },
  },
  args: {
    packages: [
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: `/packages/${PACKAGE_NAMES.oxfmtConfig}/`,
        packageNameText: `${PROJECT_NAME}/${PACKAGE_NAMES.oxfmtConfig}`,
        versionText: "v1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: `/packages/${PACKAGE_NAMES.oxlintConfig}/`,
        packageNameText: `${PROJECT_NAME}/${PACKAGE_NAMES.oxlintConfig}`,
        versionText: "v1.0.0",
      },
    ],
  },
} satisfies Meta<typeof Packages>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  argTypes: {
    packages: {
      control: "object",
    },
  },
}

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}
