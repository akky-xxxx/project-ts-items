import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { PACKAGE_MASTER } from "../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { FORMAT_ICON_ELEMENT } from "./constants/FORMAT_ICON_ELEMENT/FORMAT_ICON_ELEMENT.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const OxfmtConfigHome: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const pagesTranslate = useTranslations("pages")

  return (
    <Fragment>
      <Breadcrumb currentPageText={PACKAGE_MASTER["oxfmt-config"].name} items={breadcrumbItems} />

      <Heading1Wrapper iconNode={FORMAT_ICON_ELEMENT}>
        <Heading headingTag="h1">
          {PROJECT_NAME}/{PACKAGE_MASTER["oxfmt-config"].name}
        </Heading>
      </Heading1Wrapper>

      <Section>
        <Heading headingTag="h2">{pagesTranslate("oxfmtConfigHome.pageTitle")}</Heading>

        <p>{pagesTranslate("oxfmtConfigHome.pageDescription")}</p>
      </Section>

      <Section>
        <Heading headingTag="h2">{pagesTranslate("oxfmtConfigHome.backgroundTitle")}</Heading>

        <p>{pagesTranslate("oxfmtConfigHome.backgroundDescription")}</p>
      </Section>
    </Fragment>
  )
}
