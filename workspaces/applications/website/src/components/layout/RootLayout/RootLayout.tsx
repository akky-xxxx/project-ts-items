import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"

import styles from "./rootLayout.module.css"

type Props = {
  headerInnerElement: ReactElement
}

export const RootLayout: FcWithChildren<Props> = (props) => {
  const { children, headerInnerElement } = props

  return (
    <div className={styles.root}>
      <header className={styles.header}>{headerInnerElement}</header>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
