import { useLocale } from "./modules/useLocale/useLocale.ts"
import { useTheme } from "./modules/useTheme/useTheme.tsx"

import type { themeSchema } from "../../../schemas/themeSchema/themeSchema.ts"
import type * as z from "zod/mini"

interface Input {
  darkThemeText: string
  lightThemeText: string
  systemThemeText: string
  theme: z.output<typeof themeSchema>
}

export const useHeaderTool = (input: Input) => {
  const { currentThemeIcon, localTheme, selectTheme, themeItems } = useTheme(input)
  const { currentLanguageName, locale, selectLanguage } = useLocale()

  return {
    currentLanguageName,
    currentThemeIcon,
    localTheme,
    locale,
    selectLanguage,
    selectTheme,
    themeItems,
  }
}
