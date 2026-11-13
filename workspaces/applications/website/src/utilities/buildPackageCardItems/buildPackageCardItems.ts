import { renderLineBreak } from "../renderLineBreak/renderLineBreak.tsx"

import type { PackageCardList } from "../../components/layout/PackageCardList/PackageCardList.tsx"
import type { createTranslator, Messages } from "next-intl"
import type { ComponentProps } from "react"

type Translators = {
  packageCardTranslate: ReturnType<typeof createTranslator<Messages, "components.ui.packageCard">>
  packageTranslate: ReturnType<typeof createTranslator<Messages, "packages">>
}

/**
 * @description
 * パッケージ一覧ページに表示する PackageCard の props を、translator から組み立てる
 */
export const buildPackageCardItems = (
  translators: Translators,
): ComponentProps<typeof PackageCardList>["packages"] => {
  const { packageCardTranslate, packageTranslate } = translators
  const linkText = packageCardTranslate("linkText")

  return [
    {
      descriptionNode: packageTranslate.rich("oxlintConfig.description", { br: renderLineBreak }),
      headingTag: "h2",
      innerLinkHref: "/packages/oxlint-config",
      linkText,
      packageNameText: "@ts-items/oxlint-config",
      versionText: "v1.0.0", // TODO: api で取得した値に置き換える
    },
    {
      descriptionNode: packageTranslate.rich("oxfmtConfig.description", { br: renderLineBreak }),
      headingTag: "h2",
      innerLinkHref: "/packages/oxfmt-config",
      linkText,
      packageNameText: "@ts-items/oxfmt-config",
      versionText: "v1.0.0", // TODO: api で取得した値に置き換える
    },
  ]
}
