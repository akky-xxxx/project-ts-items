import type { FC, ReactElement } from "react"

import styles from "./menuModalInner.module.css"

type Props = {
  navigationElement: ReactElement
  toolElement: ReactElement
}

export const MenuModalInner: FC<Props> = (props) => {
  const { navigationElement, toolElement } = props

  return (
    <div className={styles.root}>
      {navigationElement}

      {toolElement}
    </div>
  )
}
