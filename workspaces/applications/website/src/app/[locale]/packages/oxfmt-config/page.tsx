import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { DocsPageLayout } from "../../../../components/layout/DocsPageLayout/DocsPageLayout.tsx"
import { OxfmtConfigHome } from "../../../../components/page/OxfmtConfigHome/OxfmtConfigHome.tsx"
import { Toc } from "../../../../components/ui/Toc/Toc.tsx"
import { PACKAGE_MASTER } from "../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ComponentProps, ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxfmt-config">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    description: pagesTranslate("oxfmtConfigHome.pageDescription"),
    title: `${pagesTranslate("oxfmtConfigHome.pageTitle")} | ${PACKAGE_MASTER["oxfmt-config"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")
  const packageName = PACKAGE_MASTER["oxfmt-config"].name
  const items = [
    {
      anchor: `#${packageName}`,
      text: packageName,
    },
    {
      anchor: "#introduction",
      text: pagesTranslate("oxfmtConfigHome.pageTitle"),
    },
    {
      anchor: "#overview",
      text: pagesTranslate("oxfmtConfigHome.backgroundTitle"),
    },
  ] satisfies ComponentProps<typeof Toc>["items"]

  return (
    <DocsPageLayout tocElement={<Toc items={items} />}>
      <OxfmtConfigHome
        breadcrumbItems={[
          {
            href: "/packages/",
            text: pagesTranslate("packages.pageTitle"),
          },
        ]}
      />
    </DocsPageLayout>
  )
}

export default Page
