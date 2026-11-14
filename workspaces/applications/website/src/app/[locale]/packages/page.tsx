import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Packages } from "../../../components/page/Packages/Packages.tsx"
import { routing } from "../../../i18n/constants/routing/routing.ts"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.packages" })

  return {
    description: translate("pageDescription"),
    title: translate("pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const [pageTranslate, packageTranslate, breadcrumbTranslate, packageCardTranslate] =
    await Promise.all([
      getTranslations("pages.packages"),
      getTranslations("packages"),
      getTranslations("components.ui.breadcrumb"),
      getTranslations("components.ui.packageCard"),
    ])
  const pageTitleText = pageTranslate("pageTitle")

  return (
    <Packages
      breadcrumbItems={[
        {
          text: pageTitleText,
        },
      ]}
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      packages={buildPackageCardItems({ packageCardTranslate, packageTranslate })}
      pageDescriptionText={pageTranslate("pageDescription")}
      pageTitleText={pageTitleText}
    />
  )
}

export default Page
