import { defineConfig } from "orval"

export default defineConfig({
  npmRegistry: {
    input: {
      target: "./openapi/npmRegistry/openapi.json",
    },
    output: {
      baseUrl: { getBaseUrlFromSpecification: true },
      clean: true,
      client: "fetch",
      mode: "single",
      target: "./src/generated/npmRegistry/npmRegistry.ts",
    },
  },
})
