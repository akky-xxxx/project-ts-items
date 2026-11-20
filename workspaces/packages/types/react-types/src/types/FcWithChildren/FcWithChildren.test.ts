import { describe, expectTypeOf, it } from "bun:test"

import type { FcWithChildren } from "@ts-items/react-types"
import type { FC, ReactNode } from "react"

describe("FcWithChildren", () => {
  it("Props を省略すると children だけを受け取る FC になる", () => {
    expectTypeOf<FcWithChildren>().toEqualTypeOf<FC<{ children?: ReactNode }>>()
  })

  it("Props に children を加えた FC になる", () => {
    expectTypeOf<FcWithChildren<{ id: string }>>().toEqualTypeOf<
      FC<{ id: string } & { children?: ReactNode }>
    >()
  })
})
