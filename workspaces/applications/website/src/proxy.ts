import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing/routing.ts"

const proxy = createMiddleware(routing)

export const config = {
  // Next.js の _next・_vercel 配下と、拡張子を持つパス(静的ファイル)を除く全てのパス
  // oxlint-disable-next-line unicorn/prefer-string-raw -- Next.js statically analyzes matcher at build time and ignores non-constant values, so keep a plain string literal
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
}

export default proxy
