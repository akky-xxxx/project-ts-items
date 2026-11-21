"use client"

import { Link, usePathname } from "../../../../../utilities/navigation/navigation.ts"

import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./docsNavigationLink.module.css"

type Props = {
  href: string
}

// 末尾に "/" が付く pathname("/href/"。next.config の trailingSlash: true)と、付かない href("/href")を同一視する
const removeTrailingSlash = (pathname: string) => pathname.replace(/\/$/u, "")

export const DocsNavigationLink: FcWithChildren<Props> = (props) => {
  const { children, href } = props
  const anchorClasses = [styles.root, "textLink"].join(" ")
  const pathname = usePathname()
  const isCurrent = removeTrailingSlash(pathname) === removeTrailingSlash(href)

  return (
    <Link aria-current={isCurrent ? "page" : undefined} className={anchorClasses} href={href}>
      {children}
    </Link>
  )
}
