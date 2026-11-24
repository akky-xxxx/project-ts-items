import { useTranslations } from "next-intl"

import { PACKAGE_MASTER } from "../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { EN_LOCALE_FOR_STORYBOOK } from "../../../tests/EN_LOCALE_FOR_STORYBOOK/EN_LOCALE_FOR_STORYBOOK.ts"
import { JA_LOCALE_FOR_STORYBOOK } from "../../../tests/JA_LOCALE_FOR_STORYBOOK/JA_LOCALE_FOR_STORYBOOK.ts"
import { SuspenseDecorator } from "../../../tests/SuspenseDecorator/SuspenseDecorator.tsx"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.tsx"
import { Home } from "./Home.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps, FC } from "react"

const Localized: FC<ComponentProps<typeof Home>> = (props) => {
  const packageTranslate = useTranslations("packages")

  return (
    <Home
      {...props}
      packages={buildPackageCardItems({
        headingTag: "h3",
        packageTranslate,
        versionTexts: {
          "oxfmt-config": "1.0.0",
          "oxlint-config": "2.0.0",
          "react-types": "3.0.0",
        },
      })}
    />
  )
}

const meta = {
  component: Home,
  decorators: [SuspenseDecorator],

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
        headingTag: "h3",
        innerLinkHref: `/packages/${PACKAGE_MASTER["oxfmt-config"].name}/`,
        packageLogoNode: <DummyForStorybook label="P1" />,
        packageNameText: `${PROJECT_NAME}/${PACKAGE_MASTER["oxfmt-config"].name}`,
        versionText: "1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h3",
        innerLinkHref: `/packages/${PACKAGE_MASTER["oxlint-config"].name}/`,
        packageLogoNode: <DummyForStorybook label="P2" />,
        packageNameText: `${PROJECT_NAME}/${PACKAGE_MASTER["oxlint-config"].name}`,
        versionText: "1.0.0",
      },
    ],
  },
} satisfies Meta<typeof Home>

export default meta

type Story = StoryObj<typeof meta>

export const Ja: Story = {
  ...JA_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}

export const En: Story = {
  ...EN_LOCALE_FOR_STORYBOOK,
  render: (args) => <Localized {...args} />,
}
