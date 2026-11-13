import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"

import styles from "./docsLayout.module.css"

type Props = {
  docsSidebarElement: ReactElement
  tocElement: ReactElement
}

export const DocsLayout: FcWithChildren<Props> = (props) => {
  const { children, docsSidebarElement, tocElement } = props

  return (
    <div className={styles.root}>
      <nav className={styles.docsSidebar}>{docsSidebarElement}</nav>

      <main className={styles.main}>{children}</main>

      <aside className={styles.toc}>
        <nav>{tocElement}</nav>
      </aside>
    </div>
  )
}
