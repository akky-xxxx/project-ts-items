import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Packages } from "../../../components/page/Packages/Packages.tsx"
import { routing } from "../../../i18n/constants/routing/routing.ts"
import { buildPackageCardItems } from "../../../utilities/buildPackageCardItems/buildPackageCardItems.tsx"

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
  const packageTranslate = await getTranslations("packages")

  return (
    <Packages
      packages={buildPackageCardItems({
        headingTag: "h2",
        packageTranslate,
      })}
    />
  )
}

export default Page
