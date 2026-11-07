import { NextIntlClientProvider } from "next-intl"

import { siteDictionary } from "../src/i18n/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../src/i18n/toLocaleMessages/toLocaleMessages.ts"

import type { Preview } from "@storybook/nextjs-vite"

import "../src/app/reset.module.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={toLocaleMessages(siteDictionary, "en")}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default preview
