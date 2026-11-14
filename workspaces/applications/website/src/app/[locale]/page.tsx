import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Home } from "../../components/page/Home/Home.tsx"
import { routing } from "../../i18n/constants/routing/routing.ts"
import { buildPackageCardItems } from "../../utilities/buildPackageCardItems/buildPackageCardItems.ts"
import { renderLineBreak } from "../../utilities/renderLineBreak/renderLineBreak.tsx"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.home" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: translate.markup("pageDescription", { br: () => " " }),
    title: translate("pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const [pageTranslate, packageTranslate, breadcrumbTranslate, packageCardTranslate] =
    await Promise.all([
      getTranslations("pages.home"),
      getTranslations("packages"),
      getTranslations("components.ui.breadcrumb"),
      getTranslations("components.ui.packageCard"),
    ])
  const pageTitleText = pageTranslate("pageTitle")

  return (
    <Home
      breadcrumbLabelText={breadcrumbTranslate("labelText")}
      packageTitleText={pageTranslate("packageTitleText")}
      packages={buildPackageCardItems({ packageCardTranslate, packageTranslate }, "h3")}
      pageDescriptionText={pageTranslate.rich("pageDescription", { br: renderLineBreak })}
      pageTitleText={pageTitleText}
    />
  )
}

export default Page
