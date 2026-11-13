import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"

import styles from "./docsLayout.module.css"

type Props = {
  docsSidebarElement: ReactElement
  docsSidebarLabelText: string
  tocElement: ReactElement
  tocLabelText: string
}

export const DocsLayout: FcWithChildren<Props> = (props) => {
  const { children, docsSidebarElement, docsSidebarLabelText, tocElement, tocLabelText } = props

  return (
    <div className={styles.root}>
      <nav aria-label={docsSidebarLabelText} className={styles.docsSidebar}>
        {docsSidebarElement}
      </nav>

      <main className={styles.main}>{children}</main>

      <aside className={styles.toc}>
        <nav aria-label={tocLabelText}>{tocElement}</nav>
      </aside>
    </div>
  )
}
