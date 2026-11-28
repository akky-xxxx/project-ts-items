import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./heading.module.css"

type Props = {
  headingTag: "h1" | "h2" | "h3" | "h4"
  id?: string
}

export const Heading: FcWithChildren<Props> = (props) => {
  const { children, headingTag, id } = props
  const HeadingTag = headingTag

  return (
    <HeadingTag className={styles[headingTag]} id={id}>
      {children}
    </HeadingTag>
  )
}
