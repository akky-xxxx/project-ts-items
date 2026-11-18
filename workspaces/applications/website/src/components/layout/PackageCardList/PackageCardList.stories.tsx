import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { PackageCardList } from "./PackageCardList.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: PackageCardList,

  args: {
    packages: [
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: `/packages/${PACKAGE_NAMES.oxfmtConfig}/`,
        packageLogoNode: <DummyForStorybook label="P1" />,
        packageNameText: `${PROJECT_NAME}/${PACKAGE_NAMES.oxfmtConfig}`,
        versionText: "v1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: `/packages/${PACKAGE_NAMES.oxlintConfig}/`,
        packageLogoNode: <DummyForStorybook label="P2" />,
        packageNameText: `${PROJECT_NAME}/${PACKAGE_NAMES.oxlintConfig}`,
        versionText: "v1.0.0",
      },
    ],
  },
} satisfies Meta<typeof PackageCardList>

export default meta

type Story = StoryObj<typeof meta>

export const SingleLane: Story = {
  args: {
    laneNumber: 1,
  },
}

export const DoubleLane: Story = {
  args: {
    laneNumber: 2,
  },
}
