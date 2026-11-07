import { Inter } from "next/font/google"

import type { Metadata } from "next"
import type { PropsWithChildren, ReactNode } from "react"

import "./reset.module.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  description: "ts-items",
  title: "ts-items",
} satisfies Metadata

type AsyncFCWithChildren<Props = unknown> = (
  props: PropsWithChildren<Props>,
) => Promise<ReactNode> | ReactNode

const RootLayout: AsyncFCWithChildren = (props) => {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
