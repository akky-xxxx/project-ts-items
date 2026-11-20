import { describe, expectTypeOf, it } from "bun:test"

import type { CustomCSSProperties } from "@ts-items/react-types"
import type { CSSProperties } from "react"

describe("CustomCSSProperties", () => {
  it("CSSProperties に -- で始まるカスタムプロパティを加えた型になる", () => {
    expectTypeOf<CustomCSSProperties>().toEqualTypeOf<
      CSSProperties & Record<`--${string}`, number | string | undefined>
    >()
  })

  it("カスタムプロパティに文字列と数値を指定できる", () => {
    expectTypeOf<{ "--color": string; "--gap": number }>().toExtend<CustomCSSProperties>()
  })

  it("カスタムプロパティに真偽値は指定できない", () => {
    expectTypeOf<{ "--visible": boolean }>().not.toExtend<CustomCSSProperties>()
  })
})
