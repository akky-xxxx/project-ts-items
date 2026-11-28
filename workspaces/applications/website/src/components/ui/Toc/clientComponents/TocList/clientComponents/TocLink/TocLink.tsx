import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./tocLink.module.css"

type Props = {
  anchor: string
  isCurrent: boolean
}

export const TocLink: FcWithChildren<Props> = (props) => {
  const { children, anchor, isCurrent } = props
  const ariaCurrent = isCurrent ? "location" : undefined

  return (
    <a className={styles.root} href={anchor} aria-current={ariaCurrent}>
      {children}
    </a>
  )
}
