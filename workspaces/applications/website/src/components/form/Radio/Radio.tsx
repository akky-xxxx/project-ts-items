import type { FC, InputHTMLAttributes } from "react"

import styles from "./radio.module.css"

type Props = Omit<InputHTMLAttributes<unknown>, "type"> & {
  label: string
}

export const Radio: FC<Props> = (props) => {
  const { label, ...rest } = props

  return (
    <label className={styles.root}>
      <input className={styles.input} type="radio" {...rest} />
      <span>{label}</span>
    </label>
  )
}
