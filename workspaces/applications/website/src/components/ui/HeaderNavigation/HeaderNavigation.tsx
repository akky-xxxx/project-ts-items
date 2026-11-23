import { useTranslations } from "next-intl"

import { FetchedFeatureEnabled } from "../../feature/FetchedFeatureEnabled/FetchedFeatureEnabled.tsx"
import { HeaderNavigationLink } from "./clientComponents/HeaderNavigationLink/HeaderNavigationLink.tsx"

import type { FC } from "react"

import styles from "./headerNavigation.module.css"

export const HeaderNavigation: FC = () => {
  const navigationTranslate = useTranslations("header.navigation")

  return (
    <nav aria-label={navigationTranslate("ariaLabel")} className={styles.root}>
      <ul className={styles.ul}>
        <li>
          <HeaderNavigationLink href="/packages/">
            {navigationTranslate("package")}
          </HeaderNavigationLink>
        </li>

        <FetchedFeatureEnabled
          featureName="changeLogPagesFeature"
          newFeatureElement={
            <li>
              <HeaderNavigationLink href="/change-log/">
                {navigationTranslate("changeLog")}
              </HeaderNavigationLink>
            </li>
          }
        />
      </ul>
    </nav>
  )
}
