import { Fragment } from "react"

import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

type Props = {
  backgroundDescriptionText: string
  backgroundTitleText: string
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: string
  pageDescriptionText: string
  pageTitle: string
}

export const OxfmtConfigHome: FC<Props> = (props) => {
  const {
    backgroundDescriptionText,
    backgroundTitleText,
    breadcrumbItems,
    breadcrumbLabelText,
    pageDescriptionText,
    pageTitle,
  } = props

  return (
    <Fragment>
      <Breadcrumb items={breadcrumbItems} labelText={breadcrumbLabelText} />

      <Heading1Wrapper>
        <Heading headingTag="h1">{pageTitle}</Heading>
      </Heading1Wrapper>

      <p>{pageDescriptionText}</p>

      <Section>
        <Heading headingTag="h2">{backgroundTitleText}</Heading>

        <p>{backgroundDescriptionText}</p>
      </Section>
    </Fragment>
  )
}
