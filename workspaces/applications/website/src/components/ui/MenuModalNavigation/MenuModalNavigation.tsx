import { useTranslations } from "next-intl"

import { Link } from "../../../utilities/navigation/navigation.ts"
import { FetchedFeatureEnabled } from "../../feature/FetchedFeatureEnabled/FetchedFeatureEnabled.tsx"

import type { FC } from "react"

import styles from "./menuModalNavigation.module.css"

export const MenuModalNavigation: FC = () => {
  const navigationTranslate = useTranslations("header.navigation")

  return (
    <nav aria-label={navigationTranslate("ariaLabel")}>
      <ul className={styles.ul}>
        <li>
          <Link className={styles.link} href="/packages/">
            {navigationTranslate("package")}
          </Link>
        </li>

        <FetchedFeatureEnabled
          featureName="changeLogPagesFeature"
          newFeatureElement={
            <li>
              <Link className={styles.link} href="/change-log/">
                {navigationTranslate("changeLog")}
              </Link>
            </li>
          }
        />
      </ul>
    </nav>
  )
}
