import { useTranslations } from "next-intl"

import { useLocale } from "../../clientComponents/feature/HeaderTool/modules/useLocale/useLocale.ts"
import { useTheme } from "../../clientComponents/feature/HeaderTool/modules/useTheme/useTheme.tsx"

import type { themeSchema } from "../../schemas/themeSchema/themeSchema.ts"
import type * as z from "zod/mini"

type Input = {
  theme: z.output<typeof themeSchema>
}

export const useTool = (input: Input) => {
  const { theme } = input
  const headerTranslate = useTranslations("header")
  const { currentThemeIcon, localTheme, selectTheme, themeItems } = useTheme({
    darkThemeText: headerTranslate("theme.dark"),
    lightThemeText: headerTranslate("theme.light"),
    systemThemeText: headerTranslate("theme.system"),
    theme,
  })
  const { currentLanguageName, locale, selectLanguage } = useLocale()

  return {
    currentLanguageName,
    currentThemeIcon,
    languageLegendText: headerTranslate("language"),
    localTheme,
    locale,
    selectLanguage,
    selectTheme,
    themeItems,
    themeLegendText: headerTranslate("theme.legend"),
  }
}
