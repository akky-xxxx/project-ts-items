import { Fragment } from "react"

import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ReactNode, ComponentProps, FC } from "react"

import styles from "./oxlintConfigHome.module.css"

type Props = {
  backgroundDescriptionText: ReactNode
  backgroundTitleText: string
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: string
  pageDescriptionText: ReactNode
  pageTitle: string
}

export const OxlintConfigHome: FC<Props> = (props) => {
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

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{pageTitle}</Heading>
      </div>

      <p>{pageDescriptionText}</p>

      <section className={styles.section}>
        <Heading headingTag="h2">{backgroundTitleText}</Heading>

        <p>{backgroundDescriptionText}</p>
      </section>
    </Fragment>
  )
}
