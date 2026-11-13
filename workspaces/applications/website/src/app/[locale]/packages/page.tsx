import { getTranslations } from "next-intl/server"

import { Packages } from "../../../components/page/Packages/Packages.tsx"

import type { ReactNode } from "react"

const renderLineBreak = () => <br />

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
