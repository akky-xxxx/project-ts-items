import { Fragment } from "react"

import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ReactNode, ComponentProps, FC } from "react"

import styles from "./oxlintConfigHomeQuickstart.module.css"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: string
  installTitleText: string
  pageDescriptionText: ReactNode
  pageTitle: string
  setupTitleText: string
}

export const OxlintConfigHomeQuickstart: FC<Props> = (props) => {
  const {
    breadcrumbItems,
    breadcrumbLabelText,
    installTitleText,
    pageDescriptionText,
    pageTitle,
    setupTitleText,
  } = props

  return (
    <Fragment>
      <Breadcrumb items={breadcrumbItems} labelText={breadcrumbLabelText} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{pageTitle}</Heading>
      </div>

      <p>{pageDescriptionText}</p>

      <section className={styles.section}>
        <Heading headingTag="h2">{installTitleText}</Heading>

        <pre>{/* TODO: タブコードハイライトを入れる */}</pre>
      </section>

      <section className={styles.section}>
        <Heading headingTag="h2">{setupTitleText}</Heading>

        <pre>{/* TODO: コードハイライトを入れる */}</pre>
      </section>
    </Fragment>
  )
}
