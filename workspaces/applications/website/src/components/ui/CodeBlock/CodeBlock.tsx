import { Fragment } from "react"
import { splitLines } from "shiki/core"

import { highlighter } from "../../../utilities/highlighter/highlighter.ts"

import type { FC } from "react"

import styles from "./codeBlock.module.css"

type Props = {
  code: string
  lang: "bash" | "tsx" | "typescript"
}

const FIRST_LINE_OFFSET = 0

export const CodeBlock: FC<Props> = (props) => {
  const { code, lang } = props
  const { tokens } = highlighter.codeToTokens(code, {
    defaultColor: "light-dark()",
    lang,
    themes: { dark: "github-dark", light: "github-light" },
  })

  return (
    <pre className={styles.pre}>
      <code>
        {/* Tokens と同じ規則で行を分割し、行頭の offset を key にする */}
        {splitLines(code).map((line, lineIndex) => {
          const [, lineOffset] = line

          return (
            <Fragment key={lineOffset}>
              {lineOffset !== FIRST_LINE_OFFSET && "\n"}
              {tokens[lineIndex]?.map((token) => (
                <span key={token.offset} style={token.htmlStyle}>
                  {token.content}
                </span>
              ))}
            </Fragment>
          )
        })}
      </code>
    </pre>
  )
}
