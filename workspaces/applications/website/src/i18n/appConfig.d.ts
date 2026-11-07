import type { Locale } from "./Locale/Locale.ts"
import type { LocaleMessages } from "./LocaleMessages/LocaleMessages.ts"
import type { siteDictionary } from "./siteDictionary/siteDictionary.ts"

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale
    Messages: LocaleMessages<typeof siteDictionary>
  }
}
