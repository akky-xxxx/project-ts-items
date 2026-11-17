import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxfmtConfigHome } from "../../../../components/page/OxfmtConfigHome/OxfmtConfigHome.tsx"
import { PACKAGE_NAMES } from "../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxfmt-config">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.oxfmtConfigHome" })

  return {
    description: translate("pageDescription"),
    title: translate("pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const [pageTranslate, packagesPageTranslate] = await Promise.all([
    getTranslations("pages.oxfmtConfigHome"),
    getTranslations("pages.packages"),
  ])

  return (
    <OxfmtConfigHome
      backgroundDescriptionText={pageTranslate("backgroundDescription")}
      backgroundTitleText={pageTranslate("backgroundTitle")}
      breadcrumbItems={[
        {
          href: "/packages/",
          text: packagesPageTranslate("pageTitle"),
        },
        {
          text: PACKAGE_NAMES.oxfmtConfig,
        },
      ]}
      pageDescriptionText={pageTranslate("pageDescription")}
      pageTitle={pageTranslate("pageTitle")}
    />
  )
}

export default Page
