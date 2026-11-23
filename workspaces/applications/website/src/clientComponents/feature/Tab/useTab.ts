import { startTransition, useState } from "react"

import styles from "./tab.module.css"

type TabValue = string
type Item = {
  copyText: string
  tabValue: TabValue
}
type Input = {
  currentActiveTabValue?: TabValue
  items: [Item, ...Item[]]
}

const ARRAY_FIRST_INDEX = 0

export const useTab = (input: Input) => {
  const { currentActiveTabValue, items } = input
  const [activeTabValue, setActiveTabValue] = useState<TabValue>(
    currentActiveTabValue ?? items[ARRAY_FIRST_INDEX].tabValue,
  )
  const getTabButtonClassName = (tabValue: TabValue) =>
    [styles.button, tabValue === activeTabValue ? styles.activeButton : ""]
      .filter(Boolean)
      .join(" ")
  const handleChange = (nextTabValue: TabValue) => () => {
    startTransition(() => {
      setActiveTabValue(nextTabValue)
    })
  }
  const copyTargetText = items.find((item) => item.tabValue === activeTabValue)?.copyText

  return {
    activeTabValue,
    copyTargetText,
    getTabButtonClassName,
    handleChange,
  }
}
