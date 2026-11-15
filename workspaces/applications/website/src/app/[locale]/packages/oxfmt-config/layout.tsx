import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { PackageSwitcher } from "../../../../clientComponents/feature/PackageSwitcher/PackageSwitcher.tsx"
import { DocsLayout } from "../../../../components/layout/DocsLayout/DocsLayout.tsx"
import { DocsSidebar } from "../../../../components/layout/DocsSidebar/DocsSidebar.tsx"
import { DocsNavigationUl } from "../../../../components/ui/DocsNavigationUl/DocsNavigationUl.tsx"
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
  const docsLayoutTranslate = await getTranslations({ locale, namespace: "docsLayout" })

  return (
    <DocsLayout
      // TODO: 値は仮
      docsSidebarElement={
        <DocsSidebar
          latestText={docsLayoutTranslate("latest")}
          newTabText="|"
          navigationLabelText=""
          npmHref="https://example.com"
          packagesSelectorElement={<PackageSwitcher />}
          docsNavigationUlElement={<DocsNavigationUl currentPathname="" items={[]} />}
          serviceNameText=""
          versionText="v1.0.0"
        />
      }
    >
      {children}
    </DocsLayout>
  )
}

export default Layout
