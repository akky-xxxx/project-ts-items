import { useTranslations } from "next-intl"

import { TocLink } from "./clientComponents/TocLink/TocLink.tsx"

import type { FC } from "react"

import styles from "./toc.module.css"

type Item = {
  anchor: string
  text: string
}
type Props = {
  items: Item[]
}

export const Toc: FC<Props> = (props) => {
  const { items } = props
  const docsLayoutTranslate = useTranslations("docsLayout")

  return (
    <nav aria-label={docsLayoutTranslate("toc")}>
      <p>{docsLayoutTranslate("toc")}</p>

      <ul className={styles.ul}>
        {items.map((item) => {
          const { anchor, text } = item

          return (
            <li key={text}>
              <TocLink anchor={anchor}>{text}</TocLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
