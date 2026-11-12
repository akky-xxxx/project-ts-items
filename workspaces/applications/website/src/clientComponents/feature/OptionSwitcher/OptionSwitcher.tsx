"use client"

import { useCallback, useId } from "react"

import { CheckedIcon } from "../../../components/icons/CheckedIcon/CheckedIcon.tsx"

import type { ReactNode, ChangeEvent, FC } from "react"

import styles from "./optionSwitcher.module.css"

interface Item {
  iconElement?: ReactNode
  labelText: string
  value: string
}

interface Props {
  handleChange: (value: string) => void
  items: Item[]
  legendText: string
  selectedValue: string
}

export const OptionSwitcher: FC<Props> = (props) => {
  const { handleChange, items, legendText, selectedValue } = props
  const name = useId()
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleChange(event.currentTarget.value)
      event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover()
    },
    [handleChange],
  )

  return (
    <fieldset className={styles.root}>
      <legend className={styles.legend}>{legendText}</legend>

      <ul className={styles.ul}>
        {items.map((item) => {
          const isChecked = selectedValue === item.value

          return (
            <li key={item.value}>
              <label className={styles.label}>
                {item.iconElement}

                {item.labelText}

                <input
                  autoFocus={isChecked}
                  className="visuallyHidden"
                  checked={isChecked}
                  type="radio"
                  name={name}
                  onChange={onChange}
                  value={item.value}
                />

                <div className={styles.checkedIconWrapper}>{isChecked && <CheckedIcon />}</div>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
