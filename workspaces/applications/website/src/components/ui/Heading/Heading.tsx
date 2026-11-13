import type { FcWithChildren } from "../../../types/FcWithChildren/FcWithChildren.ts"

import styles from "./heading.module.css"

type Props = {
  headingTag: "h1" | "h2"
}

export const Heading: FcWithChildren<Props> = (props) => {
  const { children, headingTag } = props
  const HeadingTag = headingTag

  return <HeadingTag className={styles[headingTag]}>{children}</HeadingTag>
}
