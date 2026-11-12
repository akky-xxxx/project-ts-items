import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"

import styles from "./popover.module.css"

type Props = {
  id: string
}

export const Popover: FcWithChildren<Props> = (props) => {
  const { children, id } = props

  return (
    <div className={styles.root} id={id} popover="auto">
      {children}
    </div>
  )
}
