import { Modal } from "../../../clientComponents/feature/Modal/Modal.tsx"
import { CrossIcon } from "../../icons/CrossIcon/CrossIcon.tsx"
import { HamburgerIcon } from "../../icons/HamburgerIcon/HamburgerIcon.tsx"

import type { FcWithChildren } from "@ts-items/react-types"

import styles from "./headerMenuButton.module.css"

const ICON_SIZE = {
  height: 14,
  width: 14,
} as const
const ID = "headerMenuButton"

export const HeaderMenuButton: FcWithChildren = (props) => {
  const { children } = props

  return (
    <div className={styles.root}>
      <button className={styles.button} type="button" command="show-modal" commandfor={ID}>
        <HamburgerIcon {...ICON_SIZE} />
      </button>
      <button className={styles.button} type="button" command="close" commandfor={ID}>
        <CrossIcon {...ICON_SIZE} />
      </button>

      <Modal id={ID} type="spMenu">
        {children}
      </Modal>
    </div>
  )
}
