import { useTranslations } from "next-intl"

import { Link } from "../../../utilities/navigation/navigation.ts"
import { Heading } from "../Heading/Heading.tsx"

import type { FC, ReactNode } from "react"

import styles from "./packageCard.module.css"

type Props = {
  descriptionNode: ReactNode
  headingTag: "h2" | "h3"
  innerLinkHref: `/${string}`
  isDescriptionClamped?: boolean
  packageLogoNode: ReactNode
  packageNameText: string
  versionText: string
}

export const PackageCard: FC<Props> = (props) => {
  const {
    descriptionNode,
    headingTag,
    innerLinkHref,
    isDescriptionClamped = false,
    packageLogoNode,
    packageNameText,
    versionText,
  } = props
  const componentsTranslate = useTranslations("components")
  const descriptionClassName = isDescriptionClamped
    ? `${styles.description} ${styles.descriptionClamped}`
    : styles.description

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Heading headingTag={headingTag}>
          <Link className={styles.link} href={innerLinkHref}>
            {packageLogoNode}

            {packageNameText}
          </Link>
        </Heading>

        <div className={styles.version}>{versionText}</div>
      </header>

      <div className={styles.body}>
        <p className={descriptionClassName}>{descriptionNode}</p>

        <span aria-hidden="true" className={styles.linkText}>
          {componentsTranslate("ui.packageCard.linkText")} &gt;
        </span>
      </div>
    </div>
  )
}
