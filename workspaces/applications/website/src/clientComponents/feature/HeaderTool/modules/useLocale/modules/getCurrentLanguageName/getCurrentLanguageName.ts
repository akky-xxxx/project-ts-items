import { LANGUAGE_ITEMS } from "../../../../constants/LANGUAGE_ITEMS/LANGUAGE_ITEMS.ts"

import type { Locale } from "../../../../../../../i18n/types/Locale/Locale.ts"

type GetCurrentLanguageName = (locale: Locale) => (typeof LANGUAGE_ITEMS)[number]["labelText"]

export const getCurrentLanguageName: GetCurrentLanguageName = (locale) =>
  LANGUAGE_ITEMS.find(({ value }) => value === locale)?.labelText ?? "English"
