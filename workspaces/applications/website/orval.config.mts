import { defineConfig } from "orval"

export default defineConfig({
  npmRegistry: {
    input: {
      target: "./openapi/npmRegistry/openapi.json",
    },
    output: {
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
      target: "./src/generated/npmRegistry/npmRegistry.ts",
    },
  },
})
