import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { DocsPageLayout } from "../../../../../components/layout/DocsPageLayout/DocsPageLayout.tsx"
// TODO: 汎用的に使えるようにリネーム・移動する
import { CATEGORIES } from "../../../../../components/page/OxlintConfigBaseConfigRules/constants/CATEGORIES/CATEGORIES.ts"
// TODO: 汎用的に使えるようにリネーム・移動する
import { createBaseConfigRuleDetails } from "../../../../../components/page/OxlintConfigBaseConfigRules/modules/createBaseConfigRuleDetails/createBaseConfigRuleDetails.ts"
import { OxlintConfigBaseConfigRules } from "../../../../../components/page/OxlintConfigBaseConfigRules/OxlintConfigBaseConfigRules.tsx"
import { Toc } from "../../../../../components/ui/Toc/Toc.tsx"
import { PACKAGE_MASTER } from "../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { routing } from "../../../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ComponentProps, ReactNode } from "react"

type Props = PageProps<"/[locale]/packages/oxlint-config/base-config-rules">

const baseConfigRuleDetails = createBaseConfigRuleDetails()

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const pagesTranslate = await getTranslations({ locale, namespace: "pages" })

  return {
    title: `${pagesTranslate("oxlintConfigBaseConfigRules.pageTitle")} | ${PACKAGE_MASTER["oxlint-config"].name}`,
  }
}

const Page = async (): Promise<ReactNode> => {
  const pagesTranslate = await getTranslations("pages")
  const items = [
    {
      anchor: "#overall",
      text: pagesTranslate("oxlintConfigBaseConfigRules.pageTitle"),
    },
    {
      anchor: "#rules",
      text: pagesTranslate("oxlintConfigBaseConfigRules.rules"),
    },
    ...CATEGORIES.flatMap((category) => {
      const rules = baseConfigRuleDetails[category].map((rule) => {
        const { ruleName } = rule

        return {
          anchor: `#${ruleName}`,
          text: ruleName.replace(`${category}/`, ""),
        }
      })
      rules.unshift({
        anchor: `#${category}`,
        text: pagesTranslate("oxlintConfigBaseConfigRules.categoryHeading", { category }),
      })
      return rules
    }),
  ] satisfies ComponentProps<typeof Toc>["items"]

  return (
    <DocsPageLayout tocElement={<Toc items={items} />}>
      <OxlintConfigBaseConfigRules
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
