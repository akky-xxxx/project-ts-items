import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./packages.module.css"
import {useTranslations} from "next-intl"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  packages: ComponentProps<typeof PackageCardList>["packages"]
}

export const Packages: FC<Props> = (props) => {
  const { breadcrumbItems, packages } =
    props
  const packagesTranslate = useTranslations("pages.packages")

  return (
    <main className={styles.root}>
      <Breadcrumb items={breadcrumbItems} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{packagesTranslate("pageTitle")}</Heading>
      </div>

      <p className={styles.description}>{packagesTranslate("pageDescription")}</p>

      <div className={styles.packageCardListWrapper}>
        <PackageCardList laneNumber={1} packages={packages} />
      </div>
    </main>
  )
}
