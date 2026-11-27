import { expect, waitFor, within } from "storybook/test"

import meta from "./TocList.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/** 見出しを1つずつ画面上部へスクロールできるよう、各セクションを viewport より高くする */
const SECTION_STYLE = { height: "150vh" } as const
/** 末尾までスクロールしても見出しが画面上部に届かないよう、最後のセクションを短くする */
const SHORT_SECTION_STYLE = { height: "10vh" } as const

const testMeta = {
  ...meta,
  args: {
    items: [
      {
        anchor: "#about",
        text: "About",
      },
      {
        anchor: "#install",
        text: "Install",
      },
      {
        anchor: "#setup",
        text: "Setup",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />

        <section style={SECTION_STYLE}>
          <h2 id="about">About</h2>
        </section>

        <section style={SECTION_STYLE}>
          <h2 id="install">Install</h2>
        </section>

        <section style={SHORT_SECTION_STYLE}>
          <h2 id="setup">Setup</h2>
        </section>
      </div>
    ),
  ],
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

const scrollToHeading = (canvasElement: HTMLElement, id: string) => {
  canvasElement.querySelector(`#${id}`)?.scrollIntoView({ block: "start" })
}

const scrollToEnd = () => {
  const { scrollingElement } = globalThis.document
  scrollingElement?.scrollTo({ top: scrollingElement.scrollHeight })
}

export const TestForCurrentAnchorOnScroll: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const aboutLink = canvas.getByRole("link", { name: "About" })
    const installLink = canvas.getByRole("link", { name: "Install" })

    scrollToHeading(canvasElement, "install")
    await waitFor(async () => {
      await expect(installLink).toHaveAttribute("aria-current", "location")
    })
    await expect(aboutLink).not.toHaveAttribute("aria-current")

    scrollToHeading(canvasElement, "about")
    await waitFor(async () => {
      await expect(aboutLink).toHaveAttribute("aria-current", "location")
    })
    await expect(installLink).not.toHaveAttribute("aria-current")
  },
}

export const TestForLastAnchorOnScrollEnd: Story = {
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const aboutLink = canvas.getByRole("link", { name: "About" })
    const setupLink = canvas.getByRole("link", { name: "Setup" })

    scrollToEnd()
    await waitFor(async () => {
      await expect(setupLink).toHaveAttribute("aria-current", "location")
    })

    scrollToHeading(canvasElement, "about")
    await waitFor(async () => {
      await expect(aboutLink).toHaveAttribute("aria-current", "location")
    })
    await expect(setupLink).not.toHaveAttribute("aria-current")
  },
}
