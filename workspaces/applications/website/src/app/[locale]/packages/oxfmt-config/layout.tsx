import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { PackageSwitcher } from "../../../../clientComponents/feature/PackageSwitcher/PackageSwitcher.tsx"
import { DocsLayout } from "../../../../components/layout/DocsLayout/DocsLayout.tsx"
import { DocsSidebar } from "../../../../components/layout/DocsSidebar/DocsSidebar.tsx"
import { DocsNavigationUl } from "../../../../components/ui/DocsNavigationUl/DocsNavigationUl.tsx"
import { PACKAGE_NAMES } from "../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"

import type { ReactNode } from "react"

type Props = LayoutProps<"/[locale]">

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

const Layout = async (props: Props): Promise<ReactNode> => {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return (
    <DocsLayout
      docsSidebarElement={
        <DocsSidebar
          npmHref="https://www.npmjs.com/package/@ts-items/oxfmt-config"
          packagesSelectorElement={<PackageSwitcher />}
          docsNavigationUlElement={
            <DocsNavigationUl
              currentPathname="" // TODO: layout.tsx, server component から取得できないので代替策を検討する
              items={[
                {
                  href: `/packages/${PACKAGE_NAMES.oxfmtConfig}/`,
                  text: pagesTranslate("oxfmtConfigHome.pageTitle"),
                },
                {
                  href: `/packages/${PACKAGE_NAMES.oxfmtConfig}/quickstart/`,
                  text: pagesTranslate("oxfmtConfigQuickstart.pageTitle"),
                },
              ]}
            />
          }
          versionText="v1.0.0"
        />
      }
    >
      {children}
    </DocsLayout>
  )
}

export default Layout
