import "./global.css"

import type { ReactNode } from "react"

const CreateClassName = () => "root"

const className = CreateClassName()

const Layout = async ({ children }: { children: ReactNode }) => {
  const lang = await Promise.resolve("en")

  return (
    <html className={className} lang={lang}>
      <body>{children}</body>
    </html>
  )
}

export default Layout
