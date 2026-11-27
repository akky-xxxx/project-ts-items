type Input = {
  clientHeight: number
  scrollHeight: number
  scrollTop: number
}

/** サブピクセルの誤差を許すため、残りがこの値以下なら末尾とみなす */
const TOLERANCE_PX = 1

/**
 * @description
 * スクロールが末尾に達しているかを返す。スクロールできない要素は末尾とみなさない
 */
export const isScrolledToEnd = (input: Input) => {
  const { clientHeight, scrollHeight, scrollTop } = input
  if (scrollHeight <= clientHeight) {
    return false
  }

  return scrollHeight - clientHeight - scrollTop <= TOLERANCE_PX
}
