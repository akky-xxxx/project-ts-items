// @vitest-environment happy-dom
import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { getCodeBlockMap } from "./getCodeBlockMap.tsx"

/** Server-only は react-server 条件なしで import すると throw するため、unit テストでは空のモジュールにする */
vi.mock(import("server-only"), () => ({}))

const EXPECTED_NEXT_WITH_TYPE_AWARE_AND_STORYBOOK = `import { nextConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [nextConfig, storybookConfig],
  options: {
    typeAware: true,
  },
})`

describe(getCodeBlockMap, () => {
  it("ベース・type-aware linting・Vitest・Storybook の全組み合わせのキーを持つ", () => {
    expect(Object.keys(getCodeBlockMap()).toSorted()).toStrictEqual([
      "next&typeAwareLinting=false&vitest=false&storybook=false",
      "next&typeAwareLinting=false&vitest=false&storybook=true",
      "next&typeAwareLinting=false&vitest=true&storybook=false",
      "next&typeAwareLinting=false&vitest=true&storybook=true",
      "next&typeAwareLinting=true&vitest=false&storybook=false",
      "next&typeAwareLinting=true&vitest=false&storybook=true",
      "next&typeAwareLinting=true&vitest=true&storybook=false",
      "next&typeAwareLinting=true&vitest=true&storybook=true",
      "react&typeAwareLinting=false&vitest=false&storybook=false",
      "react&typeAwareLinting=false&vitest=false&storybook=true",
      "react&typeAwareLinting=false&vitest=true&storybook=false",
      "react&typeAwareLinting=false&vitest=true&storybook=true",
      "react&typeAwareLinting=true&vitest=false&storybook=false",
      "react&typeAwareLinting=true&vitest=false&storybook=true",
      "react&typeAwareLinting=true&vitest=true&storybook=false",
      "react&typeAwareLinting=true&vitest=true&storybook=true",
      "ts&typeAwareLinting=false&vitest=false&storybook=false",
      "ts&typeAwareLinting=false&vitest=false&storybook=true",
      "ts&typeAwareLinting=false&vitest=true&storybook=false",
      "ts&typeAwareLinting=false&vitest=true&storybook=true",
      "ts&typeAwareLinting=true&vitest=false&storybook=false",
      "ts&typeAwareLinting=true&vitest=false&storybook=true",
      "ts&typeAwareLinting=true&vitest=true&storybook=false",
      "ts&typeAwareLinting=true&vitest=true&storybook=true",
    ])
  })

  it("code はキーの組み合わせに対応する設定ファイルのコードを持つ", () => {
    const { code } = getCodeBlockMap()["next&typeAwareLinting=true&vitest=false&storybook=true"]

    expect(code).toBe(EXPECTED_NEXT_WITH_TYPE_AWARE_AND_STORYBOOK)
  })

  it("codeBlock はキーの組み合わせに対応する設定ファイルのコードを描画する", () => {
    const { codeBlock } =
      getCodeBlockMap()["next&typeAwareLinting=true&vitest=false&storybook=true"]
    const { container } = render(codeBlock)

    expect(container.querySelector("pre > code")?.textContent).toBe(
      EXPECTED_NEXT_WITH_TYPE_AWARE_AND_STORYBOOK,
    )
  })
})
