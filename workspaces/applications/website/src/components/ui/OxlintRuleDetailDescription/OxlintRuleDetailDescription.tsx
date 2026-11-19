import type { FC } from "react"

type Props = Record<string, unknown>

export const OxlintRuleDetailDescription: FC<Props> = (props) => {
  const { options } = props

  return (
    <ul>
      {Object.entries(options).map(([path, value]) => {
        const stringifiedValue = JSON.stringify(value)
        const key = `${path}${stringifiedValue}`
        const label = path === "<ROOT>" ? stringifiedValue : `${path}(${stringifiedValue})`
        return <li key={key}>{label}: hogehoge</li>
      })}
    </ul>
  )
}
