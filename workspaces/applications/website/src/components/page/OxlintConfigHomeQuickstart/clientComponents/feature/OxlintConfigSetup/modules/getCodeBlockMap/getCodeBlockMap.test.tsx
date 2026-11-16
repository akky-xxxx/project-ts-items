// @vitest-environment happy-dom
import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { getCodeBlockMap } from "./getCodeBlockMap.tsx"

/** Server-only は react-server 条件なしで import すると throw するため、unit テストでは空のモジュールにする */
vi.mock("server-only", () => ({}))

const EXPECTED_NEXT_WITH_TYPE_AWARE_AND_STORYBOOK = `import { nextConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [nextConfig, storybookConfig],
  options: {
    typeAware: true,
  },
})`

describe("getCodeBlockMap", () => {
  it("ベース・Storybook・type-aware linting の全組み合わせのキーを持つ", () => {
    expect(Object.keys(getCodeBlockMap()).toSorted()).toStrictEqual([
      "next&typeAwareLinting=false&storybook=false",
      "next&typeAwareLinting=false&storybook=true",
      "next&typeAwareLinting=true&storybook=false",
      "next&typeAwareLinting=true&storybook=true",
      "react&typeAwareLinting=false&storybook=false",
      "react&typeAwareLinting=false&storybook=true",
      "react&typeAwareLinting=true&storybook=false",
      "react&typeAwareLinting=true&storybook=true",
      "ts&typeAwareLinting=false&storybook=false",
      "ts&typeAwareLinting=false&storybook=true",
      "ts&typeAwareLinting=true&storybook=false",
      "ts&typeAwareLinting=true&storybook=true",
    ])
  })

  it("code はキーの組み合わせに対応する設定ファイルのコードを持つ", () => {
    const { code } = getCodeBlockMap()["next&typeAwareLinting=true&storybook=true"]

    expect(code).toBe(EXPECTED_NEXT_WITH_TYPE_AWARE_AND_STORYBOOK)
  })

  it("codeBlock はキーの組み合わせに対応する設定ファイルのコードを描画する", () => {
    const { codeBlock } = getCodeBlockMap()["next&typeAwareLinting=true&storybook=true"]
    const { container } = render(codeBlock)

    expect(container.querySelector("pre > code")?.textContent).toBe(
      EXPECTED_NEXT_WITH_TYPE_AWARE_AND_STORYBOOK,
    )
  })
})
