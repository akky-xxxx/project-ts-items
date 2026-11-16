import type { ChangeEventHandler, FC, ReactNode } from "react"

import styles from "./toggle.module.css"

type Props = {
  checked: boolean
  disabled?: boolean
  labelNode: ReactNode
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}

export const Toggle: FC<Props> = (props) => {
  const { checked, disabled, labelNode, name, onChange, value } = props

  return (
    <label className={styles.root}>
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        name={name}
        onChange={onChange}
        role="switch"
        type="checkbox"
        value={value}
      />

      <span>{labelNode}</span>
    </label>
  )
}
