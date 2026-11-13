import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { HeaderTool } from "../../clientComponents/feature/HeaderTool/HeaderTool.tsx"
import { RootLayout } from "../../components/layout/RootLayout/RootLayout.tsx"
import { HeaderInner } from "../../components/ui/HeaderInner/HeaderInner.tsx"
import { HeaderNavigation } from "../../components/ui/HeaderNavigation/HeaderNavigation.tsx"
import { COOKIE_KEY_THEME } from "../../constants/COOKIE_KEYS/COOKIE_KEYS.ts"
import { FONT_VARIABLES } from "../../constants/FONT_VARIABLES/FONT_VARIABLES.ts"
import { routing } from "../../i18n/constants/routing/routing.ts"
import { getThemeFromCookie } from "../../utilities/getThemeFromCookie/getThemeFromCookie.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import "./reset.css"
import "./global.css"

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

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const cookieObject = await cookies()
  const theme = getThemeFromCookie(cookieObject.get(COOKIE_KEY_THEME))
  const headerTranslate = await getTranslations("header")
  const headerInnerElement = (
    <HeaderInner
      navigationElement={
        <HeaderNavigation
          changeLogText={headerTranslate("navigation.changeLog")}
          packageText={headerTranslate("navigation.package")}
        />
      }
      toolElement={
        <HeaderTool
          darkThemeText={headerTranslate("theme.dark")}
          languageLegendText={headerTranslate("language")}
          lightThemeText={headerTranslate("theme.light")}
          systemThemeText={headerTranslate("theme.system")}
          theme={theme}
          themeLegendText={headerTranslate("theme.legend")}
        />
      }
    />
  )

  return (
    <html className={FONT_VARIABLES.join(" ")} data-theme={theme} lang={locale}>
      <body>
        <NextIntlClientProvider>
          <RootLayout headerInnerElement={headerInnerElement}>{children}</RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
