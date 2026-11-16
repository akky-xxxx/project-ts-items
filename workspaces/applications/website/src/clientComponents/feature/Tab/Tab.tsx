"use client"

import { startTransition, useState, ViewTransition } from "react"

import type { ReactElement, FC } from "react"

import styles from "./tab.module.css"

type TabValue = string
type Item = {
  tabLabelText: string
  tabValue: TabValue
  tabContent: ReactElement
}
type Props = {
  currentActiveTabValue?: Item["tabValue"]
  items: [Item, ...Item[]]
}

const ARRAY_FIRST_INDEX = 0

export const Tab: FC<Props> = (props) => {
  const { currentActiveTabValue, items } = props
  const [activeTabValue, setActiveTabValue] = useState<TabValue>(
    currentActiveTabValue ?? items[ARRAY_FIRST_INDEX].tabValue,
  )
  const handleChange = (nextTabValue: TabValue) => () => {
    startTransition(() => {
      setActiveTabValue(nextTabValue)
    })
  }

  return (
    <div>
      <ul className={styles.ul}>
        {items.map((item) => {
          const { tabLabelText, tabValue } = item
          const buttonClasses = [
            styles.button,
            tabValue === activeTabValue ? styles.activeButton : "",
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <li key={tabValue}>
              <button className={buttonClasses} type="button" onClick={handleChange(tabValue)}>
                {tabLabelText}
              </button>
            </li>
          )
        })}
      </ul>

      <ViewTransition>
        {items.map((item) => {
          const { tabContent, tabValue } = item

          if (tabValue !== activeTabValue) {
            return null
          }

          return <div key={tabValue}>{tabContent}</div>
        })}
      </ViewTransition>
    </div>
  )
}
