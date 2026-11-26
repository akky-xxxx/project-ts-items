import { getData } from "./modules/getData/getData.ts"

import type { CustomCSSProperties } from "@ts-items/react-types"
import type { FC } from "react"

import styles from "./severityLabel.module.css"

type Props = {
  severity: unknown
}

export const SeverityLabel: FC<Props> = (props) => {
  const { severity } = props
  const { color, text } = getData(severity)
  const colorStyle: CustomCSSProperties = {
    "--background": `var(${color}-background)`,
    "--color": `var(${color}-color)`,
  }

  return (
    <span className={styles.root} style={colorStyle}>
      {text}
    </span>
  )
}
