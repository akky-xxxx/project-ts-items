import { useIntersectingAnchor } from "./modules/useIntersectingAnchor/useIntersectingAnchor.ts"
import { useIsScrolledToEnd } from "./modules/useIsScrolledToEnd/useIsScrolledToEnd.ts"

type Item = {
  anchor: string
}
type Input = {
  items: Item[]
}

const LAST_INDEX = -1

/**
 * @description
 * 画面上部に入っている見出しを現在位置とする。
 * 最後のセクションが短く見出しが画面上部に届かない場合に備え、末尾までスクロールしている間は最後の項目を現在位置とする
 */
export const useTocList = (input: Input) => {
  const { items } = input
  const lastAnchor = items.at(LAST_INDEX)?.anchor
  const intersectingAnchor = useIntersectingAnchor({ items })
  const isAtEnd = useIsScrolledToEnd({ anchor: lastAnchor })

  return {
    currentAnchor: isAtEnd ? lastAnchor : intersectingAnchor,
  }
}
