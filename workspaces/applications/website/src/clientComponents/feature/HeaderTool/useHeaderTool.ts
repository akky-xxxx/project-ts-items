import { useLocale } from "./modules/useLocale/useLocale.ts"
import { useTheme } from "./modules/useTheme/useTheme.tsx"

import type { themeSchema } from "../../../schemas/themeSchema/themeSchema.ts"
import type * as z from "zod/mini"
import { useTranslations } from "next-intl"

type Input = {
  theme: z.output<typeof themeSchema>
}

export const useHeaderTool = (input: Input) => {
  const { theme } = input
  const translation = useTranslations("header")
  const { currentThemeIcon, localTheme, selectTheme, themeItems } = useTheme({
    darkThemeText: translation("theme.dark"),
    lightThemeText: translation("theme.light"),
    systemThemeText: translation("theme.system"),
    theme,
  })
  const { currentLanguageName, locale, selectLanguage } = useLocale()

  return {
    currentLanguageName,
    currentThemeIcon,
    languageLegendText: translation("language"),
    localTheme,
    locale,
    selectLanguage,
    selectTheme,
    themeItems,
    themeLegendText: translation("theme.legend"),
  }
}
