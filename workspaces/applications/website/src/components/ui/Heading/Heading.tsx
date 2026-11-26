import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./heading.module.css"

type Props = {
  headingTag: "h1" | "h2" | "h3" | "h4"
}

export const Heading: FcWithChildren<Props> = (props) => {
  const { children, headingTag } = props
  const HeadingTag = headingTag

  return <HeadingTag className={styles[headingTag]}>{children}</HeadingTag>
}
