// Doc page で wrapper 系で特例で multiple export する
/* oxlint-disable react/no-multi-comp */
import type { FcWithChildren } from "@ts-items/react-types"
import type { ReactNode } from "react"

import styles from "./docsElements.module.css"

type CommonProps = {
  classNames?: string[]
}

type Heading1WrapperProps = CommonProps & {
  // 指定した場合は見出しの前に横並びで表示する
  iconNode?: ReactNode
}

export const Heading1Wrapper: FcWithChildren<Heading1WrapperProps> = (props) => {
  const { children, classNames, iconNode } = props
  const classes = [styles.heading1Wrapper]

  if (iconNode !== undefined) {
    classes.push(styles.heading1WrapperWithIcon)
  }

  if (Array.isArray(classNames)) {
    classes.push(...classNames)
  }

  return (
    <div className={classes.join(" ")}>
      {iconNode}
      {children}
    </div>
  )
}

export const Section: FcWithChildren<CommonProps> = (props) => {
  const { children, classNames } = props
  const classes = [styles.section]
  if (Array.isArray(classNames)) {
    classes.push(...classNames)
  }

  return <section className={classes.join(" ")}>{children}</section>
}
