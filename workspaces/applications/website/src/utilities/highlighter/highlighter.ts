import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import bash from "shiki/langs/bash.mjs"
import typescript from "shiki/langs/typescript.mjs"
import githubDark from "shiki/themes/github-dark.mjs"
import githubLight from "shiki/themes/github-light.mjs"

/**
 * @description
 * syntax highlight 用の highlighter。使用する言語・テーマだけを読み込む
 */
export const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  langs: [bash, typescript],
  themes: [githubDark, githubLight],
})
