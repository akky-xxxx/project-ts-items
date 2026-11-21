import Image from "next/image"

import { PROJECT_NAME } from "../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { SORTED_PACKAGES_AS_DISPLAY_ORDER } from "../../constants/SORTED_PACKAGES_AS_DISPLAY_ORDER/SORTED_PACKAGES_AS_DISPLAY_ORDER.ts"
import { renderLineBreak } from "../renderLineBreak/renderLineBreak.tsx"

import type { PackageCardList } from "../../components/layout/PackageCardList/PackageCardList.tsx"
import type { PackageCard } from "../../components/ui/PackageCard/PackageCard.tsx"
import type { createTranslator, Messages } from "next-intl"
import type { ComponentProps } from "react"

type HeadingTag = ComponentProps<typeof PackageCard>["headingTag"]

/**
 * @description
 * パッケージ一覧に表示する PackageCard の props を、translator から組み立てる
 * @param headingTag - 各カードのパッケージ名に使う見出しの種類(表示するページの見出し構造に合わせる)
 */
export const buildPackageCardItems = (
  packageTranslate: ReturnType<typeof createTranslator<Messages, "packages">>,
  headingTag: HeadingTag,
): ComponentProps<typeof PackageCardList>["packages"] =>
  SORTED_PACKAGES_AS_DISPLAY_ORDER.map((packageData) => {
    const { description, logoImagePath, name, versionText } = packageData

    return {
      descriptionNode: packageTranslate.rich(description, { br: renderLineBreak }),
      headingTag,
      innerLinkHref: `/packages/${name}/`,
      packageLogoNode: <Image alt="" height="30" src={logoImagePath} width="30" />,
      packageNameText: `${PROJECT_NAME}/${name}`,
      versionText,
    }
  })
