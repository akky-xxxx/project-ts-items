import { useTranslations } from "next-intl"

import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./packages.module.css"

type Props = {
  packages: ComponentProps<typeof PackageCardList>["packages"]
}

export const Packages: FC<Props> = (props) => {
  const { packages } = props
  const pagesTranslate = useTranslations("pages")
  const pageTitleText = pagesTranslate("packages.pageTitle")

  return (
    <main className={styles.root}>
      <Breadcrumb currentPageText={pageTitleText} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{pageTitleText}</Heading>
      </div>

      <p className={styles.description}>{pagesTranslate("packages.pageDescription")}</p>

      <div className={styles.packageCardListWrapper}>
        <PackageCardList laneNumber={1} packages={packages} />
      </div>
    </main>
  )
}
