import { cookies } from "next/headers"
import { afterEach, describe, expect, it, vi } from "vitest"

import { setTheme } from "./setTheme.ts"

vi.mock(import("next/headers"))

const set = vi.fn<Awaited<ReturnType<typeof cookies>>["set"]>()

vi.mocked(cookies, { partial: true }).mockResolvedValue({ set })

const A_YEAR = 31_536_000
const ORIGINAL_NODE_ENV = process.env.NODE_ENV

describe(setTheme, () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.stubEnv("NODE_ENV", ORIGINAL_NODE_ENV)
  })

  it.each(["dark", "light", "system"])("setTheme(%s) // cookie に保存する", async (theme) => {
    expect.hasAssertions()
    vi.stubEnv("NODE_ENV", "development")
    await setTheme(theme)

    expect(set).toHaveBeenCalledExactlyOnceWith("THEME", theme, {
      maxAge: A_YEAR,
      path: "/",
      sameSite: "lax",
      secure: false,
    })
  })

  it("production では secure を付ける", async () => {
    expect.hasAssertions()
    vi.stubEnv("NODE_ENV", "production")
    await setTheme("dark")

    expect(set).toHaveBeenCalledWith("THEME", "dark", expect.objectContaining({ secure: true }))
  })

  it.each(["", "Dark", "unknown"])("setTheme(%j) // 不正な値は無視する", async (theme) => {
    expect.hasAssertions()
    await setTheme(theme)

    expect(cookies).not.toHaveBeenCalled()
    expect(set).not.toHaveBeenCalled()
  })
})
