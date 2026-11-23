import type { ChangeEventHandler, FC } from "react"

import styles from "./radio.module.css"

type Props = {
  checked: boolean
  disabled?: boolean
  labelText: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}

export const Radio: FC<Props> = (props) => {
  const { checked, disabled, labelText, name, onChange, value } = props

  return (
    <label className={styles.root}>
      <span className={styles.control}>
        <input
          checked={checked}
          className={styles.input}
          disabled={disabled}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
        />
      </span>
      <span>{labelText}</span>
    </label>
  )
}
