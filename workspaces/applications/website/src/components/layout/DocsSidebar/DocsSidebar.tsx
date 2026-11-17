import { useTranslations } from "next-intl"

import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { ExternalLink } from "../../ui/ExternalLink/ExternalLink.tsx"

import type { ComponentProps, FC, ReactElement } from "react"

import styles from "./docsSidebar.module.css"

type Props = {
  docsNavigationUlElement: ReactElement
  npmHref: ComponentProps<typeof ExternalLink>["href"]
  packagesSelectorElement: ReactElement
  versionText: string
}

export const DocsSidebar: FC<Props> = (props) => {
  const { docsNavigationUlElement, npmHref, packagesSelectorElement, versionText } = props
  const navigationTranslate = useTranslations("docsLayout")

  return (
    <div className={styles.root}>
      <div className={styles.packagesSelectorWrapper}>{packagesSelectorElement}</div>

      <div className={styles.version}>
        <span>{versionText}</span>
        <span>{navigationTranslate("latest")}</span>
      </div>

      <nav aria-label={navigationTranslate("docsNavigationLabel")}>{docsNavigationUlElement}</nav>

      <hr className={styles.hr} />

      <ul className={styles.ul}>
        <li>
          <ExternalLink href={GITHUB_REPOSITORY_URL}>GitHub</ExternalLink>
        </li>

        <li>
          <ExternalLink href={npmHref}>npm</ExternalLink>
        </li>
      </ul>
    </div>
  )
}
