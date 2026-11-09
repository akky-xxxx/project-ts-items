import type { siteDictionary } from "./constants/siteDictionary/siteDictionary.ts"
import type { Locale } from "./types/Locale/Locale.ts"
import type { LocaleMessages } from "./types/LocaleMessages/LocaleMessages.ts"

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale
    Messages: LocaleMessages<typeof siteDictionary>
  }
}
