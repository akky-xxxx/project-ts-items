import { Toaster } from "react-hot-toast"

import { GITHUB_REPOSITORY_URL } from "../../../constants/GITHUB_REPOSITORY_URL/GITHUB_REPOSITORY_URL.ts"
import { NPM_ORGANIZATION_URL } from "../../../constants/NPM_ORGANIZATION_URL/NPM_ORGANIZATION_URL.ts"
import { PROJECT_NAME } from "../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { ExternalLink } from "../../ui/ExternalLink/ExternalLink.tsx"

import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"
import type { ReactElement } from "react"
import type { ToasterProps } from "react-hot-toast"

import styles from "./rootLayout.module.css"

const TOAST_OPTIONS = {
  style: {
    backgroundColor: "var(--color-background)",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--color-box-shadow) 0 8px 24px",
    color: "var(--color-text)",
  },
} as const satisfies ToasterProps["toastOptions"]

type Props = {
  headerInnerElement: ReactElement
  thisYear: number
}

export const RootLayout: FcWithChildren<Props> = (props) => {
  const { children, headerInnerElement, thisYear } = props

  return (
    <div className={styles.root}>
      <header className={styles.header}>{headerInnerElement}</header>

      <div className={styles.mainWrapper}>{children}</div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            &copy; {thisYear} {PROJECT_NAME} · MIT License
          </div>

          <ul className={styles.services}>
            <li>
              <ExternalLink href={GITHUB_REPOSITORY_URL}>GitHub</ExternalLink>
            </li>

            <li>
              <ExternalLink href={NPM_ORGANIZATION_URL}>npm</ExternalLink>
            </li>
          </ul>
        </div>
      </footer>

      <Toaster toastOptions={TOAST_OPTIONS} />
    </div>
  )
}
