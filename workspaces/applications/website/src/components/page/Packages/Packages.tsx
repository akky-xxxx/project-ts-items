import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./packages.module.css"

type Props = {
  packages: ComponentProps<typeof PackageCardList>["packages"]
  pageDescriptionText: string
  pageTitleText: string
}

export const Packages: FC<Props> = (props) => {
  const { packages, pageDescriptionText, pageTitleText } = props

  return (
    <main className={styles.root}>
      <Heading headingTag="h1">{pageTitleText}</Heading>

      <p className={styles.description}>{pageDescriptionText}</p>

      <div className={styles.packageCardListWrapper}>
        <PackageCardList laneNumber={1} packages={packages} />
      </div>
    </main>
  )
}
