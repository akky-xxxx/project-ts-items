import type { FC, SVGAttributes } from "react"

type Props = Pick<
  SVGAttributes<unknown>,
  "aria-hidden" | "aria-label" | "height" | "name" | "role" | "width"
>

const DEFAULT_HEIGHT = 32
const DEFAULT_WIDTH = 32

export const CopyIcon: FC<Props> = (props) => {
  const { height = DEFAULT_HEIGHT, name, width = DEFAULT_WIDTH } = props

  return (
    <svg
      aria-hidden={props["aria-hidden"]}
      aria-label={props["aria-label"]}
      fill="none"
      height={height}
      name={name}
      role={props.role}
      viewBox="0 0 14 14"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3_6391)">
        <path
          d="M2.33302 9.33352C1.6913 9.33352 1.16626 8.80848 1.16626 8.16676V2.33296C1.16626 1.69124 1.6913 1.1662 2.33302 1.1662H8.16682C8.80854 1.1662 9.33358 1.69124 9.33358 2.33296M5.8333 4.66648H11.6671C12.3115 4.66648 12.8339 5.18886 12.8339 5.83324V11.667C12.8339 12.3114 12.3115 12.8338 11.6671 12.8338H5.8333C5.18892 12.8338 4.66654 12.3114 4.66654 11.667V5.83324C4.66654 5.18886 5.18892 4.66648 5.8333 4.66648Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_6391">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
