import { LongContents } from "../../../tests/LongContents/LongContents.tsx"
import { DocsPageLayout } from "./DocsPageLayout.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: DocsPageLayout,

  argTypes: {
    children: { control: false },
    tocElement: { control: false },
  },
  args: {
    children: <LongContents text="children" />,
    // Toc と同じく、ナビゲーションのランドマークは tocElement 側が持つ
    tocElement: (
      <nav aria-label="{tocLabelText}">
        <LongContents length={10} text="tocElement" />
      </nav>
    ),
  },
} satisfies Meta<typeof DocsPageLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
