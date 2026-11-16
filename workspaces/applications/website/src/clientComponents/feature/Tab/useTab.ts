import { startTransition, useCallback, useState } from "react"
import { toast } from "react-hot-toast"

import styles from "./tab.module.css"

type TabValue = string
type Item = {
  copyText: string
  tabValue: TabValue
}
type Input = {
  copiedText: string
  currentActiveTabValue?: TabValue
  items: [Item, ...Item[]]
}

const ARRAY_FIRST_INDEX = 0

export const useTab = (input: Input) => {
  const { copiedText, currentActiveTabValue, items } = input
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
  const handleCopy = useCallback(() => {
    const activeItem = items.find((item) => item.tabValue === activeTabValue)
    if (!activeItem) {
      return
    }

    startTransition(async () => {
      await navigator.clipboard.writeText(activeItem.copyText).then(() => {
        toast(copiedText)
      })
    })
  }, [activeTabValue, copiedText, items])

  return {
    activeTabValue,
    getTabButtonClassName,
    handleChange,
    handleCopy,
  }
}
