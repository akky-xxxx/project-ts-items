// @vitest-environment happy-dom
import { act, renderHook } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { describe, expect, it } from "vitest"

import { siteDictionary } from "../../../../../../i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../../../../../../i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { useOxlintConfigSetup } from "./useOxlintConfigSetup.ts"

import type { FC, ReactNode } from "react"

type Result = ReturnType<typeof useOxlintConfigSetup>

const messages = toLocaleMessages(siteDictionary, "en")

const Wrapper: FC<{ children: ReactNode }> = (props) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    {props.children}
  </NextIntlClientProvider>
)

const renderUseOxlintConfigSetup = () =>
  renderHook(() => useOxlintConfigSetup(), { wrapper: Wrapper })

const getCheckedMap = (result: Result) =>
  Object.fromEntries(result.switchItems.map((item) => [item.name, item.checked]))

const toggleSwitch = (result: { current: Result }, name: string) => {
  const switchItem = result.current.switchItems.find((item) => item.name === name)
  act(() => {
    switchItem?.onChange()
  })
}

describe(useOxlintConfigSetup, () => {
  it("初期状態はベースが ts、type-aware linting が有効、Storybook が無効", () => {
    const { result } = renderUseOxlintConfigSetup()

    expect(result.current.selectedBase).toBe("ts")
    expect(getCheckedMap(result.current)).toStrictEqual({
      "storybook": false,
      "type-aware-linting": true,
    })
  })

  it("sourceKey は選択中のベースとスイッチの状態を表す", () => {
    const { result } = renderUseOxlintConfigSetup()
    expect(result.current.sourceKey).toBe("ts&typeAwareLinting=true&storybook=false")

    act(() => {
      result.current.handleChangeBase("next")()
    })
    toggleSwitch(result, "storybook")

    expect(result.current.sourceKey).toBe("next&typeAwareLinting=true&storybook=true")
  })

  it("handleChangeBase で選択したベースに切り替わる", () => {
    const { result } = renderUseOxlintConfigSetup()

    act(() => {
      result.current.handleChangeBase("react")()
    })

    expect(result.current.selectedBase).toBe("react")
  })

  it.each([
    { name: "storybook", toggled: true },
    { name: "type-aware-linting", toggled: false },
  ])("$name の onChange を呼ぶたびに checked が反転する", (testCase) => {
    const { name, toggled } = testCase
    const { result } = renderUseOxlintConfigSetup()

    toggleSwitch(result, name)
    expect(getCheckedMap(result.current)[name]).toBe(toggled)

    toggleSwitch(result, name)
    expect(getCheckedMap(result.current)[name]).toBe(!toggled)
  })
})
