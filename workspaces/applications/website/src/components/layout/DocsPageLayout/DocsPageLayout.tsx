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

      {tocElement}
    </Fragment>
  )
}
