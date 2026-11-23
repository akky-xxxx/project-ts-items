// oxlint-disable-next-line import/no-unassigned-import -- server-only is a side-effect-only guard that fails client bundles
import "server-only"
import { CodeBlock } from "../../../../../../../ui/CodeBlock/CodeBlock.tsx"
import { BASES } from "../../constants/BASES/BASES.ts"
import { getAllEnabledSwitches } from "../getAllEnabledSwitches/getAllEnabledSwitches.ts"
import { getSource } from "../getSource/getSource.ts"
import { getSourceKey } from "../getSourceKey/getSourceKey.ts"

import type { CodeBlockMap } from "../../types/CodeBlockMap/CodeBlockMap.ts"

/**
 * 全組み合わせについて、設定ファイルのコードと、それを描画した CodeBlock を持つマップを返す。
 * shiki を client のバンドルに含めないよう、server component で呼び出して client component に渡す
 */
export const getCodeBlockMap = () => {
  const entries = BASES.flatMap((selectedBase) =>
    getAllEnabledSwitches().map((enabledSwitches) => {
      const formValues = { enabledSwitches, selectedBase }
      const code = getSource(formValues)
      const sourceKey = getSourceKey(formValues)
      const codeBlock = <CodeBlock key={sourceKey} code={code} lang="typescript" />

      return [sourceKey, { code, codeBlock }] as const
    }),
  )

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- TS cannot infer a keyed record from Object.fromEntries; every combination of BASES and switches is covered by tests
  return Object.fromEntries(entries) as CodeBlockMap
}
