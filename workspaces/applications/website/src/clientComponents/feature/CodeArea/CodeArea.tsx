"use client"

import { ViewTransition } from "react"

import { useCodeArea } from "./useCodeArea.ts"

import type { FcWithChildren } from "@ts-items/react-types"
import type { ReactElement } from "react"

import styles from "./codeArea.module.css"

type Props = {
  copyIconElement: ReactElement
  copyTargetText: string | undefined
  title: string
}

export const CodeArea: FcWithChildren<Props> = (props) => {
  const { children, copyIconElement, title } = props
  const { copyButtonLabelText, handleCopy } = useCodeArea(props)

  return (
    <div className={styles.root}>
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
        <ViewTransition>{children}</ViewTransition>
      </div>
    </div>
  )
}
