import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./packages.module.css"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: ComponentProps<typeof Breadcrumb>["labelText"]
  packages: ComponentProps<typeof PackageCardList>["packages"]
  pageDescriptionText: string
  pageTitleText: string
}

export const Packages: FC<Props> = (props) => {
  const { breadcrumbItems, breadcrumbLabelText, packages, pageDescriptionText, pageTitleText } =
    props

  return (
    <main className={styles.root}>
      <Breadcrumb items={breadcrumbItems} labelText={breadcrumbLabelText} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{pageTitleText}</Heading>
      </div>

      <p className={styles.description}>{pageDescriptionText}</p>

      <div className={styles.packageCardListWrapper}>
        <PackageCardList laneNumber={1} packages={packages} />
      </div>
    </main>
  )
}
