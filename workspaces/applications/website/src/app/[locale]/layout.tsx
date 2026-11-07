import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"

import { routing } from "../../i18n/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import "../reset.module.css"

const inter = Inter({ subsets: ["latin"] })

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

const RootLayout = async (props: Props): Promise<ReactNode> => {
  const { children, params } = props
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
