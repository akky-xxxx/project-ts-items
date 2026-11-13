// Locale 自体の操作をするため
// oxlint-disable-next-line eslint/no-restricted-imports
import { useParams, usePathname, useRouter } from "next/navigation"

import { getCurrentLanguageName } from "./modules/getCurrentLanguageName/getCurrentLanguageName.ts"

import type { Locale } from "../../../../../i18n/types/Locale/Locale.ts"

export const useLocale = () => {
  const { locale } = useParams<{ locale: Locale }>()
  const pathname = usePathname()
  const router = useRouter()
  const selectLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(new RegExp(`^/${locale}/`, "u"), `/${newLocale}/`)
    router.replace(newPathname)
  }
  const currentLanguageName = getCurrentLanguageName(locale)

  return {
    currentLanguageName,
    locale,
    selectLanguage,
  }
}
