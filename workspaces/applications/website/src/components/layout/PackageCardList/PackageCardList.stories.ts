import { PackageCardList } from "./PackageCardList.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: PackageCardList,

  args: {
    packages: [
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: "/packages/oxfmt-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxfmt-config",
        versionText: "v1.0.0",
      },
      {
        descriptionNode: "{descriptionNode}",
        headingTag: "h2",
        innerLinkHref: "/packages/oxlint-config",
        linkText: "{linkText}",
        packageNameText: "@ts-items/oxlint-config",
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
