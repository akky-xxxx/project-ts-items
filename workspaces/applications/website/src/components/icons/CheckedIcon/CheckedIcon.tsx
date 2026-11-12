import type { FC, SVGAttributes } from "react"

type Props = Pick<SVGAttributes<unknown>, "aria-hidden" | "height" | "name" | "width">

const DEFAULT_HEIGHT = 8
const DEFAULT_WIDTH = 11

export const CheckedIcon: FC<Props> = (props) => {
  const { height = DEFAULT_HEIGHT, name, width = DEFAULT_WIDTH } = props

  return (
    <svg
      aria-hidden={props["aria-hidden"]}
      height={height}
      width={width}
      name={name}
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-0.000266314 4.11365L0.86337 3.22728L3.86337 6.18183L10.0679 1.04904e-05L10.9543 0.886374L3.86337 7.95456L-0.000266314 4.11365Z"
        fill="currentColor"
      />
    </svg>
  )
}
