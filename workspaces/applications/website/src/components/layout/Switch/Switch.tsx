import type { FC, ReactElement } from "react"

import styles from "./switch.module.css"

type Props = {
  items: (ReactElement & Required<Pick<ReactElement, "key">>)[]
}

export const Switch: FC<Props> = (props) => {
  const { items } = props

  return (
    <ul className={styles.root}>
      {items.map((item) => (
        <li key={item.key} className={styles.li}>
          {item}
        </li>
      ))}
    </ul>
  )
}
