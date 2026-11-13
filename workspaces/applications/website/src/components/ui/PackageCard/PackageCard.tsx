import { Link } from "../../../utilities/navigation/navigation.ts"

import type { FC, ReactNode } from "react"

import styles from "./packageCard.module.css"

type Props = {
  descriptionNode: ReactNode
  headingTag: "h2" | "h3" | "h4" | "h5" | "h6"
  innerLinkHref: `/${string}`
  linkText: string
  packageNameText: string
  versionText: string
}

export const PackageCard: FC<Props> = (props) => {
  const { descriptionNode, headingTag, innerLinkHref, linkText, packageNameText, versionText } =
    props
  const HeadingTag = headingTag

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <HeadingTag className={styles.packageName}>
          <Link className={styles.link} href={innerLinkHref}>
            {packageNameText}
          </Link>
        </HeadingTag>

        <div className={styles.version}>{versionText}</div>
      </header>

      <div className={styles.body}>
        <p className={styles.description}>{descriptionNode}</p>

        <span aria-hidden="true" className={styles.linkText}>
          {linkText} &gt;
        </span>
      </div>
    </div>
  )
}
