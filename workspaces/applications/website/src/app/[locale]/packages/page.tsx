import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Packages } from "../../../components/page/Packages/Packages.tsx"
import { routing } from "../../../i18n/constants/routing/routing.ts"

import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = PageProps<"/[locale]/packages">

const renderLineBreak = () => <br />

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
  const [pageTranslate, packageTranslate, packageCardTranslate] = await Promise.all([
    getTranslations("pages.packages"),
    getTranslations("packages"),
    getTranslations("components.ui.packageCard"),
  ])

  return (
    <Packages
      packages={[
        {
          descriptionNode: packageTranslate.rich("oxlintConfig.description", {
            br: renderLineBreak,
          }),
          headingTag: "h2",
          innerLinkHref: "/packages/oxlint-config",
          linkText: packageCardTranslate("linkText"),
          packageNameText: "@ts-items/oxlint-config",
          versionText: "v1.0.0", // TODO: api で取得した値に置き換える
        },
        {
          descriptionNode: packageTranslate.rich("oxfmtConfig.description", {
            br: renderLineBreak,
          }),
          headingTag: "h2",
          innerLinkHref: "/packages/oxfmt-config",
          linkText: packageCardTranslate("linkText"),
          packageNameText: "@ts-items/oxfmt-config",
          versionText: "v1.0.0", // TODO: api で取得した値に置き換える
        },
      ]}
      pageDescriptionText={pageTranslate("pageDescription")}
      pageTitleText={pageTranslate("pageTitle")}
    />
  )
}

export default Page
