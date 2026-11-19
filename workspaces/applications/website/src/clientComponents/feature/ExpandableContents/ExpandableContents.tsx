"use client"

import { startTransition, useState, ViewTransition } from "react"

import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"

import styles from "./expandableContents.module.css"

type Props = {
  maxHeight?: `${number}px`
}

export const ExpandableContents: FcWithChildren<Props> = (props) => {
  const { children, maxHeight = "300px" } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const handleExpand = () => {
    startTransition(() => {
      setIsExpanded(true)
    })
  }
  const handleCollapse = () => {
    startTransition(() => {
      setIsExpanded(false)
    })
  }
  const expandableContentWrapperClasses = [
    styles.variableContentsWrapper,
    !isExpanded && styles.isCollapsed,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={styles.root}>
      <ViewTransition>
        <div className={expandableContentWrapperClasses} style={{ "--max-height": maxHeight }}>
          {children}
        </div>
      </ViewTransition>

      <div className={styles.buttonArea}>
        {isExpanded ? (
          <button className={styles.button} type="button" onClick={handleCollapse}>
            Collapse
          </button>
        ) : (
          <button className={styles.button} type="button" onClick={handleExpand}>
            Expand
          </button>
        )}
      </div>
    </div>
  )
}
