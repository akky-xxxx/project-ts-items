import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { DocsPageLayout } from "../../../../../components/layout/DocsPageLayout/DocsPageLayout.tsx"
import { OxlintConfigQuickstart } from "../../../../../components/page/OxlintConfigQuickstart/OxlintConfigQuickstart.tsx"
import { Toc } from "../../../../../components/ui/Toc/Toc.tsx"
import { PACKAGE_MASTER } from "../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ComponentProps, ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxlint-config/quickstart">

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    // 説明文の meta タグは改行できないため、<br> を半角スペースに置き換える
    description: pagesTranslate.markup("oxlintConfigQuickstart.pageDescription", { br: () => " " }),
    title: `${pagesTranslate("oxlintConfigQuickstart.pageTitle")} | ${PACKAGE_MASTER["oxlint-config"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")
  const items = [
    {
      anchor: "#quickstart",
      text: pagesTranslate("oxlintConfigQuickstart.pageTitle"),
    },
    {
      anchor: "#installation",
      text: pagesTranslate("oxlintConfigQuickstart.installTitle"),
    },
    {
      anchor: "#setup",
      text: pagesTranslate("oxlintConfigQuickstart.setupTitle"),
    },
  ] satisfies ComponentProps<typeof Toc>["items"]

  return (
    <DocsPageLayout tocElement={<Toc items={items} />}>
      <OxlintConfigQuickstart
        breadcrumbItems={[
          {
            href: "/packages/",
            text: pagesTranslate("packages.pageTitle"),
          },
          {
            href: `/packages/${PACKAGE_MASTER["oxlint-config"].name}/`,
            text: PACKAGE_MASTER["oxlint-config"].name,
          },
        ]}
      />
    </DocsPageLayout>
  )
}

export default Page
