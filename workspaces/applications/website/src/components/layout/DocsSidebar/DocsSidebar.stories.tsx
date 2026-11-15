import { DummyForStorybook } from "../../../tests/DummyForStorybook/DummyForStorybook.tsx"
import { DocsSidebar } from "./DocsSidebar.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: DocsSidebar,

  argTypes: {
    docsNavigationUlElement: {
      control: false,
      description: "ナビゲーション内に表示する、ドキュメントのリンク一覧",
    },
    latestText: { description: "バージョンが最新であることを示すラベル" },
    navigationLabelText: { description: "ナビゲーションのアクセシブルネーム" },
    newTabText: { description: "外部リンクが新しいタブで開くことを伝える、視覚的には隠した文字列" },
    npmHref: { description: "npm のパッケージページの URL" },
    packagesSelectorElement: { control: false, description: "パッケージの切り替え UI" },
    serviceNameText: { description: "npm リンクの文字列" },
    versionText: { description: "表示するパッケージのバージョン" },
  },
  args: {
    docsNavigationUlElement: <DummyForStorybook label="docsNavigationUlElement" />,
    latestText: "{latestText}",
    navigationLabelText: "{navigationLabelText}",
    newTabText: "{newTabText}",
    npmHref: "https://example.com",
    packagesSelectorElement: <DummyForStorybook label="packagesSelectorElement" />,
    serviceNameText: "{serviceNameText}",
    versionText: "v1.0.0",
  },
} satisfies Meta<typeof DocsSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
