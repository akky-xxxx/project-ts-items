import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxlintConfigQuickstart } from "../../../../../components/page/OxlintConfigQuickstart/OxlintConfigQuickstart.tsx"
import { PACKAGE_MASTER } from "../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxlint-config/quickstart">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: pagesTranslate.markup("oxlintConfigQuickstart.pageDescription", { br: () => " " }),
    title: `${pagesTranslate("oxlintConfigQuickstart.pageTitle")} | ${PACKAGE_MASTER["oxlint-config"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")

  return (
    <OxlintConfigQuickstart
      breadcrumbItems={[
        {
          href: "/packages/",
          text: pagesTranslate("packages.pageTitle"),
        },
        {
          href: `/packages/${PACKAGE_MASTER["oxlint-config"].name}/`,
          text: PACKAGE_MASTER["oxlint-config"].name,
        },
      ]}
    />
  )
}

export default Page
