import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { ReactTypesHome } from "../../../../components/page/ReactTypesHome/ReactTypesHome.tsx"
import { PACKAGE_MASTER } from "../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/react-types">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: pagesTranslate.markup("reactTypesHome.pageDescription", { br: () => " " }),
    title: `${pagesTranslate("reactTypesHome.pageTitle")} | ${PACKAGE_MASTER["react-types"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")

  return (
    <ReactTypesHome
      breadcrumbItems={[
        {
          href: "/packages/",
          text: pagesTranslate("packages.pageTitle"),
        },
      ]}
    />
  )
}

export default Page
