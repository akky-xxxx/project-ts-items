import { DummyForStorybook } from "../DummyForStorybook/DummyForStorybook.tsx"

import type { FC } from "react"

const WRAPPER_STYLE = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
} as const
const DEFAULT_LENGTH = 100

type Props = {
  length?: number
  text?: string
}

/**
 * @description
 * storybook 等、非プロダクトコード向けの component
 */
export const LongContents: FC<Props> = (props) => {
  const { length = DEFAULT_LENGTH, text = "children" } = props
  const indexes = Array.from({ length }, (_, index) => index)

  return (
    <div style={WRAPPER_STYLE}>
      {indexes.map((id) => (
        <DummyForStorybook key={id} label={`${text}${id}`} />
      ))}
    </div>
  )
}
