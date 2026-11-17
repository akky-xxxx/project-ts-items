import { useTranslations } from "next-intl"

import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"
import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { Link } from "../../../utilities/navigation/navigation.ts"

import type { FC } from "react"

import styles from "./headerNavigation.module.css"

export const HeaderNavigation: FC = () => {
  const navigationTranslate = useTranslations("header.navigation")

  return (
    <nav aria-label={navigationTranslate("ariaLabel")}>
      <ul className={styles.ul}>
        <li>
          <Link className={styles.link} href="/packages/">
            {navigationTranslate("package")}
          </Link>
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
