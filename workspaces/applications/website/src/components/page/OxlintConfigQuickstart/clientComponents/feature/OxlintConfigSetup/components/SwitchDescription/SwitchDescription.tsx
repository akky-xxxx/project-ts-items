import type { FC, ReactNode } from "react"

import styles from "./switchDescription.module.css"

type Props = {
  descriptionText: ReactNode
  titleText: string
}

export const SwitchDescription: FC<Props> = (props) => {
  const { descriptionText, titleText } = props

  return (
    <span className={styles.root}>
      <strong className={styles.heading}>{titleText}</strong>

      <span>{descriptionText}</span>
    </span>
  )
}
