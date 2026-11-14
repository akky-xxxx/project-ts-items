import { expect, waitFor, within } from "storybook/test"

import { fixLightThemeForStorybook } from "../../../tests/fixLightThemeForStorybook/fixLightThemeForStorybook.ts"
import { getUserEventForStorybook } from "../../../tests/getUserEventForStorybook/getUserEventForStorybook.ts"
import meta, { En } from "./PackageCard.stories.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const testMeta = {
  ...meta,
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof meta.component>

export default testMeta

type Story = StoryObj<typeof testMeta>

export const TestForLink: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const linkElement = canvas.getByRole("link", { name: "@ts-items/oxlint-config" })
    await expect(linkElement).toHaveAttribute("href", "/en/packages/oxlint-config/")
  },
}

export const TestForHeading: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const headingElement = canvas.getByRole("heading", {
      level: 2,
      name: "@ts-items/oxlint-config",
    })
    await expect(headingElement).toBeInTheDocument()
  },
}

export const TestForLinkTextHidden: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Documents >")).toHaveAttribute("aria-hidden", "true")
  },
}

export const TestForDescriptionLineBreak: Story = {
  ...En,
  play: async (context) => {
    const { canvasElement } = context
    const canvas = within(canvasElement)
    const descriptionElement = canvas.getByText(/First line/u).closest("p")
    await expect(descriptionElement?.querySelectorAll("br")).toHaveLength(1)
    await expect(descriptionElement).toHaveTextContent("First lineSecond line")
  },
}

/** カードのルート要素(decorator は DOM を追加しないため、canvas の最初の子要素になる) */
const getCardElement = (canvasElement: HTMLElement) => {
  const cardElement = canvasElement.firstElementChild
  if (!(cardElement instanceof HTMLElement)) {
    throw new TypeError("card element not found")
  }

  return cardElement
}

export const TestForHoverStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const cardElement = getCardElement(canvasElement)
    await waitFor(async () => {
      await expect(cardElement).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" })
    })

    await userEvent.hover(cardElement)
    await waitFor(async () => {
      await expect(cardElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
    await userEvent.unhover(cardElement)
  },
}

export const TestForFocusVisibleStyle: Story = {
  ...En,
  beforeEach: fixLightThemeForStorybook,
  play: async (context) => {
    const { canvasElement } = context
    const userEvent = await getUserEventForStorybook()
    const cardElement = getCardElement(canvasElement)
    await waitFor(async () => {
      await expect(cardElement).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" })
    })

    await userEvent.tab()
    await expect(within(canvasElement).getByRole("link")).toHaveFocus()
    await waitFor(async () => {
      await expect(cardElement).toHaveStyle({ backgroundColor: "rgb(240, 245, 242)" })
    })
  },
}
