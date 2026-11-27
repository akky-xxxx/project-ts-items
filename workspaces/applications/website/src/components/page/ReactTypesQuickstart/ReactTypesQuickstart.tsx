import { Fragment } from "react"

import { Tab } from "../../../clientComponents/feature/Tab/Tab.tsx"
import { COPY_ICON_ELEMENT } from "../../../constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { renderCodeElement } from "../../../utilities/renderCodeElement/renderCodeElement.tsx"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { TypeRecord } from "./components/TypeRecord/TypeRecord.tsx"
import { INSTALL_TAB_ITEMS } from "./constants/INSTALL_TAB_ITEMS/INSTALL_TAB_ITEMS.tsx"
import { useReactTypesQuickstart } from "./useReactTypesQuickstart.ts"

import type { ComponentProps, FC } from "react"

import styles from "./reactTypesQuickstart.module.css"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const ReactTypesQuickstart: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const { pageTitleText, pagesTranslate, types } = useReactTypesQuickstart()

  return (
    <Fragment>
      <Breadcrumb currentPageText={pageTitleText} items={breadcrumbItems} />

      <Heading1Wrapper>
        <Heading headingTag="h1" id="quickstart">
          {pageTitleText}
        </Heading>
      </Heading1Wrapper>

      <p>{pagesTranslate.rich("reactTypesQuickstart.pageDescription", { br: renderLineBreak })}</p>

      <Section>
        <Heading headingTag="h2" id="installation">
          {pagesTranslate("reactTypesQuickstart.installTitle")}
        </Heading>

        <p>
          {pagesTranslate.rich("reactTypesQuickstart.installNote", { code: renderCodeElement })}
        </p>

        <div className={styles.tabWrapper}>
          <Tab copyIconElement={COPY_ICON_ELEMENT} items={INSTALL_TAB_ITEMS} title="Terminal" />
        </div>
      </Section>

      <Section>
        <Heading headingTag="h2" id="usage">
          {pagesTranslate("reactTypesQuickstart.usageTitle")}
        </Heading>

        {types.map((typeRecord) => (
          <TypeRecord key={typeRecord.typeName} {...typeRecord} />
        ))}
      </Section>
    </Fragment>
  )
}
