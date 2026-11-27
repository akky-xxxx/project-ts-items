"use client"

import { TocLink } from "../TocLink/TocLink.tsx"
import { useTocList } from "./useTocList.ts"

import type { FC } from "react"

import styles from "./tocList.module.css"

type Item = {
  anchor: string
  text: string
}
type Props = {
  items: Item[]
}

export const TocList: FC<Props> = (props) => {
  const { items } = props
  const { currentAnchor } = useTocList({ items })

  return (
    <ul className={styles.ul}>
      {items.map((item) => {
        const { anchor, text } = item

        return (
          <li key={anchor}>
            <TocLink anchor={anchor} isCurrent={anchor === currentAnchor}>
              {text}
            </TocLink>
          </li>
        )
      })}
    </ul>
  )
}
