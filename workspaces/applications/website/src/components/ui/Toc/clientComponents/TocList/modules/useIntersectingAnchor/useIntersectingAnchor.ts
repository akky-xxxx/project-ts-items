import { useEffect, useState } from "react"

import { getCurrentAnchor } from "../getCurrentAnchor/getCurrentAnchor.ts"
import { getHeadingElement } from "../getHeadingElement/getHeadingElement.ts"

type Item = {
  anchor: string
}
type Input = {
  items: Item[]
}

/** 画面上部 30% の帯に入った見出しを判定範囲に入っているとみなす */
const OBSERVER_OPTIONS = {
  rootMargin: "0px 0px -70% 0px",
} as const satisfies IntersectionObserverInit

/**
 * @description
 * 画面上部の判定範囲に入っている見出しの anchor を返す
 */
export const useIntersectingAnchor = (input: Input) => {
  const { items } = input
  const [intersectingAnchor, setIntersectingAnchor] = useState<string>()

  useEffect(() => {
    const anchors = items.map((item) => item.anchor)
    const intersectingAnchors = new Set<string>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const anchor = `#${entry.target.id}`
        if (entry.isIntersecting) {
          intersectingAnchors.add(anchor)
        } else {
          intersectingAnchors.delete(anchor)
        }
      }
      setIntersectingAnchor((previousAnchor) =>
        getCurrentAnchor({ anchors, intersectingAnchors, previousAnchor }),
      )
    }, OBSERVER_OPTIONS)

    for (const anchor of anchors) {
      const heading = getHeadingElement(anchor)
      if (heading) {
        observer.observe(heading)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [items])

  return intersectingAnchor
}
