import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./modal.module.css"

type ModalType = "spMenu"

type Props = {
  id: string
  type: ModalType
}

export const Modal: FcWithChildren<Props> = (props) => {
  const { children, id, type } = props
  const classes = [styles.root, styles[type]].join(" ")

  return (
    <dialog className={classes} closedby="any" id={id}>
      {children}
    </dialog>
  )
}
