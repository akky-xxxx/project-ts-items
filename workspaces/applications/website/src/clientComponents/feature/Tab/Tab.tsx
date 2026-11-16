"use client"

import { ViewTransition } from "react"

import { useTab } from "./useTab.ts"

import type { ReactElement, FC } from "react"

import styles from "./tab.module.css"

type TabValue = string
type Item = {
  copyText: string
  tabLabelText: string
  tabValue: TabValue
  tabContent: ReactElement
}
type Props = {
  copyButtonLabelText: string
  copyIconElement: ReactElement
  currentActiveTabValue?: Item["tabValue"]
  items: [Item, ...Item[]]
  title: string
}

export const Tab: FC<Props> = (props) => {
  const { copyButtonLabelText, copyIconElement, items, title } = props
  const { activeTabValue, getTabButtonClassName, handleChange, handleCopy } = useTab(props)

  return (
    <div>
      <ul className={styles.ul}>
        {items.map((item) => {
          const { tabLabelText, tabValue } = item

          return (
            <li key={tabValue}>
              <button
                className={getTabButtonClassName(tabValue)}
                type="button"
                onClick={handleChange(tabValue)}
              >
                {tabLabelText}
              </button>
            </li>
          )
        })}
      </ul>

      <div className={styles.contentsWrapper}>
        <header className={styles.contentsHeader}>
          <span>{title}</span>

          <button
            aria-label={copyButtonLabelText}
            className={styles.copyButton}
            type="button"
            onClick={handleCopy}
          >
            {copyIconElement}
          </button>
        </header>

        <div className={styles.contentsMain}>
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
      </div>
    </div>
  )
}
