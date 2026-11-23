import { hasLocale } from "next-intl"
import { useParams } from "next/navigation"

import { routing } from "../../../../../i18n/constants/routing/routing.ts"
import { usePathname, useRouter } from "../../../../../utilities/navigation/navigation.ts"
import { getCurrentLanguageName } from "./modules/getCurrentLanguageName/getCurrentLanguageName.ts"

import type { Locale } from "../../../../../i18n/types/Locale/Locale.ts"

export const useLocale = () => {
  const { locale } = useParams<{ locale: Locale }>()
  const pathname = usePathname()
  const router = useRouter()
  const selectLanguage = (newLocale: string) => {
    if (!hasLocale(routing.locales, newLocale)) {
      return
    }
    // Query string と hash は pathname に含まれないため、遷移時に付け直す
    const { hash, search } = globalThis.location
    router.replace(`${pathname}${search}${hash}`, { locale: newLocale })
  }
  const currentLanguageName = getCurrentLanguageName(locale)

  return {
    currentLanguageName,
    locale,
    selectLanguage,
  }
}
