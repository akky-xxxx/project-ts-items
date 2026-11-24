"use client"

import type { FcWithChildren } from "@ts-items/react-types"
import type { MouseEvent } from "react"

import styles from "./modal.module.css"

type ModalType = "spMenu"

type Props = {
  id: string
  type: ModalType
}

/**
 * @description
 * dialog 内のリンクがクリックされたら閉じる。
 * 同じ layout 内の遷移では dialog が保持され、開いたまま残るため
 */
const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
  if (!(event.target instanceof Element)) {
    return
  }
  if (event.target.closest("a") === null) {
    return
  }
  event.currentTarget.close()
}

export const Modal: FcWithChildren<Props> = (props) => {
  const { children, id, type } = props
  const classes = [styles.root, styles[type]].join(" ")

  return (
    <dialog className={classes} closedby="any" id={id} onClick={handleClick}>
      {children}
    </dialog>
  )
}
