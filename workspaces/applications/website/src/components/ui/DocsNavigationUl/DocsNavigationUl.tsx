import { Link } from "../../../utilities/navigation/navigation.ts"

import type { FC } from "react"

import styles from "./docsNavigationUl.module.css"

type Item = {
  childProps?: {
    items?: Item[]
  }
  href: string
  text: string
}

type Props = {
  currentPathname: string
  items?: Item[]
}

// 末尾に "/" が付く pathname("/docs/a1/"。next.config の trailingSlash: true)と、付かない href("/docs/a1")を同一視する
const removeTrailingSlash = (pathname: string) => pathname.replace(/\/$/u, "")

export const DocsNavigationUl: FC<Props> = (props) => {
  if (props.items === undefined) {
    return null
  }
  const { currentPathname } = props

  return (
    <ul className={styles.root}>
      {props.items.map((item) => {
        const { childProps, href, text } = item
        const maybeActiveClass =
          removeTrailingSlash(href) === removeTrailingSlash(currentPathname)
            ? styles.isActive
            : undefined
        const anchorClasses = [styles.link, "textLink", maybeActiveClass].filter(Boolean).join(" ")

        return (
          <li key={href}>
            <Link className={anchorClasses} href={href}>
              {text}
            </Link>
            <DocsNavigationUl currentPathname={currentPathname} items={childProps?.items} />
          </li>
        )
      })}
    </ul>
  )
}
