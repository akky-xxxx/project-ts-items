import { useTranslations } from "next-intl"
import Image from "next/image"
import { Fragment } from "react"

import { PACKAGE_NAMES } from "../../../constants/PACKAGE_NAMES/PACKAGE_NAMES.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
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

      <Heading1Wrapper hasIcon>
        <Image alt="" height="40" src="/images/logo-ts-items-linter.svg" width="40" />

        <Heading headingTag="h1">
          {PROJECT_NAME}/{PACKAGE_NAMES.oxlintConfig}
        </Heading>
      </Heading1Wrapper>

      <Section>
        <Heading headingTag="h2">{oxlintConfigHomeTranslate("pageTitle")}</Heading>

        <p>{oxlintConfigHomeTranslate.rich("pageDescription", { br: renderLineBreak })}</p>
      </Section>

      <Section>
        <Heading headingTag="h2">{oxlintConfigHomeTranslate("backgroundTitle")}</Heading>

        <p>{oxlintConfigHomeTranslate.rich("backgroundDescription", { br: renderLineBreak })}</p>
      </Section>
    </Fragment>
  )
}
