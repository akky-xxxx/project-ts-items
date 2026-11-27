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
      <main className={styles.main}>{children}</main>

      {tocElement}
    </Fragment>
  )
}
