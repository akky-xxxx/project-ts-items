import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxfmtConfigHomeQuickstart } from "../../../../../components/page/OxfmtConfigHomeQuickstart/OxfmtConfigHomeQuickstart.tsx"
import { PACKAGE_NAMES } from "../../../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxfmt-config/quickstart">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.oxfmtConfigQuickstart" })

  return {
    description: translate("pageDescription"),
    title: translate("pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const [pageTranslate, packagesPageTranslate, uiTranslate] = await Promise.all([
    getTranslations("pages.oxfmtConfigQuickstart"),
    getTranslations("pages.packages"),
    getTranslations("components.ui"),
  ])

  return (
    <OxfmtConfigHomeQuickstart
      breadcrumbItems={[
        {
          href: "/packages/",
          text: packagesPageTranslate("pageTitle"),
        },
        {
          href: `/packages/${PACKAGE_NAMES.oxfmtConfig}/`,
          text: PACKAGE_NAMES.oxfmtConfig,
        },
        {
          text: pageTranslate("pageTitle"),
        },
      ]}
      breadcrumbLabelText={uiTranslate("breadcrumb.labelText")}
      copiedText={uiTranslate("tab.copiedText")}
      copyButtonLabelText={uiTranslate("tab.copyButtonLabelText")}
      installTitleText={pageTranslate("installTitle")}
      pageDescriptionText={pageTranslate("pageDescription")}
      pageTitle={pageTranslate("pageTitle")}
      setupTitleText={pageTranslate("setupTitle")}
    />
  )
}

export default Page
