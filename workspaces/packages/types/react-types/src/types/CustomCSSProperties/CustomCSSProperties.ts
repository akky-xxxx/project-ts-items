import type { CSSProperties } from "react"

export type CustomCSSProperties = CSSProperties & Record<`--${string}`, string | number | undefined>
