import * as z from "zod/mini"

export const themeSchema = z.enum(["dark", "light", "system"])
