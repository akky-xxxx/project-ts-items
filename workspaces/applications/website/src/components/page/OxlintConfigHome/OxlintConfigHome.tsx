import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const OxlintConfigHome: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const oxlintConfigHomeTranslate = useTranslations("pages.oxlintConfigHome")

  return (
    <Fragment>
      <Breadcrumb currentPageText={PACKAGE_NAMES.oxlintConfig} items={breadcrumbItems} />

      <Heading1Wrapper>
        <Heading headingTag="h1">{oxlintConfigHomeTranslate("pageTitle")}</Heading>
      </Heading1Wrapper>

      <p>{oxlintConfigHomeTranslate.rich("pageDescription", { br: renderLineBreak })}</p>

      <Section>
        <Heading headingTag="h2">{oxlintConfigHomeTranslate("backgroundTitle")}</Heading>

        <p>{oxlintConfigHomeTranslate.rich("backgroundDescription", { br: renderLineBreak })}</p>
      </Section>
    </Fragment>
  )
}
