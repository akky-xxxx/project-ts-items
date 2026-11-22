// @vitest-environment happy-dom
import { act, renderHook } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { describe, expect, it } from "vitest"

import { siteDictionary } from "../../../i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../../../i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { useExpandableContents } from "./useExpandableContents.ts"

import type { FC, ReactNode } from "react"

type Input = Parameters<typeof useExpandableContents>[0]
type Result = ReturnType<typeof useExpandableContents>

const messages = toLocaleMessages(siteDictionary, "en")

const Wrapper: FC<{ children: ReactNode }> = (props) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    {props.children}
  </NextIntlClientProvider>
)

const renderUseExpandableContents = (input: Input = {}) =>
  renderHook(() => useExpandableContents(input), { wrapper: Wrapper })

const toggle = (result: { current: Result }) => {
  act(() => {
    result.current.handleToggle()
  })
}

describe(useExpandableContents, () => {
  it("初期状態は折りたたまれ、スクロール領域としての属性とクラスを返す", () => {
    const { result } = renderUseExpandableContents()

    expect(result.current).toMatchObject({
      buttonLabelText: "Expand",
      contentsAttributes: { "aria-label": "Collapsed contents", "role": "region", "tabIndex": 0 },
      isExpanded: false,
    })
    expect(result.current.expandableContentWrapperClasses).toMatch(/isCollapsed/u)
  })

  it("handleToggle で展開すると、ラベルが切り替わり属性とクラスが外れる", () => {
    const { result } = renderUseExpandableContents()
    toggle(result)

    expect(result.current).toMatchObject({ buttonLabelText: "Collapse", isExpanded: true })
    expect(result.current.contentsAttributes).toStrictEqual({})
    expect(result.current.expandableContentWrapperClasses).not.toMatch(/isCollapsed/u)
    expect(result.current.expandableContentWrapperClasses).toMatch(/variableContentsWrapper/u)
  })

  it("handleToggle を2回呼ぶと折りたたみに戻る", () => {
    const { result } = renderUseExpandableContents()
    toggle(result)
    toggle(result)

    expect(result.current).toMatchObject({ buttonLabelText: "Expand", isExpanded: false })
  })

  it("展開状態が変わっても contentsId は変わらない", () => {
    const { result } = renderUseExpandableContents()
    const { contentsId } = result.current
    toggle(result)

    expect(contentsId).not.toBe("")
    expect(result.current.contentsId).toBe(contentsId)
  })

  it("maxHeight の既定値は 300px", () => {
    const { result } = renderUseExpandableContents()

    expect(result.current.maxHeightStyle).toStrictEqual({ "--max-height": "300px" })
  })

  it("maxHeight を指定するとその値を使う", () => {
    const { result } = renderUseExpandableContents({ maxHeight: "120px" })

    expect(result.current.maxHeightStyle).toStrictEqual({ "--max-height": "120px" })
  })
})
