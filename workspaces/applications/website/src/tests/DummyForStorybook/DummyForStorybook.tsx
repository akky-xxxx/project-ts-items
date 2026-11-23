import type { FC } from "react"

type Props = {
  label: string
}

/**
 * @description
 * storybook 等、非プロダクトコード向けの component
 */
export const DummyForStorybook: FC<Props> = (props) => {
  const { label } = props

  return <span>{`{${label}}`}</span>
}
