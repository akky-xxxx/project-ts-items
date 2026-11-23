"use client"

import { Link, usePathname } from "../../../../../utilities/navigation/navigation.ts"

import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./headerNavigationLink.module.css"

type Props = {
  href: string
}

export const HeaderNavigationLink: FcWithChildren<Props> = (props) => {
  const { children, href } = props
  const pathname = usePathname()
  const isCurrent = pathname.startsWith(href)

  return (
    <Link aria-current={isCurrent ? "page" : undefined} className={styles.root} href={href}>
      {children}
    </Link>
  )
}
