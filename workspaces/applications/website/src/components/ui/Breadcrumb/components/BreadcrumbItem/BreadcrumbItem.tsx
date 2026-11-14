import { Link } from "../../../../../utilities/navigation/navigation.ts"

import type { FcWithChildren } from "../../../../../types/FcWithChildren/FcWithChildren.ts"
import type { ComponentProps, ReactNode } from "react"

import styles from "./breadcrumbItem.module.css"

type Props = {
  href?: string
  isCurrentPage: boolean
}

const buildInnerNode = (props: ComponentProps<typeof BreadcrumbItem>): ReactNode => {
  const { children, href, isCurrentPage } = props

  if (isCurrentPage) {
    return <span aria-current="page">{children}</span>
  }

  if (href === undefined) {
    return <span>{children}</span>
  }

  return <Link href={href}>{children}</Link>
}

export const BreadcrumbItem: FcWithChildren<Props> = (props) => (
  <li className={styles.root}>{buildInnerNode(props)}</li>
)
