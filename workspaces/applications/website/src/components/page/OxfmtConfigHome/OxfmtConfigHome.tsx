import { useTranslations } from "next-intl"
import Image from "next/image"
import { Fragment } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
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

      <Heading1Wrapper hasIcon>
        <Image alt="" height="40" src="/images/logo-ts-items-formatter.svg" width="40" />

        <Heading headingTag="h1">
          {PROJECT_NAME}/{PACKAGE_NAMES.oxfmtConfig}
        </Heading>
      </Heading1Wrapper>

      <Section>
        <Heading headingTag="h2">{oxfmtConfigHomeTranslate("pageTitle")}</Heading>

        <p>{oxfmtConfigHomeTranslate("pageDescription")}</p>
      </Section>

      <Section>
        <Heading headingTag="h2">{oxfmtConfigHomeTranslate("backgroundTitle")}</Heading>

        <p>{oxfmtConfigHomeTranslate("backgroundDescription")}</p>
      </Section>
    </Fragment>
  )
}
