import { useTranslations } from "next-intl"

import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"
import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { HeaderNavigationLink } from "./clientComponents/HeaderNavigationLink/HeaderNavigationLink.tsx"

import type { FC } from "react"

import styles from "./headerNavigation.module.css"

export const HeaderNavigation: FC = () => {
  const navigationTranslate = useTranslations("header.navigation")

  return (
    <nav aria-label={navigationTranslate("ariaLabel")}>
      <ul className={styles.ul}>
        <li>
          <HeaderNavigationLink href="/packages/">
            {navigationTranslate("package")}
          </HeaderNavigationLink>
        </li>

        <li>
          <a
            {...BLANK_LINK_PROPERTIES}
            className={styles.link}
            href={`${GITHUB_REPOSITORY_URL}/releases`}
          >
            {navigationTranslate("changeLog")}
          </a>
        </li>
      </ul>
    </nav>
  )
}
