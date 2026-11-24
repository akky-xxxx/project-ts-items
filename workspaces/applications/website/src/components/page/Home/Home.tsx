import { useTranslations } from "next-intl"

import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { renderLineBreak } from "../../../utilities/renderLineBreak/renderLineBreak.tsx"
import { FetchedFeatureEnabled } from "../../feature/FetchedFeatureEnabled/FetchedFeatureEnabled.tsx"
import { PackageCardList } from "../../layout/PackageCardList/PackageCardList.tsx"
import { Heading1Wrapper } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { PROJECT_ICON_ELEMENT } from "./constants/PROJECT_ICON_ELEMENT/PROJECT_ICON_ELEMENT.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./home.module.css"

const HEADING1_WRAPPER_CLASS_NAMES = [styles.heading1Wrapper]

type Props = {
  packages: ComponentProps<typeof PackageCardList>["packages"]
}

export const Home: FC<Props> = (props) => {
  const { packages } = props
  const pagesTranslate = useTranslations("pages")

  return (
    <main className={styles.root}>
      <FetchedFeatureEnabled newFeatureElement="sample" featureName="sampleFeature" />

      <Heading1Wrapper classNames={HEADING1_WRAPPER_CLASS_NAMES} iconNode={PROJECT_ICON_ELEMENT}>
        <Heading headingTag="h1">{PROJECT_NAME}</Heading>
      </Heading1Wrapper>

      <section className={styles.section}>
        <Heading headingTag="h2">{pagesTranslate("home.pageTitle")}</Heading>

        <p className={styles.p}>
          {pagesTranslate.rich("home.pageDescription", { br: renderLineBreak })}
        </p>
      </section>

      <section className={styles.section}>
        <Heading headingTag="h2">{pagesTranslate("home.packageTitleText")}</Heading>

        <PackageCardList laneNumber={2} packages={packages} />
      </section>
    </main>
  )
}
