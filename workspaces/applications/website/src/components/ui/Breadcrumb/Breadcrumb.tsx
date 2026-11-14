import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { BreadcrumbItem } from "./components/BreadcrumbItem/BreadcrumbItem.tsx"

import type { FC } from "react"

import styles from "./breadcrumb.module.css"

type Item = {
  href?: string
  text: string
}

type Props = {
  items: Item[]
  labelText: string
}

const LAST_ITEM_INDEX = -1
const EMPTY_ARRAY_LENGTH = 0

export const Breadcrumb: FC<Props> = (props) => {
  const { items, labelText } = props

  return (
    <nav aria-label={labelText}>
      <ol className={styles.ol}>
        <BreadcrumbItem href="/" isCurrentPage={items.length === EMPTY_ARRAY_LENGTH}>
          {PROJECT_NAME}
        </BreadcrumbItem>
        {items.map((item, index) => {
          const { href, text } = item
          const isCurrentPage = index === items.length + LAST_ITEM_INDEX

          return (
            <BreadcrumbItem key={`${href ?? ""}:${text}`} href={href} isCurrentPage={isCurrentPage}>
              {text}
            </BreadcrumbItem>
          )
        })}
      </ol>
    </nav>
  )
}
