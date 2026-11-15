import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { ExternalLink } from "../../ui/ExternalLink/ExternalLink.tsx"

import type { ComponentProps, FC, ReactElement } from "react"

import styles from "./docsSidebar.module.css"

type Props = {
  docsNavigationUlElement: ReactElement
  latestText: string
  navigationLabelText: string
  newTabText: string
  npmHref: ComponentProps<typeof ExternalLink>["href"]
  packagesSelectorElement: ReactElement
  versionText: string
}

export const DocsSidebar: FC<Props> = (props) => {
  const {
    docsNavigationUlElement,
    latestText,
    navigationLabelText,
    newTabText,
    npmHref,
    packagesSelectorElement,
    versionText,
  } = props

  return (
    <div className={styles.root}>
      <div className={styles.packagesSelectorWrapper}>{packagesSelectorElement}</div>

      <div className={styles.version}>
        <span>{versionText}</span>
        <span>{latestText}</span>
      </div>

      <nav aria-label={navigationLabelText}>{docsNavigationUlElement}</nav>

      <ul className={styles.ul}>
        <li>
          <ExternalLink href={GITHUB_REPOSITORY_URL} newTabText={newTabText}>
            GitHub
          </ExternalLink>
        </li>

        <li>
          <ExternalLink href={npmHref} newTabText={newTabText}>
            npm
          </ExternalLink>
        </li>
      </ul>
    </div>
  )
}
