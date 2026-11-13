import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { Link } from "../../../utilities/navigation/navigation.ts"

import type { FC } from "react"

import styles from "./headerNavigation.module.css"

type Props = {
  changeLogText: string
  packageText: string
}

export const HeaderNavigation: FC<Props> = (props) => {
  const { changeLogText, packageText } = props

  return (
    <nav>
      <ul className={styles.ul}>
        <li>
          <Link className={styles.link} href="/packages">
            {packageText}
          </Link>
        </li>

        <li>
          <a
            className={styles.link}
            href={`${GITHUB_REPOSITORY_URL}/releases`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {changeLogText}
          </a>
        </li>
      </ul>
    </nav>
  )
}
