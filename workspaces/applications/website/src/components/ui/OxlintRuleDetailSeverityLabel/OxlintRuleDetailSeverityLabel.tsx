import type { FC } from "react"

type Props = {
  severity: string
}

export const OxlintRuleDetailSeverityLabel: FC<Props> = (props) => {
  const { severity } = props

  return <span style={{ color: "red" }}>{severity}</span>
}
