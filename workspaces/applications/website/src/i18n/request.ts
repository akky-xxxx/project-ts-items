import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import { locale as getRootLocale } from "next/root-params"

import { routing } from "./constants/routing/routing.ts"
import { siteDictionary } from "./constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "./utilities/toLocaleMessages/toLocaleMessages.ts"

const requestConfig = getRequestConfig(async (parameters) => {
  const requestedLocale = parameters.locale ?? (await getRootLocale())
  if (!hasLocale(routing.locales, requestedLocale)) {
    notFound()
  }

  return {
    locale: requestedLocale,
    messages: toLocaleMessages(siteDictionary, requestedLocale),
  }
})

export default requestConfig
