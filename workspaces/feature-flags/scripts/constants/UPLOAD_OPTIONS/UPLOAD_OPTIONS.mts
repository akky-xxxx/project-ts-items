import type { PutCommandOptions } from "@vercel/blob"

export const UPLOAD_OPTIONS = {
  access: "public",
  addRandomSuffix: false,
  allowOverwrite: true,
  cacheControlMaxAge: 60,
  contentType: "application/json",
} as const satisfies PutCommandOptions
