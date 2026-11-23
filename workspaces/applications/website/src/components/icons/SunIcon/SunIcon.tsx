import { DEFAULT_SIZE } from "../constants/DEFAULT_SIZE/DEFAULT_SIZE"

import type { FC, SVGAttributes } from "react"

type Props = Pick<
  SVGAttributes<unknown>,
  "aria-hidden" | "aria-label" | "height" | "name" | "role" | "width"
>

export const SunIcon: FC<Props> = (props) => {
  const { height = DEFAULT_SIZE, name, width = DEFAULT_SIZE } = props

  return (
    <svg
      aria-hidden={props["aria-hidden"]}
      aria-label={props["aria-label"]}
      fill="none"
      height={height}
      name={name}
      role={props.role}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M19.7778 4.22266L17.5558 6.25424"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.22217 4.22266L6.44418 6.25424"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.44434 17.5557L4.22211 19.7779"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19.7778 19.7773L17.5558 17.5551"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
