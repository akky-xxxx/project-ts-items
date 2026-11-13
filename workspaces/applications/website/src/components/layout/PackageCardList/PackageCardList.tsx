import { PackageCard } from "../../ui/PackageCard/PackageCard.tsx"

import type { ComponentProps, FC } from "react"

import styles from "./packageCardList.module.css"

type LaneNumber = 1 | 2
type Props = {
  laneNumber: LaneNumber
  packages: ComponentProps<typeof PackageCard>[]
}

const LANE_CLASS_NAMES = {
  1: styles.rootSingle,
  2: styles.rootDouble,
} as const satisfies Record<LaneNumber, string>

export const PackageCardList: FC<Props> = (props) => {
  const { laneNumber, packages } = props

  return (
    <ul className={`${styles.root} ${LANE_CLASS_NAMES[laneNumber]}`}>
      {packages.map((packageProps) => (
        <li key={packageProps.innerLinkHref}>
          <PackageCard {...packageProps} />
        </li>
      ))}
    </ul>
  )
}
