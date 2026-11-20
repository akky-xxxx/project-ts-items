import { useTranslations } from "next-intl"

import type { FcWithChildren } from "@ts-items/react-types"
import type { ReactElement } from "react"

import styles from "./docsLayout.module.css"

type Props = {
  docsSidebarElement: ReactElement
  tocElement?: ReactElement
}

export const DocsLayout: FcWithChildren<Props> = (props) => {
  const { children, docsSidebarElement, tocElement } = props
  const docsLayoutTranslate = useTranslations("docsLayout")
  const isHidingToc = tocElement === undefined
  const rootClasses = [styles.root, isHidingToc && styles.rootWithoutToc].filter(Boolean).join(" ")

  return (
    <div className={rootClasses} data-fits-viewport>
      <div className={styles.docsSidebar}>{docsSidebarElement}</div>

      {/* 内部でスクロールする領域のため、キーボード操作でスクロールできるようフォーカス可能にする(Safari はスクロール領域を自動ではフォーカス対象にしない) */}
      <main className={styles.main} tabIndex={0}>
        {children}
      </main>

      {isHidingToc ? null : (
        <aside className={styles.toc}>
          <nav aria-label={docsLayoutTranslate("toc")}>{tocElement}</nav>
        </aside>
      )}
    </div>
  )
}
