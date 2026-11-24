import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxlintConfigHome } from "../../../../components/page/OxlintConfigHome/OxlintConfigHome.tsx"
import { PACKAGE_MASTER } from "../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxlint-config">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: pagesTranslate.markup("oxlintConfigHome.pageDescription", { br: () => " " }),
    title: `${pagesTranslate("oxlintConfigHome.pageTitle")} | ${PACKAGE_MASTER["oxlint-config"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")

  return (
    <OxlintConfigHome
      breadcrumbItems={[
        {
          href: "/packages/",
          text: pagesTranslate("packages.pageTitle"),
        },
      ]}
    />
  )
}

export default Page
