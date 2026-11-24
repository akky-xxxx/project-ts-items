import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { PACKAGE_MASTER } from "../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { LINT_ICON_ELEMENT } from "./constants/LINT_ICON_ELEMENT/LINT_ICON_ELEMENT.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const OxlintConfigHome: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const pagesTranslate = useTranslations("pages")

  return (
    <Fragment>
      <Breadcrumb currentPageText={PACKAGE_MASTER.oxlintConfig.name} items={breadcrumbItems} />

      <Heading1Wrapper iconNode={LINT_ICON_ELEMENT}>
        <Heading headingTag="h1">
          {PROJECT_NAME}/{PACKAGE_MASTER.oxlintConfig.name}
        </Heading>
      </Heading1Wrapper>

      <Section>
        <Heading headingTag="h2">{pagesTranslate("oxlintConfigHome.pageTitle")}</Heading>

        <p>{pagesTranslate.rich("oxlintConfigHome.pageDescription", { br: renderLineBreak })}</p>
      </Section>

      <Section>
        <Heading headingTag="h2">{pagesTranslate("oxlintConfigHome.backgroundTitle")}</Heading>

        <p>{pagesTranslate.rich("oxlintConfigHome.backgroundDescription", { br: renderLineBreak })}</p>
      </Section>
    </Fragment>
  )
}
