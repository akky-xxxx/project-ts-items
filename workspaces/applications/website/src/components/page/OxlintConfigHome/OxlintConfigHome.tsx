import { Fragment } from "react"

import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ReactNode, ComponentProps, FC } from "react"

type Props = {
  backgroundDescriptionText: ReactNode
  backgroundTitleText: string
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  pageDescriptionText: ReactNode
  pageTitle: string
}

export const OxlintConfigHome: FC<Props> = (props) => {
  const {
    backgroundDescriptionText,
    backgroundTitleText,
    breadcrumbItems,
    pageDescriptionText,
    pageTitle,
  } = props

  return (
    <Fragment>
      <Breadcrumb items={breadcrumbItems} />

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
