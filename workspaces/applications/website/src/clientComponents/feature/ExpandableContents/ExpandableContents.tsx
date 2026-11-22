"use client"

import { ViewTransition } from "react"

import { useExpandableContents } from "./useExpandableContents.ts"

import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./expandableContents.module.css"

type Props = {
  maxHeight?: `${number}px`
}

export const ExpandableContents: FcWithChildren<Props> = (props) => {
  const { children } = props
  const {
    buttonLabelText,
    contentsAttributes,
    contentsId,
    expandableContentWrapperClasses,
    handleToggle,
    isExpanded,
    maxHeightStyle,
  } = useExpandableContents(props)

  return (
    <div className={styles.root}>
      <ViewTransition>
        <div
          className={expandableContentWrapperClasses}
          id={contentsId}
          style={maxHeightStyle}
          {...contentsAttributes}
        >
          {children}
        </div>
      </ViewTransition>

      <div className={styles.buttonArea}>
        <button
          aria-controls={contentsId}
          aria-expanded={isExpanded}
          className={styles.button}
          type="button"
          onClick={handleToggle}
        >
          {buttonLabelText}
        </button>
      </div>
    </div>
  )
}
