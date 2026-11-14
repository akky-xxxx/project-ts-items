import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type {ComponentProps, FC, ReactNode} from "react"

import styles from "./home.module.css"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: ComponentProps<typeof Breadcrumb>["labelText"]
  packageTitleText: string
  packages: ComponentProps<typeof PackageCardList>["packages"]
  pageDescriptionText: ReactNode
  pageTitleText: string
}

export const Home: FC<Props> = (props) => {
  const {
    breadcrumbItems,
    breadcrumbLabelText,
    packageTitleText,
    packages,
    pageDescriptionText,
    pageTitleText,
  } = props

  return (
    <main className={styles.root}>
      <Breadcrumb items={breadcrumbItems} labelText={breadcrumbLabelText} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{pageTitleText}</Heading>
      </div>

      <p className={styles.description}>{pageDescriptionText}</p>

      <section className={styles.section}>
        <h2 className={styles.h2}>{packageTitleText}</h2>

        <div className={styles.packageCardListWrapper}>
          <PackageCardList laneNumber={2} packages={packages} />
        </div>
      </section>
    </main>
  )
}
