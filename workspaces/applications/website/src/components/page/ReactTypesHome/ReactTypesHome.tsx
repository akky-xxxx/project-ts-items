import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { PACKAGE_MASTER } from "../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { TYPES_ICON_ELEMENT } from "./constants/TYPES_ICON_ELEMENT/TYPES_ICON_ELEMENT.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const ReactTypesHome: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const pagesTranslate = useTranslations("pages")

  return (
    <Fragment>
      <Breadcrumb currentPageText={PACKAGE_MASTER["react-types"].name} items={breadcrumbItems} />

      <Heading1Wrapper iconNode={TYPES_ICON_ELEMENT}>
        <Heading headingTag="h1" id={PACKAGE_MASTER["react-types"].name}>
          {PROJECT_NAME}/{PACKAGE_MASTER["react-types"].name}
        </Heading>
      </Heading1Wrapper>

      <Section>
        <Heading headingTag="h2" id="introduction">
          {pagesTranslate("reactTypesHome.pageTitle")}
        </Heading>

        <p>{pagesTranslate.rich("reactTypesHome.pageDescription", { br: renderLineBreak })}</p>
      </Section>

      <Section>
        <Heading headingTag="h2" id="overview">
          {pagesTranslate("reactTypesHome.backgroundTitle")}
        </Heading>

        <p>
          {pagesTranslate.rich("reactTypesHome.backgroundDescription", { br: renderLineBreak })}
        </p>
      </Section>
    </Fragment>
  )
}
