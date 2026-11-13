// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useLocale } from "./useLocale.ts"

const { replace, usePathname } = vi.hoisted(() => ({ replace: vi.fn(), usePathname: vi.fn() }))

vi.mock("next/navigation", () => ({
  useParams: () => ({ locale: "ja" }),
  usePathname,
  useRouter: () => ({ replace }),
}))

const selectLanguage = (pathname: string, newLocale: string) => {
  usePathname.mockReturnValue(pathname)
  const { result } = renderHook(() => useLocale())
  result.current.selectLanguage(newLocale)
}

type TestCase = [pathname: string, newLocale: string, expectedPathname: string]

describe("useLocale: locale の取得と切り替えを行う hook", () => {
  describe("selectLanguage: 選択した言語のパスへ遷移する", () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it.each([
      ["/ja/", "en", "/en/"],
      ["/ja/packages/", "en", "/en/packages/"],
      ["/ja/", "ja", "/ja/"],
    ] as const satisfies TestCase[])(
      "%s で %s を選ぶと %s に遷移する",
      (pathname, newLocale, expectedPathname) => {
        selectLanguage(pathname, newLocale)

        expect(replace).toHaveBeenCalledExactlyOnceWith(expectedPathname)
      },
    )

    it("先頭以外の locale は置換しない", () => {
      selectLanguage("/ja/foo/ja/", "en")

      expect(replace).toHaveBeenCalledExactlyOnceWith("/en/foo/ja/")
    })

    it("locale で始まる別のセグメントは置換しない", () => {
      selectLanguage("/japan/", "en")

      expect(replace).toHaveBeenCalledExactlyOnceWith("/japan/")
    })
  })
})
