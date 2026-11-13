// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useLocale } from "./useLocale.ts"

const { replace, usePathname } = vi.hoisted(() => ({ replace: vi.fn(), usePathname: vi.fn() }))

vi.mock("next/navigation", () => ({
  useParams: () => ({ locale: "ja" }),
}))

vi.mock("../../../../../utilities/navigation/navigation.ts", () => ({
  usePathname,
  useRouter: () => ({ replace }),
}))

type SelectLanguageArgs = {
  newLocale: string
  pathname: string
  url: string
}

const selectLanguage = (args: SelectLanguageArgs) => {
  globalThis.history.replaceState(null, "", args.url)
  usePathname.mockReturnValue(args.pathname)
  const { result } = renderHook(() => useLocale())
  result.current.selectLanguage(args.newLocale)
}

describe("useLocale: locale の取得と切り替えを行う hook", () => {
  describe("selectLanguage: 選択した言語のパスへ遷移する", () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it("locale を除いた pathname と選択した locale で遷移する", () => {
      selectLanguage({ newLocale: "en", pathname: "/packages/", url: "/ja/packages/" })

      expect(replace).toHaveBeenCalledExactlyOnceWith("/packages/", { locale: "en" })
    })

    it("ルートでも選択した locale で遷移する", () => {
      selectLanguage({ newLocale: "en", pathname: "/", url: "/ja/" })

      expect(replace).toHaveBeenCalledExactlyOnceWith("/", { locale: "en" })
    })

    it("query string と hash を保持して遷移する", () => {
      selectLanguage({
        newLocale: "en",
        pathname: "/packages/",
        url: "/ja/packages/?tab=x#install",
      })

      expect(replace).toHaveBeenCalledExactlyOnceWith("/packages/?tab=x#install", {
        locale: "en",
      })
    })

    it("対応していない locale では遷移しない", () => {
      selectLanguage({ newLocale: "fr", pathname: "/packages/", url: "/ja/packages/" })

      expect(replace).not.toHaveBeenCalled()
    })
  })
})
