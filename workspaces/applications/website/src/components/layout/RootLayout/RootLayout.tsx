import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"
import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { NPM_ORGANIZATION_URL } from "../../../constants/NPM_ORGANIZATION_URL/NPM_ORGANIZATION_URL.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"

import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"

import styles from "./rootLayout.module.css"

type Props = {
  headerInnerElement: ReactElement
  thisYear: number
}

export const RootLayout: FcWithChildren<Props> = (props) => {
  const { children, headerInnerElement, thisYear } = props

  return (
    <div className={styles.root}>
      <header className={styles.header}>{headerInnerElement}</header>

      <div className={styles.mainWrapper}>{children}</div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            &copy; {thisYear} {PROJECT_NAME} · MIT License
          </div>

          <ul className={styles.services}>
            <li>
              <a
                {...BLANK_LINK_PROPERTIES}
                className={styles.serviceLink}
                href={GITHUB_REPOSITORY_URL}
              >
                GitHub
              </a>
            </li>

            <li>
              <a
                {...BLANK_LINK_PROPERTIES}
                className={styles.serviceLink}
                href={NPM_ORGANIZATION_URL}
              >
                npm
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
