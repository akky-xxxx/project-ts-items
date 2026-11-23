import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
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
    <div className={styles.root}>
      <Link className={styles.siteName} href="/">
        <span className={styles.projectName}>{PROJECT_NAME}</span>
        <span aria-hidden="true">/</span>
        <span>docs</span>
      </Link>

      {navigationElement}

      {toolElement}
    </div>
  )
}
