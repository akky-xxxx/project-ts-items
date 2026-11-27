"use client"

import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./tocLink.module.css"

type Props = {
  anchor: string
}

export const TocLink: FcWithChildren<Props> = (props) => {
  const { children, anchor } = props
  const isCurrent = anchor === globalThis.location.hash
  const ariaCurrent = isCurrent ? "location" : undefined

  return (
    <a className={styles.root} href={anchor} aria-current={ariaCurrent}>
      {children}
    </a>
  )
}
