import { PACKAGE_MASTER } from "../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { renderLineBreak } from "../renderLineBreak/renderLineBreak.tsx"
import { FORMAT_ICON_ELEMENT } from "./constants/FORMAT_ICON_ELEMENT/FORMAT_ICON_ELEMENT.tsx"
import { LINT_ICON_ELEMENT } from "./constants/LINT_ICON_ELEMENT/LINT_ICON_ELEMENT.tsx"

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
): ComponentProps<typeof PackageCardList>["packages"] => [
  {
    descriptionNode: packageTranslate.rich("oxlint-config.description", { br: renderLineBreak }),
    headingTag,
    innerLinkHref: `/packages/${PACKAGE_MASTER.oxlintConfig.name}/`,
    packageLogoNode: LINT_ICON_ELEMENT,
    packageNameText: `${PROJECT_NAME}/${PACKAGE_MASTER.oxlintConfig.name}`,
    versionText: "v1.0.0", // TODO: api で取得した値に置き換える
  },
  {
    descriptionNode: packageTranslate.rich("oxfmt-config.description", { br: renderLineBreak }),
    headingTag,
    innerLinkHref: `/packages/${PACKAGE_MASTER.oxfmtConfig.name}/`,
    packageLogoNode: FORMAT_ICON_ELEMENT,
    packageNameText: `${PROJECT_NAME}/${PACKAGE_MASTER.oxfmtConfig.name}`,
    versionText: "v1.0.0", // TODO: api で取得した値に置き換える
  },
]
