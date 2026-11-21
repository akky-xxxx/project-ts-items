import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { PackageSwitcher } from "../../../../clientComponents/feature/PackageSwitcher/PackageSwitcher.tsx"
import { DocsLayout } from "../../../../components/layout/DocsLayout/DocsLayout.tsx"
import { DocsSidebar } from "../../../../components/layout/DocsSidebar/DocsSidebar.tsx"
import { DocsNavigationUl } from "../../../../components/ui/DocsNavigationUl/DocsNavigationUl.tsx"
import { PACKAGE_MASTER } from "../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"
import { getPackageVersion } from "../../../../utilities/getPackageVersion/getPackageVersion.ts"

import type { ReactNode } from "react"

type Props = LayoutProps<"/[locale]">

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

const Layout = async (props: Props): Promise<ReactNode> => {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const [pagesTranslate, versionText] = await Promise.all([
    getTranslations({ locale, namespace: "pages" }),
    getPackageVersion("oxlint-config"),
  ])

  return (
    <DocsLayout
      docsSidebarElement={
        <DocsSidebar
          npmHref="https://www.npmjs.com/package/@ts-items/oxlint-config"
          packagesSelectorElement={<PackageSwitcher />}
          docsNavigationUlElement={
            <DocsNavigationUl
              currentPathname="" // TODO: layout.tsx, server component から取得できないので代替策を検討する
              items={[
                {
                  href: `/packages/${PACKAGE_MASTER.oxlintConfig.name}/`,
                  text: pagesTranslate("oxlintConfigHome.pageTitle"),
                },
                {
                  href: `/packages/${PACKAGE_MASTER.oxlintConfig.name}/quickstart/`,
                  text: pagesTranslate("oxlintConfigQuickstart.pageTitle"),
                },
              ]}
            />
          }
          versionText={versionText}
        />
      }
    >
      {children}
    </DocsLayout>
  )
}

export default Layout
