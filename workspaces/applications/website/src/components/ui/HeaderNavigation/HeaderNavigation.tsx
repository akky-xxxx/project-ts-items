import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"
import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { Link } from "../../../utilities/navigation/navigation.ts"

import type { FC } from "react"

import styles from "./headerNavigation.module.css"

type Props = {
  changeLogText: string
  navigationLabelText: string
  packageText: string
}

export const HeaderNavigation: FC<Props> = (props) => {
  const { changeLogText, navigationLabelText, packageText } = props

  return (
    <nav aria-label={navigationLabelText}>
      <ul className={styles.ul}>
        <li>
          <Link className={styles.link} href="/packages">
            {packageText}
          </Link>
        </li>

        <li>
          <a
            {...BLANK_LINK_PROPERTIES}
            className={styles.link}
            href={`${GITHUB_REPOSITORY_URL}/releases`}
          >
            {changeLogText}
          </a>
        </li>
      </ul>
    </nav>
  )
}
