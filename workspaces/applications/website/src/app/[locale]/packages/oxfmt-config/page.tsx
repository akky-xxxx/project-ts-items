import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxfmtConfigHome } from "../../../../components/page/OxfmtConfigHome/OxfmtConfigHome.tsx"
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
  const packagesPageTranslate = await getTranslations("pages.packages")

  return (
    <OxfmtConfigHome
      breadcrumbItems={[
        {
          href: "/packages/",
          text: packagesPageTranslate("pageTitle"),
        },
      ]}
    />
  )
}

export default Page
