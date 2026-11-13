import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"
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
                href="https://github.com/akky-xxxx/project-ts-items"
              >
                GitHub
              </a>
            </li>

            <li>
              <a
                {...BLANK_LINK_PROPERTIES}
                className={styles.serviceLink}
                href="https://www.npmjs.com/org/ts-items"
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
