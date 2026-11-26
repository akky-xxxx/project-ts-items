import type { categorySchema } from "../../schema/categorySchema/categorySchema.ts"
import type * as z from "zod/mini"

type Category = z.output<typeof categorySchema>

export const CATEGORIES = [
  "eslint",
  "typescript",
  "unicorn",
  "import",
  "oxc",
] as const satisfies Category[]
