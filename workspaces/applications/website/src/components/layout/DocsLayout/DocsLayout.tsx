import type { FcWithChildren } from "@ts-items/react-types"
import type { ReactElement } from "react"

import styles from "./docsLayout.module.css"

type Props = {
  docsSidebarElement: ReactElement
}

export const DocsLayout: FcWithChildren<Props> = (props) => {
  const { children, docsSidebarElement } = props

  return (
    <div className={styles.root} data-fits-viewport>
      <div className={styles.docsSidebar}>{docsSidebarElement}</div>

      {children}
    </div>
  )
}
