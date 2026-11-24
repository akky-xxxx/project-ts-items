import "react"

type Command =
  | "show-modal"
  | "close"
  | "request-close"
  | "show-popover"
  | "hide-popover"
  | "toggle-popover"
  | `--${string}`

declare module "react" {
  interface ButtonHTMLAttributes<Type> {
    command?: Command | undefined
    commandfor?: string | undefined
  }
}
