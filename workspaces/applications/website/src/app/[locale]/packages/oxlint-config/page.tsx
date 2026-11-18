import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { OxlintConfigHome } from "../../../../components/page/OxlintConfigHome/OxlintConfigHome.tsx"
import { routing } from "../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"
import {getPublishUrl, getsearch} from "../../../../generated/npmRegistry/npmRegistry.ts"
import {fetch} from "next/dist/compiled/@edge-runtime/primitives"

type Props = PageProps<"/[locale]/packages/oxlint-config">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const translate = await getTranslations({ locale, namespace: "pages.oxlintConfigHome" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: translate.markup("pageDescription", { br: () => " " }),
    title: translate("pageTitle"),
  }
}

const Page = async (): Promise<ReactNode> => {
  const packagesPageTranslate = await getTranslations("pages.packages")
  const result = await fetch("https://registry.npmjs.org/@ts-items/oxlint-config/latest").then((response) => response.json())
  console.log(result?.version)

  return (
    <OxlintConfigHome
      breadcrumbItems={[
        {
          href: "/packages/",
          text: packagesPageTranslate("pageTitle"),
        },
      ]}
    />
  )
}

export default Page
