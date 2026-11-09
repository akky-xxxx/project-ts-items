import { themeSchema } from "../../schemas/themeSchema/themeSchema.ts"

import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import type * as z from "zod/mini"

type GetThemeInput = Pick<RequestCookie, "value"> | undefined
type GetThemeReturn = z.output<typeof themeSchema>
type GetThemeFromCookie = (input: GetThemeInput) => GetThemeReturn

export const getThemeFromCookie: GetThemeFromCookie = (input) => {
  try {
    return themeSchema.parse(input?.value)
  } catch {
    return "system"
  }
}
