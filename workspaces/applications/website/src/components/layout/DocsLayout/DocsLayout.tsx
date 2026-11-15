import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"

import styles from "./docsLayout.module.css"

type TocProps =
  | {
      tocElement: ReactElement
      tocLabelText: string
    }
  | {
      tocElement?: undefined
      tocLabelText?: undefined
    }

type Props = {
  docsSidebarElement: ReactElement
} & TocProps

export const DocsLayout: FcWithChildren<Props> = (props) => {
  const { children, docsSidebarElement, tocElement, tocLabelText } = props
  const isHidingToc = tocElement === undefined
  const rootClasses = [styles.root, isHidingToc && styles.rootWithoutToc].filter(Boolean).join(" ")

  return (
    <div className={rootClasses}>
      <div className={styles.docsSidebar}>{docsSidebarElement}</div>

      <main className={styles.main}>{children}</main>

      {isHidingToc ? null : (
        <aside className={styles.toc}>
          <nav aria-label={tocLabelText}>{tocElement}</nav>
        </aside>
      )}
    </div>
  )
}
