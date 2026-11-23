import type { AnchorHTMLAttributes } from "react"

export const BLANK_LINK_PROPERTIES = {
  rel: "noopener noreferrer",
  target: "_blank",
} as const satisfies AnchorHTMLAttributes<unknown>
