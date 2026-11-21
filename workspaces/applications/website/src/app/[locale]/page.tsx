import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Home } from "../../components/page/Home/Home.tsx"
import { routing } from "../../i18n/constants/routing/routing.ts"
import { buildPackageCardItems } from "../../utilities/buildPackageCardItems/buildPackageCardItems.tsx"
import { getPackageVersion } from "../../utilities/getPackageVersion/getPackageVersion.ts"

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
  const [packageTranslate, oxfmtConfigVersion, oxlintConfigVersion] = await Promise.all([
    getTranslations("packages"),
    getPackageVersion("oxfmt-config"),
    getPackageVersion("oxlint-config"),
  ])

  return (
    <Home
      packages={buildPackageCardItems({
        headingTag: "h3",
        packageTranslate,
        versionTexts: {
          "oxfmt-config": oxfmtConfigVersion,
          "oxlint-config": oxlintConfigVersion,
        },
      })}
    />
  )
}

export default Page
