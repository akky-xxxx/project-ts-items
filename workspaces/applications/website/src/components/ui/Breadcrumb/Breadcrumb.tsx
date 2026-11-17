import { useTranslations } from "next-intl"

import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { BreadcrumbItem } from "./components/BreadcrumbItem/BreadcrumbItem.tsx"

import type { FC } from "react"

import styles from "./breadcrumb.module.css"

type Item = {
  href?: string
  text: string
}

type Props = {
  // 省略時はルート(PROJECT_NAME)が現在のページになる
  currentPageText?: string
  // ルートと現在のページの間の階層。現在のページとしては扱わない
  items?: Item[]
}

export const Breadcrumb: FC<Props> = (props) => {
  const { currentPageText, items } = props
  const breadcrumbTranslate = useTranslations("components.ui.breadcrumb")

  return (
    <nav aria-label={breadcrumbTranslate("labelText")}>
      <ol className={styles.ol}>
        <BreadcrumbItem href="/" isCurrentPage={currentPageText === undefined}>
          {PROJECT_NAME}
        </BreadcrumbItem>
        {items?.map((item) => {
          const { href, text } = item

          return (
            <BreadcrumbItem key={`${href ?? ""}:${text}`} href={href} isCurrentPage={false}>
              {text}
            </BreadcrumbItem>
          )
        })}
        {currentPageText !== undefined && (
          <BreadcrumbItem isCurrentPage>{currentPageText}</BreadcrumbItem>
        )}
      </ol>
    </nav>
  )
}
