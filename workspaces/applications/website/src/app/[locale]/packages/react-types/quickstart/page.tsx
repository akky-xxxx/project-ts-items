import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { ReactTypesQuickstart } from "../../../../../components/page/ReactTypesQuickstart/ReactTypesQuickstart.tsx"
import { PACKAGE_MASTER } from "../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/react-types/quickstart">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    description: pagesTranslate("reactTypesQuickstart.pageDescription"),
    title: `${pagesTranslate("reactTypesQuickstart.pageTitle")} | ${PACKAGE_MASTER["react-types"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")

  return (
    <ReactTypesQuickstart
      breadcrumbItems={[
        {
          href: "/packages/",
          text: pagesTranslate("packages.pageTitle"),
        },
        {
          href: `/packages/${PACKAGE_MASTER["react-types"].name}/`,
          text: PACKAGE_MASTER["react-types"].name,
        },
      ]}
    />
  )
}

export default Page
