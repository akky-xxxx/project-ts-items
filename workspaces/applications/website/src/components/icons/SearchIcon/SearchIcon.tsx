import { DEFAULT_SIZE } from "../constants/DEFAULT_SIZE/DEFAULT_SIZE"

import type { FC, SVGAttributes } from "react"

type Props = Pick<SVGAttributes<unknown>, "aria-hidden" | "height" | "name" | "width">

export const SearchIcon: FC<Props> = (props) => {
  const { height = DEFAULT_SIZE, name, width = DEFAULT_SIZE } = props

  return (
    <svg
      aria-hidden={props["aria-hidden"]}
      height={height}
      width={width}
      name={name}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
