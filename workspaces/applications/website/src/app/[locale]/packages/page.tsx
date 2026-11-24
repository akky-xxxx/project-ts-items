import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Packages } from "../../../components/page/Packages/Packages.tsx"
import { routing } from "../../../i18n/constants/routing/routing.ts"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.tsx"
import { getPackageVersion } from "../../../utilities/getPackageVersion/getPackageVersion.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    description: pagesTranslate("packages.pageDescription"),
    title: pagesTranslate("packages.pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const [packageTranslate, oxfmtConfigVersion, oxlintConfigVersion] = await Promise.all([
    getTranslations("packages"),
    getPackageVersion("oxfmt-config"),
    getPackageVersion("oxlint-config"),
  ])

  return (
    <Packages
      packages={buildPackageCardItems({
        headingTag: "h2",
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
