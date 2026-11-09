import { hasLocale, NextIntlClientProvider } from "next-intl"

import { FONT_VARIABLES } from "../src/constants/FONT_VARIABLES/FONT_VARIABLES.ts"
import { routing } from "../src/i18n/constants/routing/routing.ts"
import { siteDictionary } from "../src/i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../src/i18n/utilities/toLocaleMessages/toLocaleMessages.ts"

import type { Preview } from "@storybook/nextjs-vite"

import "../src/app/reset.css"
import "../src/app/[locale]/global.css"

const preview: Preview = {
  beforeAll: () => {
    document.documentElement.classList.add(...FONT_VARIABLES)
  },
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
