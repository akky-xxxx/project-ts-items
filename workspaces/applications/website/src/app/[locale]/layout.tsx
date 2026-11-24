import { hasLocale, NextIntlClientProvider } from "next-intl"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { HeaderTool } from "../../clientComponents/feature/HeaderTool/HeaderTool.tsx"
import { MenuModalTool } from "../../clientComponents/feature/MenuModalTool/MenuModalTool.tsx"
import { HeaderMenuButton } from "../../components/feature/HeaderMenuButton/HeaderMenuButton.tsx"
import { MenuModalInner } from "../../components/layout/MenuModalInner/MenuModalInner.tsx"
import { RootLayout } from "../../components/layout/RootLayout/RootLayout.tsx"
import { HeaderInner } from "../../components/ui/HeaderInner/HeaderInner.tsx"
import { HeaderNavigation } from "../../components/ui/HeaderNavigation/HeaderNavigation.tsx"
import { MenuModalNavigation } from "../../components/ui/MenuModalNavigation/MenuModalNavigation.tsx"
import { COOKIE_KEY_THEME } from "../../constants/COOKIE_KEYS/COOKIE_KEYS.ts"
import { FONT_VARIABLES } from "../../constants/FONT_VARIABLES/FONT_VARIABLES.ts"
import { PROJECT_NAME } from "../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { routing } from "../../i18n/constants/routing/routing.ts"
import { getThemeFromCookie } from "../../utilities/getThemeFromCookie/getThemeFromCookie.ts"

import "./reset.css"
import "./global.css"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = LayoutProps<"/[locale]">

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return {
    icons: { icon: "/favicon.png" },
    title: {
      default: PROJECT_NAME,
      template: `%s | ${PROJECT_NAME}`,
    },
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
  const thisYear = new Date().getFullYear()
  const headerInnerElement = (
    <HeaderInner
      menuButtonElement={
        <HeaderMenuButton>
          <MenuModalInner
            navigationElement={<MenuModalNavigation />}
            toolElement={<MenuModalTool theme={theme} />}
          />
        </HeaderMenuButton>
      }
      navigationElement={<HeaderNavigation />}
      toolElement={<HeaderTool theme={theme} />}
    />
  )

  return (
    <html className={FONT_VARIABLES.join(" ")} data-theme={theme} lang={locale}>
      <body>
        <NextIntlClientProvider>
          <RootLayout headerInnerElement={headerInnerElement} thisYear={thisYear}>
            {children}
          </RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
