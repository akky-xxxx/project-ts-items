import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxlintConfigHomeQuickstart } from "../../../../../components/page/OxlintConfigHomeQuickstart/OxlintConfigHomeQuickstart.tsx"
import { PACKAGE_NAMES } from "../../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxlint-config/quickstart">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.oxlintConfigQuickstart" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: translate.markup("pageDescription", { br: () => " " }),
    title: `${translate("pageTitle")} | ${PACKAGE_NAMES.oxlintConfig}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const packagesPageTranslate = await getTranslations("pages.packages")

  return (
    <OxlintConfigHomeQuickstart
      breadcrumbItems={[
        {
          href: "/packages/",
          text: packagesPageTranslate("pageTitle"),
        },
        {
          href: `/packages/${PACKAGE_NAMES.oxlintConfig}/`,
          text: PACKAGE_NAMES.oxlintConfig,
        },
      ]}
    />
  )
}

export default Page
