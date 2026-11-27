import { useEffect, useState } from "react"

import { getHeadingElement } from "../getHeadingElement/getHeadingElement.ts"
import { isScrolledToEnd } from "../isScrolledToEnd/isScrolledToEnd.ts"

type Input = {
  anchor: string | undefined
}

/** scroll はバブリングしないため、capture フェーズで document から全要素のスクロールを拾う */
const LISTENER_OPTIONS = {
  capture: true,
  passive: true,
} as const satisfies AddEventListenerOptions

const getScrollElement = (target: EventTarget | null) => {
  if (target instanceof Document) {
    return target.scrollingElement
  }
  if (target instanceof Element) {
    return target
  }

  return null
}

/**
 * @description
 * anchor の見出しを含むスクロール要素が、末尾までスクロールされているかを返す
 */
export const useIsScrolledToEnd = (input: Input) => {
  const { anchor } = input
  const [isAtEnd, setIsAtEnd] = useState(false)

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (anchor === undefined) {
        return
      }
      const heading = getHeadingElement(anchor)
      const scrollElement = getScrollElement(event.target)
      // ToC 自体のスクロールなど、見出しを含まない要素のスクロールは無視する
      if (heading === null || scrollElement?.contains(heading) !== true) {
        return
      }
      setIsAtEnd(isScrolledToEnd(scrollElement))
    }
    globalThis.document.addEventListener("scroll", handleScroll, LISTENER_OPTIONS)

    return () => {
      globalThis.document.removeEventListener("scroll", handleScroll, LISTENER_OPTIONS)
    }
  }, [anchor])

  return isAtEnd
}
