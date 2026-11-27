import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { DocsPageLayout } from "../../../../../components/layout/DocsPageLayout/DocsPageLayout.tsx"
import { OxfmtConfigQuickstart } from "../../../../../components/page/OxfmtConfigQuickstart/OxfmtConfigQuickstart.tsx"
import { Toc } from "../../../../../components/ui/Toc/Toc.tsx"
import { PACKAGE_MASTER } from "../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ComponentProps, ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxfmt-config/quickstart">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    description: pagesTranslate("oxfmtConfigQuickstart.pageDescription"),
    title: `${pagesTranslate("oxfmtConfigQuickstart.pageTitle")} | ${PACKAGE_MASTER["oxfmt-config"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")
  const items = [
    {
      anchor: "#quickstart",
      text: pagesTranslate("oxfmtConfigQuickstart.pageTitle"),
    },
    {
      anchor: "#installation",
      text: pagesTranslate("oxfmtConfigQuickstart.installTitle"),
    },
    {
      anchor: "#setup",
      text: pagesTranslate("oxfmtConfigQuickstart.setupTitle"),
    },
  ] satisfies ComponentProps<typeof Toc>["items"]

  return (
    <DocsPageLayout tocElement={<Toc items={items} />}>
      <OxfmtConfigQuickstart
        breadcrumbItems={[
          {
            href: "/packages/",
            text: pagesTranslate("packages.pageTitle"),
          },
          {
            href: `/packages/${PACKAGE_MASTER["oxfmt-config"].name}/`,
            text: PACKAGE_MASTER["oxfmt-config"].name,
          },
        ]}
      />
    </DocsPageLayout>
  )
}

export default Page
