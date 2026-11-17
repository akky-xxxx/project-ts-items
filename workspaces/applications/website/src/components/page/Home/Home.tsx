import { useTranslations } from "next-intl"

import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"

import type { ComponentProps, FC, ReactNode } from "react"

import styles from "./home.module.css"

type Props = {
  packages: ComponentProps<typeof PackageCardList>["packages"]
}

// トップページはパンくずのルートそのものなので、ルートより後ろの階層を持たない
const BREADCRUMB_ITEMS: ComponentProps<typeof Breadcrumb>["items"] = []

export const Home: FC<Props> = (props) => {
  const { packages } =
    props
  const homeTranslate = useTranslations("pages.home")

  return (
    <main className={styles.root}>
      <Breadcrumb items={BREADCRUMB_ITEMS} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{homeTranslate("pageTitle")}</Heading>
      </div>

      <p className={styles.description}>{homeTranslate.rich("pageDescription", { br: renderLineBreak })}</p>

      <section className={styles.section}>
        <h2 className={styles.h2}>{homeTranslate("packageTitleText")}</h2>

        <div className={styles.packageCardListWrapper}>
          <PackageCardList laneNumber={2} packages={packages} />
        </div>
      </section>
    </main>
  )
}
