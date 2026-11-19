import type { FC, ReactElement } from "react"

type Props = {
  code: ReactElement
  description: ReactElement
  ruleName: string
  severity: ReactElement
}

export const OxlintRuleDetail: FC<Props> = (props) => {
  const { code, description, ruleName, severity } = props

  return (
    <div>
      {ruleName}
      {severity}
      {code}
      {description}
    </div>
  )
}
