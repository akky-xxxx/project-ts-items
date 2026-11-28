import { Fragment } from "react"


import type { FcWithChildren } from "@ts-items/react-types"
import type { ReactElement } from "react"

import styles from "./docsPageLayout.module.css"

type Props = {
  tocElement: ReactElement
}

export const DocsPageLayout: FcWithChildren<Props> = (props) => {
  const { children, tocElement } = props

  return (
    <Fragment>
      {/* 内部でスクロールする領域のため、キーボード操作でスクロールできるようフォーカス可能にする(Safari はスクロール領域を自動ではフォーカス対象にしない) */}
      <main className={styles.main} tabIndex={0}>
        {children}
      </main>

      <div className={styles.tocWrapper}>
        <details className={styles.details}>
          <summary>Table of contents</summary>

          {tocElement}
        </details>

        <div className={styles.rightPaneWrapper}>{tocElement}</div>
      </div>
    </Fragment>
  )
}
