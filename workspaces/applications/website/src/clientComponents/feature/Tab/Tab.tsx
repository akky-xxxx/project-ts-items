"use client"

import { ViewTransition } from "react"

import { CodeArea } from "../CodeArea/CodeArea.tsx"
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
  copyIconElement: ReactElement
  currentActiveTabValue?: Item["tabValue"]
  items: [Item, ...Item[]]
  title: string
}

export const Tab: FC<Props> = (props) => {
  const { copyIconElement, items, title } = props
  const { activeTabValue, getTabButtonClassName, copyTargetText, handleChange } = useTab(props)

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

      <CodeArea copyIconElement={copyIconElement} copyTargetText={copyTargetText} title={title}>
        <ViewTransition>
          {items.map((item) => {
            const { tabContent, tabValue } = item

            if (tabValue !== activeTabValue) {
              return null
            }

            return <div key={tabValue}>{tabContent}</div>
          })}
        </ViewTransition>
      </CodeArea>
    </div>
  )
}
