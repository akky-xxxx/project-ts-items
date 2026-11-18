import { useTranslations } from "next-intl"
import Image from "next/image"

import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./home.module.css"

type Props = {
  packages: ComponentProps<typeof PackageCardList>["packages"]
}

export const Home: FC<Props> = (props) => {
  const { packages } = props
  const homeTranslate = useTranslations("pages.home")

  return (
    <main className={styles.root}>
      <div className={styles.heading1Wrapper}>
        <Image alt="" height="40" src="/images/logo-ts-items.svg" width="40" />

        <Heading headingTag="h1">{PROJECT_NAME}</Heading>
      </div>

      <section className={styles.section}>
        <Heading headingTag="h2">{homeTranslate("pageTitle")}</Heading>

        <p className={styles.p}>{homeTranslate.rich("pageDescription", { br: renderLineBreak })}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>{homeTranslate("packageTitleText")}</h2>

        <PackageCardList laneNumber={2} packages={packages} />
      </section>
    </main>
  )
}
