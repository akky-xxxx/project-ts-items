import { Link } from "../../../utilities/navigation/navigation.ts"

import type { FC, ReactElement } from "react"

import styles from "./headerInner.module.css"

type Props = {
  navigationElement: ReactElement
  toolElement: ReactElement
}

export const HeaderInner: FC<Props> = (props) => {
  const { navigationElement, toolElement } = props

  return (
    <header className={styles.root}>
      <Link className={styles.siteName} href="/">
        <span className={styles.projectName}>ts-items</span>
        <span aria-hidden="true">/</span>
        <span>docs</span>
      </Link>

      {navigationElement}

      {toolElement}
    </header>
  )
}
