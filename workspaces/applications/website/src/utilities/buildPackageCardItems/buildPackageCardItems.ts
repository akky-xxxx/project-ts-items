import { renderLineBreak } from "../renderLineBreak/renderLineBreak.tsx"

import type { PackageCardList } from "../../components/layout/PackageCardList/PackageCardList.tsx"
import type { PackageCard } from "../../components/ui/PackageCard/PackageCard.tsx"
import type { createTranslator, Messages } from "next-intl"
import type { ComponentProps } from "react"

type Translators = {
  packageCardTranslate: ReturnType<typeof createTranslator<Messages, "components.ui.packageCard">>
  packageTranslate: ReturnType<typeof createTranslator<Messages, "packages">>
}

type HeadingTag = ComponentProps<typeof PackageCard>["headingTag"]

/**
 * @description
 * パッケージ一覧に表示する PackageCard の props を、translator から組み立てる
 * @param headingTag - 各カードのパッケージ名に使う見出しの種類(表示するページの見出し構造に合わせる)
 */
export const buildPackageCardItems = (
  translators: Translators,
  headingTag: HeadingTag,
): ComponentProps<typeof PackageCardList>["packages"] => {
  const { packageCardTranslate, packageTranslate } = translators
  const linkText = packageCardTranslate("linkText")

  return [
    {
      descriptionNode: packageTranslate.rich("oxlintConfig.description", { br: renderLineBreak }),
      headingTag,
      innerLinkHref: "/packages/oxlint-config",
      linkText,
      packageNameText: "@ts-items/oxlint-config",
      versionText: "v1.0.0", // TODO: api で取得した値に置き換える
    },
    {
      descriptionNode: packageTranslate.rich("oxfmtConfig.description", { br: renderLineBreak }),
      headingTag,
      innerLinkHref: "/packages/oxfmt-config",
      linkText,
      packageNameText: "@ts-items/oxfmt-config",
      versionText: "v1.0.0", // TODO: api で取得した値に置き換える
    },
  ]
}
