import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const OxfmtConfigHome: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const oxfmtConfigHomeTranslate = useTranslations("pages.oxfmtConfigHome")

  return (
    <Fragment>
      <Breadcrumb currentPageText={PACKAGE_NAMES.oxfmtConfig} items={breadcrumbItems} />

      <Heading1Wrapper>
        <Heading headingTag="h1">{oxfmtConfigHomeTranslate("pageTitle")}</Heading>
      </Heading1Wrapper>

      <p>{oxfmtConfigHomeTranslate("pageDescription")}</p>

      <Section>
        <Heading headingTag="h2">{oxfmtConfigHomeTranslate("backgroundTitle")}</Heading>

        <p>{oxfmtConfigHomeTranslate("backgroundDescription")}</p>
      </Section>
    </Fragment>
  )
}
