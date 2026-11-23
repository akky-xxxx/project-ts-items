import Image from "next/image"

import { PROJECT_NAME } from "../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { SORTED_PACKAGES_AS_DISPLAY_ORDER } from "../../constants/SORTED_PACKAGES_AS_DISPLAY_ORDER/SORTED_PACKAGES_AS_DISPLAY_ORDER.ts"
import { renderLineBreak } from "../renderLineBreak/renderLineBreak.tsx"

import type { PackageCardList } from "../../components/layout/PackageCardList/PackageCardList.tsx"
import type { PackageCard } from "../../components/ui/PackageCard/PackageCard.tsx"
import type { createTranslator, Messages } from "next-intl"
import type { ComponentProps } from "react"

type Input = {
  headingTag: ComponentProps<typeof PackageCard>["headingTag"]
  packageTranslate: ReturnType<typeof createTranslator<Messages, "packages">>
  versionTexts: Record<(typeof SORTED_PACKAGES_AS_DISPLAY_ORDER)[number]["name"], string>
}
type Output = ComponentProps<typeof PackageCardList>["packages"]
type BuildPackageCardItems = (input: Input) => Output

/**
 * @description
 * パッケージ一覧に表示する PackageCard の props を、translator から組み立てる
 */
export const buildPackageCardItems: BuildPackageCardItems = (input) => {
  const { headingTag, packageTranslate, versionTexts } = input

  return SORTED_PACKAGES_AS_DISPLAY_ORDER.map((packageData) => {
    const { description, logoImagePath, name } = packageData

    return {
      descriptionNode: packageTranslate.rich(description, { br: renderLineBreak }),
      headingTag,
      innerLinkHref: `/packages/${name}/`,
      packageLogoNode: <Image alt="" height="30" src={logoImagePath} width="30" />,
      packageNameText: `${PROJECT_NAME}/${name}`,
      versionText: versionTexts[name],
    }
  })
}
