type Input = {
  anchors: string[]
  intersectingAnchors: ReadonlySet<string>
  previousAnchor: string | undefined
}

/**
 * @description
 * 判定範囲に入っている見出しのうち、目次の並び順で最初のものを現在位置とする。
 * 判定範囲に見出しが無い(セクションの本文を読んでいる途中)場合は、直前の現在位置を維持する
 */
export const getCurrentAnchor = (input: Input) => {
  const { anchors, intersectingAnchors, previousAnchor } = input

  return anchors.find((anchor) => intersectingAnchors.has(anchor)) ?? previousAnchor
}
