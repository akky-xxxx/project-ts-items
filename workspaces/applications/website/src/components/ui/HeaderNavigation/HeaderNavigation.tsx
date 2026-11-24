import { useTranslations } from "next-intl"

import { FetchedFeatureEnabled } from "../../feature/FetchedFeatureEnabled/FetchedFeatureEnabled.tsx"
import { HeaderNavigationLink } from "./clientComponents/HeaderNavigationLink/HeaderNavigationLink.tsx"

import type { FC } from "react"

import styles from "./headerNavigation.module.css"

export const HeaderNavigation: FC = () => {
  const headerTranslate = useTranslations("header")

  return (
    <nav aria-label={headerTranslate("navigation.ariaLabel")} className={styles.root}>
      <ul className={styles.ul}>
        <li>
          <HeaderNavigationLink href="/packages/">
            {headerTranslate("navigation.package")}
          </HeaderNavigationLink>
        </li>

        <FetchedFeatureEnabled
          featureName="changeLogPagesFeature"
          newFeatureElement={
            <li>
              <HeaderNavigationLink href="/change-log/">
                {headerTranslate("navigation.changeLog")}
              </HeaderNavigationLink>
            </li>
          }
        />
      </ul>
    </nav>
  )
}
