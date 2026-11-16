// Doc page で wrapper 系で特例で multiple export する
/* oxlint-disable react/no-multi-comp */
import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"

import styles from "./docsElements.module.css"

type Props = {
  classNames?: string[]
}

export const Heading1Wrapper: FcWithChildren<Props> = (props) => {
  const { children, classNames } = props
  const classes = [styles.heading1Wrapper]
  if (Array.isArray(classNames)) {
    classes.push(...classNames)
  }

  return <div className={classes.join(" ")}>{children}</div>
}

export const Section: FcWithChildren<Props> = (props) => {
  const { children, classNames } = props
  const classes = [styles.section]
  if (Array.isArray(classNames)) {
    classes.push(...classNames)
  }

  return <section className={classes.join(" ")}>{children}</section>
}
