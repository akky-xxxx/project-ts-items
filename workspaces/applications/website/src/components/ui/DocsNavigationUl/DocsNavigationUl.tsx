import { DocsNavigationLink } from "./clientComponents/DocsNavigationLink/DocsNavigationLink.tsx"

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
  items?: Item[]
}

export const DocsNavigationUl: FC<Props> = (props) => {
  if (props.items === undefined) {
    return null
  }

  return (
    <ul className={styles.root}>
      {props.items.map((item) => {
        const { childProps, href, text } = item

        return (
          <li key={href}>
            <DocsNavigationLink href={href}>{text}</DocsNavigationLink>
            <DocsNavigationUl items={childProps?.items} />
          </li>
        )
      })}
    </ul>
  )
}
