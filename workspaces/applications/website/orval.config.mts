import { defineConfig } from "orval"

import type { OutputOptions } from "orval"

/** 出力設定のうち、npm registry の各定義で共通のもの */
const npmRegistryOutput = {
  // リクエストのたびに呼び、起動時の環境変数でリクエスト先を切り替える
  baseUrl: {
    imports: [
      {
        importPath: "../../utilities/getNpmRegistryBaseUrl/getNpmRegistryBaseUrl.ts",
        name: "getNpmRegistryBaseUrl",
      },
    ],
    runtime: "getNpmRegistryBaseUrl()",
  },
  clean: true,
  client: "fetch",
  mode: "single",
} satisfies OutputOptions

export default defineConfig({
  npmRegistry: {
    input: {
      target: "./openapi/npmRegistry/openapi.json",
    },
    output: {
      ...npmRegistryOutput,
      target: "./src/generated/npmRegistry/npmRegistry.ts",
    },
  },
  // 公式の定義に無い、パッケージ取得の endpoint を手書きで定義したもの
  npmRegistryPackage: {
    input: {
      target: "./openapi/npmRegistryPackage/openapi.json",
    },
    output: {
      ...npmRegistryOutput,
      target: "./src/generated/npmRegistryPackage/npmRegistryPackage.ts",
    },
  },
})
