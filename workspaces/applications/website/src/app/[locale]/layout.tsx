import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { COOKIE_KEY_THEME } from "../../constants/COOKIE_KEYS/COOKIE_KEYS.ts"
import { FONT_VARIABLES } from "../../constants/FONT_VARIABLES/FONT_VARIABLES.ts"
import { routing } from "../../i18n/constants/routing/routing.ts"

import "./reset.css"
import "./global.css"
import { getThemeFromCookie } from "../../utilities/getThemeFromCookie/getThemeFromCookie.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = LayoutProps<"/[locale]">

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "Metadata" })

  return {
    description: translate("description"),
    title: translate("title"),
  }
}

const Layout = async (props: Props): Promise<ReactNode> => {
  const { children, params } = props
  const { locale } = await params
  const cookieObject = await cookies()
  const theme = getThemeFromCookie(cookieObject.get(COOKIE_KEY_THEME))

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html className={FONT_VARIABLES.join(" ")} data-theme={theme} lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
