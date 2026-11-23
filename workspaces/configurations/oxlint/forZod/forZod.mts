import { defineConfig } from "oxlint"

// Zod 公式の import スタイル(import * as z from "zod")を踏襲する
export const forZod = defineConfig({
  rules: {
    "eslint/id-length": ["error", { exceptions: ["_", "z"], min: 2 }],
    "import/no-namespace": ["error", { ignore: ["zod", "zod/mini"] }],
  },
})
