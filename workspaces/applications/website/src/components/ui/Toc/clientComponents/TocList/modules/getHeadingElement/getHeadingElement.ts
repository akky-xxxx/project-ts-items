/** anchor の先頭の "#" の長さ */
const HASH_LENGTH = 1

/**
 * @description
 * anchor(# 付き)が指す見出しの要素を返す
 */
export const getHeadingElement = (anchor: string) =>
  globalThis.document.querySelector(`#${CSS.escape(anchor.slice(HASH_LENGTH))}`)
