import { hasLocale, NextIntlClientProvider } from "next-intl"

import { routing } from "../src/i18n/routing/routing.ts"
import { siteDictionary } from "../src/i18n/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../src/i18n/toLocaleMessages/toLocaleMessages.ts"

import type { Preview } from "@storybook/nextjs-vite"

import "../src/app/reset.css"

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { locale: requestedLocale } = context.globals
      const locale = hasLocale(routing.locales, requestedLocale)
        ? requestedLocale
        : routing.defaultLocale

      return (
        <NextIntlClientProvider locale={locale} messages={toLocaleMessages(siteDictionary, locale)}>
          <Story />
        </NextIntlClientProvider>
      )
    },
  ],
  globalTypes: {
    locale: {
      description: "Locale for next-intl messages",
      toolbar: {
        dynamicTitle: true,
        icon: "globe",
        items: [...routing.locales],
      },
    },
  },
  initialGlobals: {
    locale: routing.defaultLocale,
  },
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
