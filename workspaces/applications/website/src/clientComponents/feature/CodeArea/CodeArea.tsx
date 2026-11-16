"use client"

import { ViewTransition } from "react"

import { useCodeArea } from "./useCodeArea.ts"

import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"

import styles from "./codeArea.module.css"

type Props = {
  copiedText: string
  copyButtonLabelText: string
  copyIconElement: ReactElement
  copyTargetText: string | undefined
  title: string
}

export const CodeArea: FcWithChildren<Props> = (props) => {
  const { children, copyButtonLabelText, copyIconElement, title } = props
  const { handleCopy } = useCodeArea(props)

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
