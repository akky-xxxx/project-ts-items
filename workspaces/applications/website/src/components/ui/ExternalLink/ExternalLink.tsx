import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"

import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"

import styles from "./externalLink.module.css"

type Props = {
  href: `https://${string}`
  newTabText: string
}

// TODO: newTabText は i18n だけど特定の値のみなので server component 化して props drilling しない作りにする
export const ExternalLink: FcWithChildren<Props> = (props) => {
  const { children, href, newTabText } = props

  return (
    <a {...BLANK_LINK_PROPERTIES} className={styles.root} href={href}>
      {children}
      <span className="visuallyHidden"> ({newTabText})</span>
    </a>
  )
}
