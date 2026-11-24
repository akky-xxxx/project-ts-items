import type { FC, SVGAttributes } from "react"

type Props = Pick<SVGAttributes<unknown>, "aria-hidden" | "height" | "name" | "width">

const DEFAULT_HEIGHT = 8
const DEFAULT_WIDTH = 11

export const CrossIcon: FC<Props> = (props) => {
  const { height = DEFAULT_HEIGHT, name, width = DEFAULT_WIDTH } = props

  return (
    <svg
      aria-hidden={props["aria-hidden"]}
      fill="none"
      height={height}
      name={name}
      viewBox="0 0 12 12"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 0.75L10.75 10.75M10.75 0.75L0.75 10.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke="currentColor"
      />
    </svg>
  )
}
