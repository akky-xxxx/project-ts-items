import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxlintConfigHome } from "../../../../components/page/OxlintConfigHome/OxlintConfigHome.tsx"
import { PACKAGE_NAMES } from "../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"
import { renderLineBreak } from "../../../../utilities/renderLineBreak/renderLineBreak.tsx"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxlint-config">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.oxlintConfig" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: translate.markup("pageDescription", { br: () => " " }),
    title: translate("pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const [pageTranslate, packagesPageTranslate, breadcrumbTranslate] = await Promise.all([
    getTranslations("pages.oxlintConfig"),
    getTranslations("pages.packages"),
    getTranslations("components.ui.breadcrumb"),
  ])

  return (
    <OxlintConfigHome
      backgroundDescriptionText={pageTranslate.rich("backgroundDescription", {
        br: renderLineBreak,
      })}
      backgroundTitleText={pageTranslate("backgroundTitle")}
      breadcrumbItems={[
        {
          href: "/packages/",
          text: packagesPageTranslate("pageTitle"),
        },
        {
          text: PACKAGE_NAMES.oxlintConfig,
        },
      ]}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      pageDescriptionText={pageTranslate.rich("pageDescription", { br: renderLineBreak })}
      pageTitle={pageTranslate("pageTitle")}
    />
  )
}

export default Page
