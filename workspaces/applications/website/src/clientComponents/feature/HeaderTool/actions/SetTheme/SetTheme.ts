"use server"

import { cookies } from "next/headers"

import type { themeSchema } from "../../../../../schemas/themeSchema/themeSchema.ts"
import type * as z from "zod/mini"

type Theme = z.output<typeof themeSchema>

const THEME_SET = new Set<string>(["dark", "light", "system"] satisfies Theme[])
const A_YEAR = 31_536_000

export const setTheme = async (theme: string): Promise<void> => {
  if (!THEME_SET.has(theme)) {
    return
  }

  const cookieStore = await cookies()

  cookieStore.set("theme", theme, {
    maxAge: A_YEAR,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}
