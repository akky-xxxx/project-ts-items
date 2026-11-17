import { Fragment } from "react"

import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ReactNode, ComponentProps, FC } from "react"
import {useTranslations} from "next-intl"
import {renderLineBreak} from "../../../utilities/renderLineBreak/renderLineBreak.tsx"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
}

export const OxlintConfigHome: FC<Props> = (props) => {
  const {
    breadcrumbItems,
  } = props
  const oxlintConfigHomeTranslate = useTranslations("pages.oxlintConfigHome")

  return (
    <Fragment>
      <Breadcrumb items={breadcrumbItems} />

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
