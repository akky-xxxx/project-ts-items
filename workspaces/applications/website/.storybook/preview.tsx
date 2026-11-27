import { createPreviewAnnotations } from "msw-storybook-addon/preview"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { sb } from "storybook/test"
import { MINIMAL_VIEWPORTS } from "storybook/viewport"

import { FONT_VARIABLES } from "../src/constants/FONT_VARIABLES/FONT_VARIABLES.ts"
import { routing } from "../src/i18n/constants/routing/routing.ts"
import { siteDictionary } from "../src/i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../src/i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { themeSchema } from "../src/schemas/themeSchema/themeSchema.ts"
import { applyThemeGlobalForStorybook } from "../src/tests/applyThemeGlobalForStorybook/applyThemeGlobalForStorybook.ts"
import { setupMswWorkerForStorybook } from "../src/tests/setupMswWorkerForStorybook/setupMswWorkerForStorybook.ts"
import { VIEWPORT_OPTIONS_FOR_STORYBOOK } from "../src/tests/VIEWPORT_OPTIONS_FOR_STORYBOOK/VIEWPORT_OPTIONS_FOR_STORYBOOK.ts"

import type { Preview } from "@storybook/nextjs-vite"

import "../src/app/[locale]/reset.css"
import "../src/app/[locale]/global.css"

// 本体は node:fs を読み込みブラウザで動かないため、__mocks__ の手書きモックに差し替える
// oxlint-disable-next-line vitest/require-hook -- sb.mock is a storybook module mock that must be registered at the top level of preview
sb.mock(import("../src/utilities/isFeatureEnabled/isFeatureEnabled.ts"))

const mswPreviewAnnotations = createPreviewAnnotations(setupMswWorkerForStorybook)

const preview: Preview = {
  ...mswPreviewAnnotations,
  beforeAll: () => {
    document.documentElement.classList.add(...FONT_VARIABLES)
  },
  // msw-storybook-addon の annotations も beforeEach を持つため、上書きせずに並べる
  beforeEach: [mswPreviewAnnotations.beforeEach ?? [], applyThemeGlobalForStorybook].flat(),
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
    theme: {
      description: "Theme for data-theme of html element",
      toolbar: {
        dynamicTitle: true,
        icon: "mirror",
        items: [...themeSchema.options],
      },
    },
  },
  initialGlobals: {
    locale: routing.defaultLocale,
    theme: "system",
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
    nextjs: { appDirectory: true },
    viewport: {
      // 既存の story が使う既定の viewport(mobile2 等)を残したまま、サイトのブレークポイントに対応する viewport を足す
      options: { ...MINIMAL_VIEWPORTS, ...VIEWPORT_OPTIONS_FOR_STORYBOOK },
    },
  },
  tags: ["autodocs"],
}

export default preview
