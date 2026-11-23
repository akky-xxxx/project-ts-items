import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { Tab } from "../../../clientComponents/feature/Tab/Tab.tsx"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { getCodeBlockMap } from "./clientComponents/feature/OxlintConfigSetup/modules/getCodeBlockMap/getCodeBlockMap.tsx"
import { OxlintConfigSetup } from "./clientComponents/feature/OxlintConfigSetup/OxlintConfigSetup.tsx"
import { COPY_ICON_ELEMENT } from "./constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { INSTALL_TAB_ITEMS } from "./constants/INSTALL_TAB_ITEMS/INSTALL_TAB_ITEMS.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./oxlintConfigHomeQuickstart.module.css"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

const CODE_BLOCK_MAP = getCodeBlockMap()

export const OxlintConfigHomeQuickstart: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const oxlintConfigQuickstartTranslate = useTranslations("pages.oxlintConfigQuickstart")
  const pageTitleText = oxlintConfigQuickstartTranslate("pageTitle")

  return (
    <Fragment>
      <Breadcrumb currentPageText={pageTitleText} items={breadcrumbItems} />

      <Heading1Wrapper>
        <Heading headingTag="h1">{pageTitleText}</Heading>
      </Heading1Wrapper>

      <p>{oxlintConfigQuickstartTranslate.rich("pageDescription", { br: renderLineBreak })}</p>

      <Section>
        <Heading headingTag="h2">{oxlintConfigQuickstartTranslate("installTitle")}</Heading>

        <div className={styles.tabWrapper}>
          <Tab copyIconElement={COPY_ICON_ELEMENT} items={INSTALL_TAB_ITEMS} title="Terminal" />
        </div>
      </Section>

      <Section>
        <Heading headingTag="h2">{oxlintConfigQuickstartTranslate("setupTitle")}</Heading>

        <div className={styles.oxlintConfigSetupWrapper}>
          <OxlintConfigSetup codeBlockMap={CODE_BLOCK_MAP} />
        </div>
      </Section>
    </Fragment>
  )
}
