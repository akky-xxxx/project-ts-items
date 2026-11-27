import { describe, expect, it } from "vitest"

import { isScrolledToEnd } from "./isScrolledToEnd.ts"

describe(isScrolledToEnd, () => {
  it.each([
    {
      expected: true,
      input: { clientHeight: 500, scrollHeight: 1500, scrollTop: 1000 },
      title: "末尾までスクロールしている場合は true を返す",
    },
    {
      expected: true,
      input: { clientHeight: 500, scrollHeight: 1500, scrollTop: 999 },
      title: "末尾まで残り 1px 以内の場合は true を返す",
    },
    {
      expected: false,
      input: { clientHeight: 500, scrollHeight: 1500, scrollTop: 998 },
      title: "末尾まで 1px より多く残っている場合は false を返す",
    },
    {
      expected: false,
      input: { clientHeight: 500, scrollHeight: 500, scrollTop: 0 },
      title: "スクロールできない要素の場合は false を返す",
    },
  ])("$title", (testCase) => {
    const { expected, input } = testCase
    expect(isScrolledToEnd(input)).toBe(expected)
  })
})
