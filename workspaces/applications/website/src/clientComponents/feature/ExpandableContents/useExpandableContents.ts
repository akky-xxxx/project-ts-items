import { useTranslations } from "next-intl"
import { startTransition, useId, useState } from "react"

import type { CustomCSSProperties } from "@ts-items/react-types"
import type { HTMLAttributes } from "react"

import styles from "./expandableContents.module.css"

type Input = {
  maxHeight?: `${number}px`
}
type ContentsAttributes = Pick<HTMLAttributes<HTMLDivElement>, "aria-label" | "role" | "tabIndex">

export const useExpandableContents = (input: Input) => {
  const { maxHeight = "300px" } = input
  const expandableContentsTranslate = useTranslations("components.ui.expandableContents")
  const contentsId = useId()
  const [isExpanded, setIsExpanded] = useState(false)
  const handleToggle = () => {
    startTransition(() => {
      setIsExpanded((previous) => !previous)
    })
  }
  const buttonLabelText = expandableContentsTranslate(
    isExpanded ? "collapseButtonLabelText" : "expandButtonLabelText",
  )
  // 折りたたみ中はスクロール領域になるため、キーボードで操作でき、支援技術に名前が伝わるようにする
  const contentsAttributes: ContentsAttributes = isExpanded
    ? {}
    : {
        "aria-label": expandableContentsTranslate("contentsLabelText"),
        "role": "region",
        "tabIndex": 0,
      }
  const expandableContentWrapperClasses = [
    styles.variableContentsWrapper,
    !isExpanded && styles.isCollapsed,
  ]
    .filter(Boolean)
    .join(" ")
  const maxHeightStyle: CustomCSSProperties = { "--max-height": maxHeight }

  return {
    buttonLabelText,
    contentsAttributes,
    contentsId,
    expandableContentWrapperClasses,
    handleToggle,
    isExpanded,
    maxHeightStyle,
  }
}
